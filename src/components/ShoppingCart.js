import React from 'react';

export default function ShoppingCart({ cart, onRemoveFromCart }) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Price: ksh{item.price}
            <button onClick={() => onRemoveFromCart(item.id)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ksh{getTotalPrice()}</p>
    </div>
  );
}
