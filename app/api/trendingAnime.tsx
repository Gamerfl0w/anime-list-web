export const fetchTrending = async () => {
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