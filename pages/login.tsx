import { useRouter } from 'next/router'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/component'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function logIn() {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
        }
        router.push('/')
    }

    async function signUp() {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            console.error(error)
        }
        router.push('/')
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm space-y-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="text-2xl font-bold text-center mb-4">Login / Signup</h1>

                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={logIn}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-400"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={signUp}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-400"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </main>
    )
}