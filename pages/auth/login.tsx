import { useRouter } from 'next/router'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/component'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    function validateInputs() {
        if (!email && !password) {
            return { field: 'both', message: 'Email and password are required' }
        }
        if (!email) {
            return { field: 'email', message: 'Email is required' }
        }
        if (!password) {
            return { field: 'password', message: 'Password is required' }
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { field: 'email', message: 'Invalid email format' }
        }
        if (password.length < 6) {
            return { field: 'password', message: 'Password must be at least 6 characters' }
        }
        return null
    }

    // check for validation errors and set error messages
    function checkForErrors() {
        setLoading(true)
        const validationError = validateInputs()

        if (validationError) {
            if (validationError.field === 'email') {
                setEmailError(validationError.message)
            } else if (validationError.field === 'password') {
                setPasswordError(validationError.message)
                setEmailError('')
                setErrorMsg('')
            }
            setLoading(false)
            return
        }

        return null;
    }

    function checkServerError(serverError: string) {
        setLoading(true)

        if (serverError) {
            setErrorMsg(serverError)
            setLoading(false)
            return
        } else {
            router.push('/')
        }
    }

    async function logIn() {
        setErrorMsg('')
        setEmailError('')
        setPasswordError('')
        if (checkForErrors() === null) {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            // server check for errors
            checkServerError(error?.message || '')
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-4xl/9 font-bold tracking-tight text-white">Anime List</h2>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">Log in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            <p>{emailError && <p className="mt-2 text-center text-sm text-red-500">{emailError}</p>}</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-[#00adb5] hover:text-[#dae3e4]">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            {passwordError && <p className="mt-2 text-center text-sm text-red-500">{passwordError}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={logIn} className="flex w-full justify-center rounded-md bg-[#00adb5] px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-[#dae3e4] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                        {errorMsg && <p className="mt-2 text-center text-sm text-red-500">{errorMsg}</p>}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    No account yet?
                    <Link href="/auth/register" className="font-bold text-[#00adb5] hover:text-[#dae3e4] ml-3">Sign up here</Link>
                </p>
            </div>
            {
                loading && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
        </div>
    )
}