import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function navbar(){
    const { data: session, status } = useSession()

    return (
        <nav className="fixed w-full flex justify-around items-center bg-[#393E46] p-5 text-white flex-wrap z-50">
            <div>
                <p className="font-extrabold text-xl">Anime List</p>
            </div>

            <ul className="flex gap-5 font-semibold">
                <li>Home</li>
                <li>Search</li>
                { status !== 'authenticated' ?
                    <div>
                        <li className="cursor-pointer" onClick={() => signIn()}>Login</li>
                        <li className="cursor-pointer" onClick={() => signIn()}>Register</li>
                    </div>
                    // add user icon here
                    // figure out where to put log out button
                :   <div>  
                        <li>{session.user?.name}</li>
                    </div>
                }
                <li>About</li>
            </ul>
        </nav>
    )
}