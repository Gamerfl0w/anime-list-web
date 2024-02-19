import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiMinus } from '@mdi/js';
import 'animate.css';


export default function UserList() {
  const [list, setList]: any = useState()
  const { data: session } = useSession()

  const getUserList = async (email: string | null | undefined) => {
      const res = await fetch('/api/user/getList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      return res.json()
  };

  useEffect(() => {
    async function getData() {
      try {
        setList(await getUserList(session?.user?.email))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

    return(
      <div className='pt-[15vh] pb-5'>
          <h1 className='text-center text-5xl opacity-40 font-semibold'>{`${session?.user?.name}'s List`}</h1>
          <main className='mt-10 w-full flex flex-wrap justify-center items-center gap-5'>
         { list && list.map((item: any, i: any) => (
            <div key={i} className='animate__animated animate__fadeInRight group cursor-pointer h-[350px] w-[170px] sm:w-[200px] flex flex-col rounded-2xl bg-[#00ADB5] hover:shadow-md shadow-black flex-shrink-0'>
            <div className='relative opacity-0 group-hover:opacity-100'>
              <div className='absolute right-2 top-2 p-1 bg-slate-500 transform translate-x-[20px] group-hover:translate-x-0 duration-300 hover:bg-slate-700 rounded-md'>
                <Icon path={mdiMinus} size={1} color={"#fff"} />
              </div>
            </div>
            <img className='max-h-[200px] rounded-t-2xl' src={item.img} alt="" />
            <div className='flex flex-col justify-center gap-2 w-full h-full px-3'>
              <p className='font-bold text-white'>{item.title}</p>
              <p dangerouslySetInnerHTML={{__html: item.details }} 
                className='font-semibold text-ellipsis break-words overflow-hidden max-h-16 text-sm text-black'>
              </p>
            </div>
            </div>    
          ))
          }
          </main> 
      </div>
    )
}
