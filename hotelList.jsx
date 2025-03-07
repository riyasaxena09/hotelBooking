import { useEffect, useState } from 'react';

import Modal from './Modal';
import RegisterForm from './Register';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await fetch('http://localhost:3001/hotels');
      const data = await response.json();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  const handleImageClick = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Available Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="cursor-pointer"
              onClick={() => handleImageClick(hotel)}
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-48 object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-2">{hotel.location}</p>
              <p className="text-lg font-bold mb-2">₹{hotel.price} per night</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{hotel.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <RegisterForm 
          selectedHotel={selectedHotel} 
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default HotelList;