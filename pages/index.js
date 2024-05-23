import React from 'react';
import Link from 'next/link';
export async function getServerSideProps() {
  try {
    const response = await fetch("https://unstats.un.org/sdgapi/v1/sdg/Goal/List?includechildren=false");
    if (!response.ok) {
      throw new Error(`Failed to fetch goals, status: ${response.status}`);
    }
    const data = await response.json();
    return {
      props: {
        data: data
      },
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Failed to load data.",
        data: [{ title: 'API Error'}]
      }
    };
  }
}
export function getRandomColor() {
  const colors = [
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
export default function Home({data}) {
  return (
    <div className=" bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1530&q=80)`}}>
      <h1 className="h-20 bg-blue-400 flex items-center justify-center text-2xl font-bold mb-4 " >THE GOALS</h1>
      <div className="h-30 w-15 mt-16 mb-5 ml-7">
        <h2 className="text-5xl text-left font-light" >{Object.keys(data).length} GOALS TO </h2>
        <h2  className="text-5xl text-left font-light">TRANSFORM OUR</h2>
        <h2 className="text-5xl text-left font-light">WORLD</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map((goal) => (
            <Link href={{pathname: `/goal/${goal.code}`}} class={`m-2 ${getRandomColor()} `} key={goal.code}>
              <div className="flex ">
                <h1 className="text-4xl  font-bold m-4">{goal.code}</h1> 
                <h2 className="text-lg">{goal.title}</h2>
              </div>
            </Link>
        ))}
      </div>
      <Link className="mt-10 h-20 bg-blue-400 flex items-center justify-center text-2xl font-bold mb-4 " href={`aboutus`}>
        ABOUT US 
      </Link>
    </div>
  );
}
