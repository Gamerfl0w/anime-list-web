import Image from 'next/image'

async function getData() {
  const res = await fetch('https://catfact.ninja/fact')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

// put this api fetch in a seperate file
// add pagination
async function getAnime(query: string) {
  let variables = {
    search: query,
    page: 1,
    perPage: 10,
  };

  const res = await fetch('https://graphql.anilist.co', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
            id
            title {
              romaji
              english
              native
            }
            type
            genres
          }
        }
      }
      `, 
      variables
    }),
    next: { revalidate: 10 },
  })

  return res.json()
}


export default async function Home() {
  const data = await getAnime("Ichigo")
 
  return (
    <h2>{JSON.stringify(data)}</h2>
  )
}
