import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/eproducts")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    // Calculate the total price by summing up the prices of items in the cart
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="">
      <div className="container mt-5">
        <h1 className="font-monospace bg-warning text-center">
          SHOPEM
          <i className="fa fa-shopping-bag" aria-hidden="true"></i>
        </h1>
      </div>
      <div id="prodisplay" className="container row mx-auto mb-5">
        {products.map((product) => (
          <div className="col-md-2 card mx-2 my-2" key={product.id}>
            <h6>{product.name}</h6>
            {product.image && (
              <Link to={`product/${product.id}`}>
                <img
                  className="img-fluid"
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: '100%' }}
                />
              </Link>
            )}
            <p>Category: {product.category}</p>
            <p>Price: ksh{product.price}</p>
            <button id="button" onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
            <p>Total Price: ksh{calculateTotalPrice()}</p>
            <ShoppingCart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
          </>
        )}
      </div>
    </div>
  );
}
