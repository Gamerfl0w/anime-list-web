export default function Cards({ data, title }: any){

  const handleSaveData = async (data: string) => {
    const response = await fetch('/api/mongoDB', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data }),
    });

    if (response.ok) {
      alert('Data saved successfully!');
    } else {
      alert('Something went wrong!');
    }
  };

    return(
        <div>
            <div className="pb-5">
          <p className="text-3xl font-semibold text-[#EEEEEE]">{ title }</p>
        </div>
        <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
          {data && data.data.Page.media.map((item: any, i: any) => (
            <article key={i} className="group rounded-2xl mx-auto max-w-[230px] shadow-xl bg-cover bg-center min-h-32 max-h-96 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
              style={{ backgroundImage: `url(${item.coverImage.large})` }}>
              <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                
                <div className="absolute top-2 right-2">
                  <button onClick={() => handleSaveData(item.id)} className="hidden group-hover:block p-1 float-right bg-slate-500 transform hover:bg-slate-700 duration-300 rounded-md">Add</button>
                </div>

                <h1 className="text-white text-[20px] mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
                  {
                   item.title.english == null 
                   ? item.title.romaji
                   : item.title.english.length > 28 
                   ? `${item.title.english.substring(0, 28)}...`
                   : item.title.english
                  }
                </h1>
                   <p dangerouslySetInnerHTML={{__html: item.description.length > 200
                    ? `${item.description.substring(0, 200)}...` 
                    : item.description.substring(0, 200) }} 
                    className="min-w-0 text-ellipsis  opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}} />
              </div>
            </article>
              
            ))
          }
        </section>
        </div>
    )
}