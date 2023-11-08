import React, { useState, useEffect } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
    image: '',
    specifications: {},
  });

  const [isAdding, setIsAdding] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value,
    });
  };
  const handleAddProduct = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    if (isAdding) {
      fetch('http://localhost:7000/eproducts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          console.log('Product added:', newProduct);
          setIsAdding(false);
        })
        .catch((error) => {
          console.error('Error adding product: ', error);
          setIsAdding(false);
        });
    }
  }, [isAdding, product]);

  return (
    <div className="container row mt-5 mb-5">
      <div className='col-md-6 bg-warning'>
        <h1 className="font-monospace  text-center">Add Product</h1>
      </div>
      <div className='col-md-6'>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Specification:</label>
            <input
              type="text"
              id="Specifications"
              name="Specifications"
              value={product.specifications}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
