'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [entrypoint, setEntrypoint] = useState<Entrypoint[]>([]);
  const [slot, setSlot] = useState<Slot[]>([]);
  const [formData, setFormData] = useState<ParkingFormData>({} as ParkingFormData);

  useEffect(() => {
    fetch('http://ooparkinglot.test/api/entrypoints')
      .then((res) => res.json())
      .then((entrypointData) => {
        setEntrypoint(entrypointData.data as Array<Entrypoint>);
      })
  }, []);

  useEffect(() => {
    fetch(`http://ooparkinglot.test/api/entrypoints/${formData.entrypoint_id}`)
      .then((res) => res.json())
      .then((entrypointData) => {
        setSlot(entrypointData.data.slots);
      });
  }, [formData.entrypoint_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as ParkingFormData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as ParkingFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://ooparkinglot.test/api/parkings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        console.log(data);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Registration ID
              </label>
            </div>
            <div className="md:w-2/3">
              <input name="registration_id" onChange={handleInputChange} value={formData.registration_id} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Vehicle Size
              </label>
            </div>
            <div className="md:w-2/3">
            <select name="vehicle_size" onChange={handleSelectChange} value={formData.vehicle_size} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value=""></option>
              <option value={0}>Small</option>
              <option value={1}>Medium</option>
              <option value={2}>Large</option>
            </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Entrypoint
              </label>
            </div>
            <div className="md:w-2/3">
            <select name="entrypoint_id" value={formData.entrypoint_id} onChange={handleSelectChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value=""></option>
              {
                 entrypoint?.map((entrypoint: Entrypoint, index: number) => (
                  <option key={index} value={entrypoint.id}>{entrypoint.name}</option>
                 ))
              }
            </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Slot
              </label>
            </div>
            <div className="md:w-2/3">
            <select name="slot_id" value={formData.slot_id} onChange={handleSelectChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value=""></option>
              {
                 slot?.map((slot: Slot, index: number) => (
                  <option key={index} value={slot.id}>{slot.id} - {slot.size}</option>
                 ))
              }
            </select>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Park
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}