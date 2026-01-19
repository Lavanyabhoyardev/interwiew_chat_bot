const Razorpay = require('razorpay');
const crypto = require('crypto');
const paymentService = require('./paymentService');
const User = require('../models/User');
const logger = require('../utils/logger');

let razorpay = null;

function getRazorpayInstance() {
  if (razorpay) return razorpay;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    logger.warn('RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET missing; Razorpay disabled');
    return null;
  }

  razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });

  return razorpay;
}

class RazorpayService {
  getKeyId() {
    return process.env.RAZORPAY_KEY_ID || null;
  }

  getCreditPackage(packageType) {
    const packages = paymentService.getCreditPackages();
    const selected = packages[packageType];
    if (!selected) {
      throw new Error('Invalid package type');
    }
    return selected;
  }

  async createOrder(userId, packageType) {
    const instance = getRazorpayInstance();
    if (!instance) {
      throw new Error('Razorpay is not configured');
    }

    const creditPackage = this.getCreditPackage(packageType);

    // Razorpay amount is in paise. `price` is treated as INR (e.g., 499 => ₹499)
    const amountInPaise = Math.round(creditPackage.price * 100);

    try {
      const receipt = `cr_${userId.toString().slice(-8)}_${Date.now().toString().slice(-8)}`;
      const order = await instance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt,
        notes: {
          userId: userId.toString(),
          packageType,
          credits: creditPackage.credits
        }
      });

      logger.info(`Razorpay order created: ${order.id} for user: ${userId}`);

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        packageType,
        credits: creditPackage.credits
      };
    } catch (error) {
      const detail = error?.error?.description || error?.error?.message || error?.message;
      logger.error('Razorpay order creation failed:', detail || error);
      throw new Error(detail || 'Failed to create Razorpay order');
    }
  }

  async verifyAndApplyCredits({ userId, orderId, paymentId, signature, packageType }) {
    const instance = getRazorpayInstance();
    if (!instance) {
      throw new Error('Razorpay is not configured');
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new Error('Invalid Razorpay signature');
    }

    const creditPackage = this.getCreditPackage(packageType);

    const user = await User.findById(userId).select('credits');
    if (!user) {
      throw new Error('User not found');
    }

    await user.addCredits(creditPackage.credits);

    logger.info(`Razorpay payment verified. Added ${creditPackage.credits} credits to user ${userId}`);

    return {
      creditsAdded: creditPackage.credits,
      creditsTotal: user.credits
    };
  }
}

module.exports = new RazorpayService();
