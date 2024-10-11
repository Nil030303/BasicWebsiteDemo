import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Vegetable {
  id: number;
  name: string;
  price: number;
}

const vegetables: Vegetable[] = [
  { id: 1, name: 'Tomato', price: 2.99 },
  { id: 2, name: 'Carrot', price: 1.99 },
  { id: 3, name: 'Broccoli', price: 3.49 },
  { id: 4, name: 'Spinach', price: 2.49 },
];

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || {};

  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [vegetableId, quantity]) => {
      const vegetable = vegetables.find((v) => v.id === parseInt(vegetableId));
      return total + (vegetable?.price || 0) * (quantity as number);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement order submission logic
    console.log('Order submitted:', { userDetails, cart });
    alert('Order placed successfully!');
    navigate('/vegetables');
  };

  return (
    <div className="container mx-auto mt-10 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="mb-4">
          {Object.entries(cart).map(([vegetableId, quantity]) => {
            const vegetable = vegetables.find((v) => v.id === parseInt(vegetableId));
            return (
              <li key={vegetableId} className="flex justify-between mb-2">
                <span>{vegetable?.name} x {quantity}</span>
                <span>${((vegetable?.price || 0) * (quantity as number)).toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
        <div className="text-xl font-bold mb-6">
          Total: ${calculateTotal().toFixed(2)}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">Delivery Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;