import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-900 px-4 py-10">
      <main className="container mx-auto">
        <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur p-6 shadow-2xl">
          <h1 className="text-2xl font-semibold text-white">User Profile</h1>
          <p className="text-sm text-zinc-400 mt-1">Your account details</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-sm font-medium text-zinc-300">Name</div>
              <div className="text-sm text-white text-right break-words">{loading ? 'Loading…' : (user?.name || '-')}</div>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-sm font-medium text-zinc-300">Email</div>
              <div className="text-sm text-white text-right break-words">{loading ? 'Loading…' : (user?.email || '-')}</div>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3">
              <div className="text-sm font-medium text-indigo-300">Credits</div>
              <div className="text-sm text-white text-right font-semibold">{loading ? 'Loading…' : (user?.credits ?? 0)}</div>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-sm font-medium text-zinc-300">User ID</div>
              <div className="text-sm text-white text-right break-words">{loading ? 'Loading…' : (user?._id || user?.id || '-')}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile/edit')}
              className="px-4 py-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile/change-password')}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-auto px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
            >
              Log out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
