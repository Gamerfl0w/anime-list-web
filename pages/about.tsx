import Image from 'next/image'

export default function About(){
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen pt-[10vh] px-[10%]">
            <div className='float-start flex flex-start items-center w-full h-full mr-10 text-7xl 2xl:text-[9rem] font-extrabold opacity-40'>
                <p>About</p>
            </div>
            <div className='w-full h-full flex justify-center items-start my-5 gap-[10%]'>
                <div className='h-[70vh] w-[400px] relative flex-shrink-0'>
                    <Image
                        src="/Retard.png"
                        alt="Picture of the developer"
                        layout="fill"
                        className="rounded-lg" 
                    />
                </div>
                
                <div className='w-[40%] text-xl'>
                    <p className='text-5xl font-extrabold'>Biography</p>
                    <p className='my-5'>
                        Just a passionate individual who immerses himself in the dynamic realms of web development, software engineering, and gaming, driven by an insatiable curiosity and unwavering enthusiasm for exploring the limitless possibilities within these captivating domains.   
                    </p>
                    <p className='text-3xl font-bold mt-10'>Contact Information</p>
                    <p>Name: Joshua Luis De Chavez</p>
                    <p>Email: jluisdechavez@gmail.com</p>
                    <p>Phone: 09959577900</p>
                    <p>Portfolio: <a className='underline' href="https://j0shua-portfolio.netlify.app/">https://j0shua-portfolio.netlify.app/</a></p>
                </div>
            </div>
        </div>
    )
}