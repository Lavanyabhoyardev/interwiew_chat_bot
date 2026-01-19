import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navigation() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, loading, isAuthenticated, logout } = useAuth();
	const [open, setOpen] = useState(false);

	const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
	if (isAuthRoute) return null;

	const handleLogout = () => {
		logout();
		setOpen(false);
		navigate('/', { replace: true });
	};

	const displayName = user?.name || user?.email || 'Account';
	const avatarLetter = (() => {
		const source = (user?.name || user?.email || '').trim();
		if (!source) return 'U';
		return source[0].toUpperCase();
	})();

	return (
		<div className="fixed top-4 right-4 z-50">
			{!isAuthenticated ? (
				<Link
					to="/login"
					className="inline-flex items-center rounded-full bg-white/5 backdrop-blur border border-white/10 px-4 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
				>
					Log in
				</Link>
			) : (
				<div className="relative">
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 p-1 pr-2 hover:bg-white/10 transition-colors"
						aria-haspopup="menu"
						aria-expanded={open}
						aria-label={loading ? 'Account menu loading' : `Account menu for ${displayName}`}
					>
						<span
							className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold"
							title={loading ? 'Loading…' : displayName}
						>
							{loading ? '…' : avatarLetter}
						</span>
						<span className="text-white/60 text-xs">▾</span>
					</button>

					{open ? (
						<div
							role="menu"
							className="absolute right-0 mt-2 w-56 rounded-lg bg-zinc-900/95 backdrop-blur border border-white/10 shadow-2xl overflow-hidden"
						>
							<div className="px-3 py-2.5 border-b border-white/10">
								<div className="text-sm font-medium text-white truncate">{loading ? 'Loading…' : (user?.name || 'User')}</div>
								<div className="text-xs text-zinc-400 truncate mt-0.5">{loading ? '' : user?.email}</div>
							</div>
							
							{/* Credits Display */}
							<div className="px-3 py-2 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
								<div className="flex items-center justify-between">
									<span className="text-xs text-zinc-400">Credits</span>
									<span className="text-sm font-semibold text-white">{loading ? '—' : (user?.credits ?? 0)}</span>
								</div>
								<Link
									to="/pricing"
									onClick={() => setOpen(false)}
									className="mt-1.5 block text-center text-xs text-indigo-300 hover:text-indigo-200"
								>
									Get more credits →
								</Link>
							</div>

							<div className="p-1.5">
								<Link
									to="/profile"
									onClick={() => setOpen(false)}
									className="block w-full rounded px-3 py-1.5 text-sm text-zinc-200 hover:bg-white/10"
									role="menuitem"
								>
									Profile
								</Link>
								<button
									type="button"
									onClick={handleLogout}
									className="block w-full text-left rounded px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
									role="menuitem"
								>
									Log out
								</button>
							</div>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
