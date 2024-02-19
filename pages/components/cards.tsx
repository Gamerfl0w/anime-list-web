import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Notif from '../components/notification'

export default function Cards({ email, data, title }: any){
  const [notif, setNotif]: any = useState(false)
  const [msg, setMsg]: any = useState('')
  const [isSuccess, setIsSuccess]: any = useState(false)
  const { status } = useSession()

  const addToList = async (email: string, data: string, img: string, title: string, details: string) => {
    const response = await fetch('/api/user/saveToList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, data: data, img: img, title: title, details: details }),
    });

    if (response.ok) {
      setMsg("Successfully added to your list.")
      setIsSuccess(true)
      setNotif(true)
    } else {
      setMsg("This anime is already in your list.")
      setIsSuccess(false)
      setNotif(true)
    }

    setTimeout(function(){
      setNotif(false)
    }, 3000);
  };

    return(
        <div>
          {notif && <Notif msg={msg} isSuccess={isSuccess} />}

          <div className="pb-5">
            <p className="text-3xl font-semibold text-[#EEEEEE]">{ title }</p>
          </div>
          <section className="flex flex-wrap justify-center gap-5 mb-5 px-5">
            {data && data.data.Page.media.map((item: any, i: any) => (
              <article key={i} className="animate__animated animate__fadeInRight group rounded-2xl mx-auto max-w-[230px] shadow-xl bg-cover bg-center min-h-32 max-h-96 transform duration-500 hover:-translate-y-2 cursor-pointer group" 
                style={{ backgroundImage: `url(${item.coverImage.large})` }}>
                <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">
                  
                  {
                    status === 'authenticated' && 
                    <div className="absolute top-2 right-2">
                      <button onClick={ () => addToList(email, item.id, item.coverImage.large, 
                        item.title.english == null ? item.title.romaji : item.title.english,
                          item.description) } className='hidden group-hover:block p-1 float-right bg-slate-500 transform hover:bg-slate-700 duration-300 rounded-md'>
                        <Icon path={mdiPlus} size={1} />
                      </button>
                    </div>
                  }

                  <h1 className="text-white text-[20px] text-ellipsis break-words overflow-hidden max-h-16 mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{textShadow: `black 0.1em 0.1em 0.2em`}}>
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
                      className="min-w-0 text-ellipsis opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{textShadow: `black 0.1em 0.1em 0.2em`}} />
                </div>
              </article>
                
              ))
            }
          </section>
        </div>
    )
}