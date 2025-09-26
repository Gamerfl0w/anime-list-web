import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar({ user }: { user?: any }) {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const cachedUsername = localStorage.getItem("username");
        setUsername(cachedUsername);
        // console.log("User:", user);
    }, []);

    async function handleSignOut() {
        const res = await fetch("/api/auth/logout", { method: "POST" })
        if (res.ok) {
            window.location.href = "/" // redirect after logout
        } else {
            console.error("Logout failed")
        }
    }

    return (
        <nav className="fixed w-full flex justify-around items-center bg-[#393E46] p-5 text-white flex-wrap z-50">
            <div>
                <Link href="/" className="font-extrabold text-2xl">Anime List</Link>
            </div>

            <ul className="flex gap-5 font-semibold text-lg">
                <Link href="/"><li>Home</li></Link>
                <li>Search</li>
                <Link href="/about"><li>About</li></Link>
                {!user ? (
                    <div className="flex gap-5">
                        <Link href="/auth/login"><li>Login</li></Link>
                    </div>
                ) : (
                    <div className="flex gap-5">
                        <Link href="/user/userList"><li>{username}</li></Link>
                        <button onClick={() => handleSignOut()}>Logout</button>
                    </div>
                )}
            </ul>
        </nav>
    )
}
