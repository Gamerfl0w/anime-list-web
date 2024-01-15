import Link from "next/link";


export default function navbar(){
    return (
        <nav className="fixed w-full flex justify-around items-center bg-[#393E46] p-5 text-white flex-wrap z-50">
            <div>
                <p className="font-extrabold text-xl">Anime List</p>
            </div>

            <ul className="flex gap-5 font-semibold">
                <li>Search</li>
                <li>Login</li>
                <li><Link href="/about">Register</Link></li>
                <li>About</li>
            </ul>
        </nav>
    )
}