import { fetchTrending } from "./api/trendingAnime";
import { fetchPopular } from './api/popularAnime';
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [trend, setTrend]: any = useState()
  const [popular, setPopular]: any = useState()
  const { data: session, status} = useSession()

  // fix html tags in the description
  useEffect(() => {
    async function fetchData() {
      try {
        setTrend(await fetchTrending())
        setPopular(await fetchPopular())
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  },[])

  return (
    <div className="px-10">
      <div className="h-[85vh] flex justify-center items-center flex-col font-extrabold pt-[15vh] text-[#EEEEEE]">
        <p className="text-[2.5rem] leading-snug 2xl:xl:text-5xl text-center">From classics to hidden gems, discover your</p>
        <p className="text-[2.5rem] leading-snug 2xl:xl:text-5xl text-center">next anime obsession here</p>
        {/* <button onClick={ () => signOut() }>Sign out</button> */}
      </div>

      <main>
        <div className="pb-5">
          <p className="text-3xl font-semibold text-[#EEEEEE]">Trending</p>
        </div>
        <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
          {trend && trend.data.Page.media.map((item: any, i: any) => (
            <article key={i} className="rounded-2xl mx-auto max-w-[230px] shadow-xl bg-cover bg-center min-h-32 max-h-96 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                <h1 className="text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {
                   item.title.english == null 
                   ? item.title.romaji
                   : item.title.english.length > 28 
                   ? `${item.title.english.substring(0, 28)}...`
                   : item.title.english
                  }
                </h1>
                <p className="min-w-0 text-ellipsis  opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {
                    item.description.length > 200
                    ? `${item.description.substring(0, 200)}...` 
                    : item.description.substring(0, 200) 
                  }
                </p>
              </div>
            </article>
            ))
          }
        </section>
        

        <div className="mt-[10vh] pb-5">
          <p className="text-3xl font-semibold text-[#EEEEEE]">Popular</p>
        </div>
        <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
          {popular && popular.data.Page.media.map((item: any, i: any) => (
            <article key={i} className="rounded-2xl mx-auto max-w-[18%] shadow-xl bg-cover bg-center min-h-32 max-h-96 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                <h1 className=" text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                {
                   item.title.english == null 
                   ? item.title.romaji
                   : item.title.english.length > 28 
                   ? `${item.title.english.substring(0, 28)}...`
                   : item.title.english
                }
                </h1>
                <p className="opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {
                    item.description.length > 200
                    ? `${item.description.substring(0, 200)}...` 
                    : item.description.substring(0, 200) 
                  }
                </p>
              </div>
            </article>
            ))
          }
        </section>
      </main>

      { status !== 'authenticated' ?
        <div className="mt-[10vh] h-36 w-full bg-[#00ADB5] rounded-t-2xl p-10 text-2xl 2xl:xl:text-3xl">
          <div className="flex justify-center items-center gap-5">
              <p className="w-1/2 font-extrabold">Take Anime List with you. Add an anime to a collection, review shows, and so much more!</p>

            <button onClick={ () => signIn() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl">Log In</button>
            <button onClick={ () => signIn() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl">Sign Up</button>
          </div>
        </div>
        : ''
      }

    </div>
  )
}
