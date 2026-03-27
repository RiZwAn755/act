import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowRight, LockKeyhole, Mail } from 'lucide-react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_BASE_URL = import.meta.env.VITE_API_URL 


const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({})
	const [serverError, setServerError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const validate = () => {
		const nextErrors = {}

		if (!emailRegex.test(email.trim())) {
			nextErrors.email = 'Enter a valid email address.'
		}

		if (!password.trim()) {
			nextErrors.password = 'Password is required.'
		} else if (password.trim().length < 4) {
			nextErrors.password = 'Password must be at least 4 characters.'
		}

		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setServerError('')

		if (!validate()) {
			return
		}

		try {
			setIsLoading(true)
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ email: email.trim(), password }),
			})

			const data = await response.json()

			if (!response.ok) {
				setServerError(data.message || 'Login failed. Please try again.')
				return
			}

			localStorage.setItem('authUser', JSON.stringify(data.user))
			navigate('/dashboard')
		} catch (error) {
			setServerError('Cannot reach server. Please check backend connection.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
				<section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
					<div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
					<div className="absolute bottom-6 right-8 h-52 w-52 rounded-full bg-lime-300/20 blur-3xl" />

					<div className="relative z-10">
						<p className="inline-flex items-center rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
							Welcome Back
						</p>
						<h1 className="mt-6 max-w-sm text-4xl font-black leading-tight text-white">
							Access your workspace with confidence.
						</h1>
						<p className="mt-4 max-w-md text-sm text-slate-200/80">
							Clean auth flow, frictionless onboarding, and a dashboard built for focus.
						</p>
					</div>

					<div className="relative z-10 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-slate-200">
						<p className="font-semibold">Connected mode</p>
						<p className="mt-1">This form authenticates against your backend API.</p>
						<p>Register first if you do not have an account.</p>
					</div>
				</section>

				<section className="flex items-center justify-center p-6 sm:p-10">
					<form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Sign in</p>
							<h2 className="mt-2 text-3xl font-extrabold text-white">Log in to continue</h2>
						</div>

						<label className="block">
							<span className="mb-2 flex items-center gap-2 text-sm text-slate-200">
								<Mail size={16} />
								Email
							</span>
							<input
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none ring-cyan-300 transition focus:ring-2"
								placeholder="you@example.com"
							/>
							{errors.email && <p className="mt-1 text-sm text-rose-300">{errors.email}</p>}
						</label>

						<label className="block">
							<span className="mb-2 flex items-center gap-2 text-sm text-slate-200">
								<LockKeyhole size={16} />
								Password
							</span>
							<input
								type="password"
								minLength={4}
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none ring-cyan-300 transition focus:ring-2"
								placeholder="Enter your password"
							/>
							{errors.password && <p className="mt-1 text-sm text-rose-300">{errors.password}</p>}
						</label>

						{serverError && (
							<div className="flex items-center gap-2 rounded-xl border border-rose-300/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
								<AlertCircle size={16} />
								{serverError}
							</div>
						)}

						<button
							type="submit"
							disabled={isLoading}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200"
						>
							{isLoading ? 'Logging in...' : 'Login'}
							<ArrowRight size={16} />
						</button>

						<p className="text-center text-sm text-slate-300">
							New here?{' '}
							<Link to="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">
								Create an account
							</Link>
						</p>
					</form>
				</section>
			</div>
		</div>
	)
}

export default Login
