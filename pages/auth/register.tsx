import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/component'
import Link from 'next/link'
import { Button, Stack, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

export default function RegistrationPage() {
    const router = useRouter()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [data, setData] = useState<any>(null)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const modals = useModals();

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

    async function checkForServerErrors(serverError: string, authType?: string) {
        setLoading(true)

        if (serverError && !authType) {
            setErrorMsg(serverError)
            setLoading(false)
            return
        } else {
            if (authType === 'signUp' && data) {
                const user = data;

                const { error: profileError } = await supabase
                    .from("profiles")
                    .update({ username })
                    .eq("id", user.id);
                if (profileError) {
                    setErrorMsg(profileError.message)
                } else {
                    verifyEmailModal()
                }
            } else {
                // router.push('/')
            }
        }
    }

    async function signUp() {
        setErrorMsg('')
        setEmailError('')
        setPasswordError('')

        if (checkForErrors() === null) {
            const { data: signUpData, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            const user = signUpData.user;
            if (!user) return;

            const { error: profileError } = await supabase
                .from("profiles")
                .update({ username })
                .eq("id", user.id);

            if (profileError) {
                setErrorMsg(profileError.message);
            } else {
                localStorage.setItem("username", username);
                verifyEmailModal();
            }
        }
    }


    function verifyEmailModal() {
        modals.openConfirmModal({
            title: 'Verify Email',
            children: (
                <Stack align="center" gap="md">
                    <Text size="lg" mt="md">
                        Please check your inbox and click the link to verify your account.
                    </Text>
                </Stack>
            ),
            labels: { confirm: 'Hidden', cancel: 'Hidden' },
            confirmProps: { style: { display: 'none' } },
            cancelProps: { style: { display: 'none' } },
            onClose: () => { setLoading(false); router.push('/'); },
        });
    }

    // useEffect(() => {
    //     verifyEmailModal();
    // }, []);

    return (
        <div className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-4xl/9 font-bold tracking-tight text-white">Anime List</h2>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">Create a new account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">Username</label>
                        <div className="mt-2">
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

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
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-[#00adb5] hover:text-[#dae3e4]">Forgot password?</a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            {passwordError && <p className="mt-2 text-center text-sm text-red-500">{passwordError}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={signUp} className="flex w-full justify-center rounded-md bg-[#00adb5] px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-[#dae3e4] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register</button>
                        {errorMsg && <p className="mt-2 text-center text-sm text-red-500">{errorMsg}</p>}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already have an existing account?
                    <Link href="/auth/login" onClick={signUp} className="font-bold text-[#00adb5] hover:text-[#dae3e4] ml-3">Login here</Link>
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