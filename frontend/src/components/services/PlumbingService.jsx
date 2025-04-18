import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample icons or replace with your image paths
import leakFix from '../../assets/plumbing.jpg';
import tapInstall from '../../assets/PLUMBING_NEW.jpg';

const plumbingServices = [
  { id: 1, name: "Leak Fixing", price: 300, time: "30 mins", image: leakFix },
  { id: 2, name: "Tap Installation", price: 500, time: "45 mins", image: tapInstall },
  { id: 3, name: "Shower Repair", price: 700, time: "60 mins", image: "/icons/shower.png" },
  { id: 4, name: "Pipe Replacement", price: 1000, time: "90 mins", image: "/icons/pipe-replace.png" },
  { id: 5, name: "Water Tank Cleaning", price: 1200, time: "2 hrs", image: "/icons/tank-clean.png" },
];

const PlumbingService = () => {
  const [selected, setSelected] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [address, setAddress] = useState('');

  const toggleService = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedItems = plumbingServices.filter(s => selected.includes(s.id));
  const total = selectedItems.reduce((sum, s) => sum + s.price, 0);

  const handleConfirmSchedule = async () => {
    const payload = {
      services: selectedItems,
      date: selectedDate,
      total,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Service booked successfully!');
        setShowDateModal(false);
        setSelected([]);
        setSelectedDate(null);
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Plumbing Services</h1>
        <p className="text-gray-500 mt-1 text-sm">Fix leaks, install taps & more</p>
      </div>

      {/* Service Grid */}
      <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plumbingServices.map(service => (
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

      {/* Cart Summary */}
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
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => setShowDateModal(true)}
          >
            Continue to Schedule
          </button>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDateModal && (
  <div className="fixed inset-0 bg-gradient-to-t from-gray-100 via-gray-200 to-white bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-gradient-to-br from-blue-100 to-white rounded-2xl p-8 w-[90%] max-w-lg shadow-xl transform transition-all duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Choose Your Appointment</h2>

      <div className="space-y-6">
        {/* Date Picker Section */}
        <div className="space-y-2">
          <label className="block text-md font-semibold text-gray-700">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Pick a date"
            className="w-full border-2 border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md hover:ring-4 hover:ring-blue-300"
          />
        </div>

        {/* Time Picker Section */}
        <div className="space-y-2">
          <label className="block text-md font-semibold text-gray-700">Preferred Time</label>
          <input
            type="time"
            className="w-full border-2 border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md hover:ring-4 hover:ring-blue-300"
            onChange={(e) => {
              const time = e.target.value;
              if (selectedDate) {
                const updatedDate = new Date(selectedDate);
                const [hours, minutes] = time.split(":");
                updatedDate.setHours(hours);
                updatedDate.setMinutes(minutes);
                setSelectedDate(updatedDate);
              }
            }}
          />
        </div>
        {/* Address Section */}
<div className="space-y-2">
  <label className="block text-md font-semibold text-gray-700">Your Address</label>
  <textarea
    rows={3}
    className="w-full border-2 border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md hover:ring-4 hover:ring-blue-300 resize-none"
    placeholder="House no, Street, Locality..."
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  ></textarea>
</div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        <button
          onClick={() => setShowDateModal(false)}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmSchedule}
          disabled={!selectedDate}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md ${
            selectedDate
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-300 cursor-not-allowed'
          }`}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PlumbingService;
