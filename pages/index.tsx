import { animeListData } from "./api/fetchData";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Cards from "./components/cards"
import 'animate.css';
import { createClient } from '@/utils/supabase/server-props'
import type { GetServerSideProps } from 'next'
import Link from "next/link";

export default function Home({ user }: { user?: any }) {
  const [trend, setTrend]: any = useState()
  const [popular, setPopular]: any = useState()
  const { data: session, status} = useSession()
  const [username, setUsername] = useState<string | null>(null);

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
    
    const cachedUsername = localStorage.getItem("username");
    setUsername(cachedUsername);
  },[])

  return (
    <div className="px-10">
      <div className="h-[85vh] flex justify-center items-center flex-col font-extrabold pt-[15vh] text-[#EEEEEE]">
        <p className="text-[2.5rem] leading-snug 2xl:xl:text-5xl text-center">From classics to hidden gems, discover your</p>
        <p className="text-[2.5rem] leading-snug 2xl:xl:text-5xl text-center">next anime obsession here</p>
      </div>

      <main>
        <Cards data={trend} title="Trending" auth={user} />
        <div className="mt-10"></div>
        <Cards data={popular} title="All Time Popular" auth={user} /> 
      </main>

      {/* footer */}
      { !user ?
        <div className="mt-[10vh] h-36 w-full bg-[#00ADB5] rounded-t-2xl p-10 text-2xl 2xl:xl:text-3xl">
          <div className="flex justify-center items-center gap-5">
              <p className="w-1/2 font-extrabold">Take Anime List with you. Add an anime to a collection, review shows, and so much more!</p>

            <Link href="/auth/login" className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl text-white">Log In</Link>
            <Link href="/auth/register" className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl text-white">Sign Up</Link>
          </div>
        </div>
        :
        <div className="mt-[10vh] h-36 w-full bg-[#00ADB5] rounded-t-2xl p-10 text-2xl 2xl:xl:text-3xl">
          <div className="flex justify-center items-center gap-5">
            <p className="w-1/2 font-extrabold text-slate-900">{`Welcome, ${username}.`} <span className="block">Thanks for signing in.</span></p>
            <button onClick={ () => signOut() } className="font-semibold p-4 bg-[#222831] text-xl rounded-2xl text-white">Log Out</button>
          </div>
        </div>
      }

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createClient(ctx)
  const { data: { user } } = await supabase.auth.getUser()

  return { props: { user } }
}
