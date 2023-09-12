'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Entrypoint() {
  
  const [data, setData] = useState<Entrypoint[]>([])
  const [isLoading, setLoading] = useState(true)

  const deleteEntrypoint = async (indexToRemove: number, id: number) => {

    try {
      const response = await fetch(`http://ooparkinglot.test/api/entrypoints/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const updatedData = [...data.slice(0, indexToRemove), ...data.slice(indexToRemove + 1)];
        setData(updatedData);
      } else {
        // Request failed
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    
  };
 
  useEffect(() => {
    fetch('http://ooparkinglot.test/api/entrypoints')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data as Array<Entrypoint>)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No record found</p>

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Entrypoints</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link href="/entrypoint/create" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">Create New</Link>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    
                  </th>
                </tr>
              </thead>

              <tbody>

                {
                  data?.map((entrypoint: Entrypoint, index: number) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {entrypoint.id}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {entrypoint.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button onClick={() => deleteEntrypoint(index, entrypoint.id)} className="bg-red-500 text-white active:bg-red text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Delete</button>
                      </td>
                    </tr>
                  ))
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}