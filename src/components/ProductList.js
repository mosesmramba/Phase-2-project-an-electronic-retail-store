import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/eproducts")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="">
      <div className="container mt-5">
        <h1 className="font-monospace bg-warning text-center">SHOPEM<i class="fa fa-shopping-bag" aria-hidden="true"></i></h1>
      </div>
      <div id='prodisplay' className="container row mx-auto">
        {products.map((product) => (
          <div className='col-md-2 card mx-2 my-2' key={product.id}>
            <h6>{product.name}</h6>
            {product.image && (
              <Link to={`product/${product.id}`}>
              <img className='img-fluid' src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
              </Link>
             
            )}
            <p>Category: {product.category}</p>
            <p>Price: ksh{product.price}</p>
            {/* <h4>Specifications:</h4>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <p>Warranty: {product.specifications.Warranty}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
