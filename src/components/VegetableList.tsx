import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Vegetable {
  id: number;
  name: string;
  price: number;
  image: string;
}

const vegetables: Vegetable[] = [
  { id: 1, name: 'Tomato', price: 2.99, image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Carrot', price: 1.99, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Broccoli', price: 3.49, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Spinach', price: 2.49, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const VegetableList: React.FC = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  const addToCart = (vegetableId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [vegetableId]: (prevCart[vegetableId] || 0) + 1,
    }));
  };

  const removeFromCart = (vegetableId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[vegetableId] > 1) {
        newCart[vegetableId]--;
      } else {
        delete newCart[vegetableId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Fresh Vegetables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vegetables.map((vegetable) => (
          <div key={vegetable.id} className="border rounded-lg p-4 flex flex-col">
            <img src={vegetable.image} alt={vegetable.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{vegetable.name}</h3>
            <p className="text-gray-600">${vegetable.price.toFixed(2)}</p>
            <div className="mt-auto flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => removeFromCart(vegetable.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  disabled={!cart[vegetable.id]}
                >
                  -
                </button>
                <span className="mx-2">{cart[vegetable.id] || 0}</span>
                <button
                  onClick={() => addToCart(vegetable.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {getTotalItems() > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Checkout ({getTotalItems()} items)
          </button>
        </div>
      )}
    </div>
  );
};

export default VegetableList;