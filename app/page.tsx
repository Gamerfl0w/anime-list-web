

// put this api fetch in a seperate file
// add pagination
async function getAnime() {
  let variables = {
    page: 1,
    perPage: 5,
  };

  const res = await fetch('https://graphql.anilist.co', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(sort: TRENDING) {
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
      }
      `, 
      variables
    }),
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getAnime()

  return (
    <div className="px-10">

      <div className="h-[90vh] flex justify-center items-center flex-col font-extrabold">
        <p className="text-4xl 2xl:xl:text-5xl text-center">From classics to hidden gems, discover your</p>
        <p className="text-4xl 2xl:xl:text-5xl text-center">next anime obsession here.</p>
      </div>

      <main>
        <div className="pb-3">
          <p className="text-3xl font-semibold">Trending</p>
        </div>
        <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
          {data && data.data.Page.media.map((item: any, i: any) => (
            <article key={i} className="rounded-2xl mx-auto max-w-[18%] shadow-xl bg-cover bg-center min-h-32 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                <h1 className=" text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {item.title.english == null ? item.title.romaji : item.title.english}
                </h1>
                <p className="opacity-0 pb-3 text-white text-sm group-hover:opacity-80 transform duration-500">
                  {item.description.substring(0, 200) + '...'}
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
