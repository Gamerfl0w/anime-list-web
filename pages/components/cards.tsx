import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useEffect, useState } from 'react';
import Notif from '../components/notification'
import { createClient } from '@/utils/supabase/component'
import Spinner from './spinner';

const supabase = createClient();

export default function Cards({ email, data, title, auth }: any) {
  const [notif, setNotif]: any = useState(false)
  const [msg, setMsg]: any = useState('')
  const [isSuccess, setIsSuccess]: any = useState(false)
  const [loading, setLoading] = useState(false)


  const addToList = async (animeId: number) => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    try {
      // Check if user is authenticated
      if (!auth) {
        setMsg("Please log in to add to your list.")
        setIsSuccess(false)
        setNotif(true)
        setTimeout(() => setNotif(false), 3000)
        setLoading(false)
        return
      }

      if (await checkIfAnimeExists(user?.id as string, animeId)) {
        setMsg("Anime is already in your list.")
        setIsSuccess(false)
        setLoading(false)
      } else {
        const { data, error } = await supabase
          .from('anime_lists')
          .insert([{ anime_id: animeId, user_id: user?.id }])
          .select()
        if (!error) {
          setMsg("Successfully added to your list.")
          setIsSuccess(true)
        } else {
          setMsg("Failed to add to list.")
          setIsSuccess(false)
        }
      }

      setNotif(true)
      setTimeout(() => setNotif(false), 3000)

    } catch (error) {
      console.error('Error adding to list:', error)
      setMsg("An error occurred while adding to list.")
      setIsSuccess(false)
      setNotif(true)
      setTimeout(() => setNotif(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  async function checkIfAnimeExists(userId: string, animeId: number) {
    const { data, error } = await supabase
      .from('anime_lists')
      .select('id')
      .eq('user_id', userId)
      .eq('anime_id', animeId)
      .maybeSingle()

    if (error) {
      console.error('Check error:', error)
      return false
    }

    return !!data
  }

  // useEffect(() => {
  //   console.log("session:", session?);
  // }, []);

  return (
    <div>
      {notif && <Notif msg={msg} isSuccess={isSuccess} />}

      <div className="pb-5">
        <p className="text-3xl font-semibold text-[#EEEEEE]">{title}</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7">
        {data && data.data.Page.media.map((item: any, i: any) => (
          <article key={i} className="animate__animated animate__fadeInRight group rounded-2xl mx-auto max-w-[230px] shadow-xl bg-cover bg-center min-h-32 max-h-96 transform duration-500 hover:-translate-y-2 cursor-pointer group"
            style={{ backgroundImage: `url(${item.coverImage.large})` }}>
            <div className="bg-black h-full rounded-2xl bg-opacity-20 min-h-32 px-10 flex flex-wrap flex-col pt-10 hover:bg-opacity-75 transform duration-300">

              {auth &&
                <div className="absolute top-2 right-2">
                  <button onClick={() => addToList(item.id)} className='hidden group-hover:block p-1 float-right bg-slate-500 transform hover:bg-slate-700 duration-300 rounded-md'>
                    <Icon path={mdiPlus} size={1} />
                  </button>
                </div>
              }

              <h1 className="text-white text-[20px] text-ellipsis break-words overflow-hidden max-h-16 mb-3 transform translate-y-20 group-hover:translate-y-0 duration-300" style={{ textShadow: `black 0.1em 0.1em 0.2em` }}>
                {
                  item.title.english == null
                    ? item.title.romaji
                    : item.title.english.length > 28
                      ? `${item.title.english.substring(0, 28)}...`
                      : item.title.english
                }
              </h1>
              <p dangerouslySetInnerHTML={{
                __html: item.description.length > 200
                  ? `${item.description.substring(0, 200)}...`
                  : item.description.substring(0, 200)
              }}
                className="min-w-0 text-ellipsis opacity-0 pb-3 text-white text-sm group-hover:opacity-85 transform duration-500" style={{ textShadow: `black 0.1em 0.1em 0.2em` }} />
            </div>
          </article>

        ))
        }
      </section>
      <Spinner loading={loading} />
    </div>
  )
}