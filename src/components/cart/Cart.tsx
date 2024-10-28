 import React from 'react';
import { useCart } from '../CartContext';
 
const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Items Added to Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
