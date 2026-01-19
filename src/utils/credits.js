// Credit costs configuration
export const CREDIT_COSTS = {
  CHATBOT_MESSAGE: 1,
  RESUME_BOT_QUESTION: 2,
  INSTANT_FEEDBACK: 3,
  SMART_QUESTIONS: 0, // Free
  RESUME_UPLOAD: 0, // Free
  RESUME_ANALYSIS: 0 // Free
};

// Check if user has enough credits
export function hasEnoughCredits(userCredits, cost) {
  return userCredits >= cost;
}

// Get credit warning message
export function getCreditWarning(userCredits) {
  if (userCredits === 0) {
    return {
      severity: 'error',
      message: 'You have no credits remaining. Purchase more to continue using paid features.'
    };
  }
  if (userCredits <= 10) {
    return {
      severity: 'warning',
      message: `You have ${userCredits} credits left. Consider purchasing more soon.`
    };
  }
  if (userCredits <= 25) {
    return {
      severity: 'info',
      message: `You have ${userCredits} credits remaining.`
    };
  }
  return null;
}

// Format credit cost display
export function formatCreditCost(cost) {
  if (cost === 0) return 'Free';
  if (cost === 1) return '1 credit';
  return `${cost} credits`;
}
