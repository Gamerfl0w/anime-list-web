export const animeListData = async (query: string, pageNum: number = 1) => {
    let variables = {
        page: pageNum,
        perPage: 5,
      };
    
      const res = await fetch('https://graphql.anilist.co', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query, 
          variables
        }),
        next: { revalidate: 10 },
      })
    
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
      return res.json()
}