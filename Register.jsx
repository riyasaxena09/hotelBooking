import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ selectedHotel, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    aadharNumber: '',
    guests: []
  });

  const [guestCount, setGuestCount] = useState(1);

  const handleGuestCountChange = (e) => {
    const count = parseInt(e.target.value);
    setGuestCount(count);
    setFormData(prev => ({
      ...prev,
      guests: Array(count).fill().map((_, i) => prev.guests[i] || { name: '', age: '', aadharNumber: '' })
    }));
  };

  const handleGuestChange = (index, field, value) => {
    const newGuests = [...formData.guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setFormData({ ...formData, guests: newGuests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user
      const userResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
        }),
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        // Create booking
        const bookingResponse = await fetch('http://localhost:3001/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userData.id,
            hotelId: selectedHotel.id,
            guests: formData.guests,
            status: 'pending',
            totalAmount: selectedHotel.price
          }),
        });

        if (bookingResponse.ok) {
          onSuccess();
          navigate('/booking-confirmation');
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Register for {selectedHotel?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={guestCount}
            onChange={handleGuestCountChange}
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Guest Details */}
        {formData.guests.map((guest, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-medium mb-2">Guest {index + 1}</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Guest Name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={guest.name}
                onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={guest.age}
                onChange={(e) => handleGuestChange(index, 'age', e.target.value)}
              />
              <input
                type="text"
                placeholder="Aadhar Number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={guest.aadharNumber}
                onChange={(e) => handleGuestChange(index, 'aadharNumber', e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register & Book
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;