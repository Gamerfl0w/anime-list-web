

export default function navbar(){
    return (
        <nav className="fixed w-full flex justify-around items-center bg-[#393E46] p-5 text-white flex-wrap z-50">
            <div>
                <p>Anime List</p>
            </div>

            <div className="flex-shrink-0">
                <p>Search</p>
            </div>

            <ul className="flex gap-5">
                <li>Home</li>
                <li>Login</li>
                <li>Register</li>
                <li>About</li>
            </ul>
        </nav>
    )
}