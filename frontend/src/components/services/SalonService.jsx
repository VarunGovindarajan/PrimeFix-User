import React, { useState } from 'react';
import Haircut from '../../assets/haircut.jpeg';
import facial from '../../assets/facial.jpeg';


const services = [
  { id: 1, name: "Haircut", price: 250, time: "30 mins", image: Haircut },
  { id: 2, name: "Facial", price: 800, time: "60 mins", image: facial },
  { id: 3, name: "Waxing", price: 500, time: "45 mins", image: "/icons/waxing.png" },
  { id: 4, name: "Threading", price: 150, time: "15 mins", image: "/icons/threading.png" },
  { id: 5, name: "Hair Coloring", price: 1000, time: "75 mins", image: "/icons/coloring.png" },
  { id: 6, name: "Hair Spa", price: 700, time: "60 mins", image: "/icons/spa.png" }
];

const SalonService = () => {
  const [selected, setSelected] = useState([]);

  const toggleService = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedItems = services.filter(s => selected.includes(s.id));
  const total = selectedItems.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Salon for Men & Women</h1>
        <p className="text-gray-500 mt-1 text-sm">Top-rated beauticians at your doorstep</p>
      </div>

      {/* Scrollable Service Grid */}
      <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 flex flex-col items-center transition-all duration-300">
              <img src={service.image} alt={service.name} className="w-20 h-20 object-contain mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.time}</p>
              <p className="text-blue-600 font-bold mt-1">₹{service.price}</p>
              <button
                onClick={() => toggleService(service.id)}
                className={`mt-4 w-full py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  selected.includes(service.id)
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {selected.includes(service.id) ? 'Remove' : 'Add'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Summary */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl rounded-2xl p-5 w-[320px] z-50">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Your Selection</h3>
          <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {selectedItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-700">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3 font-semibold text-gray-900">
            Total: ₹{total}
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Continue to Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default SalonService;
