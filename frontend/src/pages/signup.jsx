import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_BASE_URL = import.meta.env.VITE_API_URL

const Signup = () => {
	const navigate = useNavigate()
	const [form, setForm] = useState({ name: '', email: '', password: '' })
	const [errors, setErrors] = useState({})
	const [serverError, setServerError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (event) => {
		setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
	}

	const validate = () => {
		const nextErrors = {}

		if (!form.name.trim()) {
			nextErrors.name = 'Name is required.'
		}

		if (!emailRegex.test(form.email.trim())) {
			nextErrors.email = 'Enter a valid email address.'
		}

		if (!form.password.trim()) {
			nextErrors.password = 'Password is required.'
		} else if (form.password.trim().length < 4) {
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
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					username: form.name.trim(),
					email: form.email.trim(),
					password: form.password,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				setServerError(data.message || 'Signup failed. Please try again.')
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
				<section className="flex items-center justify-center p-6 sm:p-10">
					<form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">Sign up</p>
							<h2 className="mt-2 text-3xl font-extrabold text-white">Create your account</h2>
						</div>

						<label className="block">
							<span className="mb-2 flex items-center gap-2 text-sm text-slate-200">
								<UserRound size={16} />
								Name
							</span>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none ring-lime-300 transition focus:ring-2"
								placeholder="Your full name"
							/>
							{errors.name && <p className="mt-1 text-sm text-rose-300">{errors.name}</p>}
						</label>

						<label className="block">
							<span className="mb-2 flex items-center gap-2 text-sm text-slate-200">
								<Mail size={16} />
								Email
							</span>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none ring-lime-300 transition focus:ring-2"
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
								name="password"
								minLength={4}
								value={form.password}
								onChange={handleChange}
								className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none ring-lime-300 transition focus:ring-2"
								placeholder="Choose a password"
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
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-4 py-3 font-semibold text-slate-900 transition hover:bg-lime-200"
						>
							{isLoading ? 'Creating account...' : 'Create account'}
							<ArrowRight size={16} />
						</button>

						<p className="text-center text-sm text-slate-300">
							Already have an account?{' '}
							<Link to="/login" className="font-semibold text-lime-300 hover:text-lime-200">
								Sign in
							</Link>
						</p>
					</form>
				</section>

				<section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
					<div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-lime-400/30 blur-3xl" />
					<div className="absolute bottom-8 left-10 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

					<div className="relative z-10">
						<p className="inline-flex items-center rounded-full border border-lime-200/30 bg-lime-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-100">
							Fast Setup
						</p>
						<h1 className="mt-6 max-w-sm text-4xl font-black leading-tight text-white">
							Build momentum from your first login.
						</h1>
						<p className="mt-4 max-w-md text-sm text-slate-200/80">
							Minimal interface. Strong validation. Smooth onboarding across mobile and desktop.
						</p>
					</div>

					<div className="relative z-10 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-slate-200">
						<p className="font-semibold">Why this setup?</p>
						<p className="mt-1">It keeps auth simple while still giving users a polished experience.</p>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Signup
