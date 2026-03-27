import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare, LogOut, UserCircle2, UserRound, Users } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL

const Dashboard = () => {
	const navigate = useNavigate()
	const authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

	const data = useMemo(
		() => ({
			leads: ['Acme Corp - Product demo', 'Zenith Tech - Follow-up call', 'Nova Labs - Proposal review'],
			tasks: ['Prepare onboarding checklist', 'Send sprint update', 'Review Q2 pipeline'],
			users: ['Alex Johnson', 'Riya Kapoor', 'Daniel Smith'],
		}),
		[]
	)

	const handleLogout = async () => {
		try {
			await fetch(`${API_BASE_URL}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			})
		} finally {
			localStorage.removeItem('authUser')
			navigate('/login')
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
			<div className="mx-auto max-w-6xl space-y-6">
				<header className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Dashboard</p>
							<h1 className="mt-1 flex items-center gap-2 text-2xl font-black text-white sm:text-3xl">
								<UserCircle2 size={28} className="text-cyan-300" />
								Welcome, {authUser.username || authUser.name || 'User'}
							</h1>
						</div>

						<button
							onClick={handleLogout}
							className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
						>
							<LogOut size={16} />
							Logout
						</button>
					</div>
				</header>

				<section className="grid gap-4 md:grid-cols-3">
					<article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
						<h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-cyan-200">
							<Users size={18} />
							Leads
						</h2>
						<ul className="space-y-2 text-sm text-slate-200">
							{data.leads.map((lead) => (
								<li key={lead} className="rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
									{lead}
								</li>
							))}
						</ul>
					</article>

					<article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
						<h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-lime-200">
							<CheckSquare size={18} />
							Tasks
						</h2>
						<ul className="space-y-2 text-sm text-slate-200">
							{data.tasks.map((task) => (
								<li key={task} className="rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
									{task}
								</li>
							))}
						</ul>
					</article>

					<article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
						<h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-amber-200">
							<UserRound size={18} />
							Users
						</h2>
						<ul className="space-y-2 text-sm text-slate-200">
							{data.users.map((name) => (
								<li key={name} className="rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
									{name}
								</li>
							))}
						</ul>
					</article>
				</section>
			</div>
		</div>
	)
}

export default Dashboard
