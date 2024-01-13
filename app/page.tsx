import Image from 'next/image'

async function getData() {
  const res = await fetch('https://catfact.ninja/fact')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}




export default async function Home() {
  const data = await getData()
 
  return (
    <h2>{JSON.stringify(data)}</h2>
  )
}
