import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar(){
    const { data: session, status } = useSession()

    return (
        <nav className="fixed w-full flex justify-around items-center bg-[#393E46] p-5 text-white flex-wrap z-50">
            <div>
                <p className="font-extrabold text-2xl">Anime List</p>
            </div>

            <ul className="flex gap-5 font-semibold text-lg">
                <Link href="/"><li>Home</li></Link>
                <li>Search</li>
                { status !== 'authenticated' ?
                    <div className="flex gap-5">
                        <li className="cursor-pointer" onClick={ () => signIn() }>Sign In</li>
                    </div>
                    // add user icon here
                    // figure out where to put log out button
                :   <div>  
                        <Link href="/user/userList"><li>{ session.user?.name }</li></Link>
                    </div>
                }
                <Link href="/about"><li>About</li></Link>
            </ul>
        </nav>
    )
}