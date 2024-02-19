import { animeListData } from "./api/fetchData";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Cards from "./components/cards"
import 'animate.css';

export default function Home() {
  const [trend, setTrend]: any = useState()
  const [popular, setPopular]: any = useState()
  const { data: session, status} = useSession()

  const trendingQuery: string =`query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        type
        genres
        coverImage {
          large
        }
      }
    }
  }`

  const popularQuery: string = `query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        type
        genres
        coverImage {
          large
        }
      }
    }
  }`

  
  useEffect(() => {
    async function fetchData() {
      try {
        setTrend(await animeListData(trendingQuery))
        setPopular(await animeListData(popularQuery))
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
      </div>

      <main>
        <Cards email={session?.user?.email} data={trend}  title="Trending" />
        <div className="mt-10"></div>
        <Cards email={session?.user?.email} data={popular}  title="All Time Popular" /> 
      </main>

      { status !== 'authenticated' ?
        <div className="mt-[10vh] h-36 w-full bg-[#00ADB5] rounded-t-2xl p-10 text-2xl 2xl:xl:text-3xl">
          <div className="flex justify-center items-center gap-5">
              <p className="w-1/2 font-extrabold">Take Anime List with you. Add an anime to a collection, review shows, and so much more!</p>

            <button onClick={ () => signIn() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl">Log In</button>
            <button onClick={ () => signIn() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl">Sign Up</button>
          </div>
        </div>
        :
        <div className="mt-[10vh] h-36 w-full bg-[#00ADB5] rounded-t-2xl p-10 text-2xl 2xl:xl:text-3xl">
          <div className="flex justify-center items-center gap-5">
            <p className="w-1/2 font-extrabold">{`Welcome, ${session.user?.name}.`} <span className="block">Thanks for signing in.</span></p>
            <button onClick={ () => signOut() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl">Log Out</button>
          </div>
        </div>
      }

    </div>
  )
}
