import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    
    // Placeholder - backend endpoint needs to be implemented with email service
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      // In real implementation, call: await fetchJson('/api/auth/forgot-password', { method: 'POST', body: { email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-neutral-900 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white">Forgot Password</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {success 
            ? 'Check your email for reset instructions'
            : 'Enter your email to receive a password reset link'
          }
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3">
              <p className="text-amber-400 text-xs">
                <strong>Note:</strong> Email service is not configured yet. This is a UI placeholder.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
            <p className="text-emerald-400 text-sm">
              If an account exists with <strong>{email}</strong>, you will receive a password reset email shortly.
            </p>
          </div>
        )}

        <p className="text-sm mt-4 text-zinc-400">
          Remember your password?{' '}
          <Link to="/login" className="text-indigo-300 hover:text-indigo-200 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
