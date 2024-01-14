import { fetchTrending } from "./api/trendingAnime";
import { fetchPopular } from './api/popularAnime';


export default async function Home() {
  const trend = await fetchTrending()
  const popular = await fetchPopular()

  return (
    <div className="px-10">
      <div className="h-[85vh] flex justify-center items-center flex-col font-extrabold pt-[15vh]">
        <p className="text-4xl 2xl:xl:text-5xl text-center">From classics to hidden gems, discover your</p>
        <p className="text-4xl 2xl:xl:text-5xl text-center">next anime obsession here.</p>
      </div>

      <main>
        <div className="pb-5">
          <p className="text-3xl font-semibold text-[#EEEEEE]">Trending</p>
        </div>
        <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
          {trend && trend.data.Page.media.map((item: any, i: any) => (
            <article key={i} className="rounded-2xl mx-auto max-w-[18%] shadow-xl bg-cover bg-center min-h-32 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                <h1 className=" text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {item.title.english == null ? item.title.romaji : item.title.english}
                </h1>
                <p className="opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {item.description.substring(0, 200) + '...'}
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
            <article key={i} className="rounded-2xl mx-auto max-w-[18%] shadow-xl bg-cover bg-center min-h-32 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                <h1 className=" text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {item.title.english == null ? item.title.romaji : item.title.english}
                </h1>
                <p className="opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {item.description.substring(0, 200) > 200 ? `${item.description.substring(0, 200)}...` : item.description.substring(0, 200) }
                </p>
              </div>
            </article>
            ))
          }
        </section>
      </main>
    </div>
  )
}
