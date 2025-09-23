import Link from "next/link"

export default function Navbar({ user }: { user?: any }) {

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
                {!user ? (
                    <div className="flex gap-5">
                        <Link href="/auth/login"><li>Login</li></Link>
                    </div>
                ) : (
                    <div className="flex gap-5">
                        <Link href="/user/userList"><li>{user.email}</li></Link>
                        <button onClick={() => handleSignOut()}>Logout</button>
                    </div>
                )}
                <Link href="/about"><li>About</li></Link>
            </ul>
        </nav>
    )
}
