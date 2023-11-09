import React, { useState, useEffect } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    specifications: {
        'Camera Resolution':'',
        Condition:'',
        'Video Resolution':'',
        Type:'',
        'Connection Type':'',
        Storage:'',
        Brand: '',
        Duplex: '',
        Paper: '',
        'Print Technology': '',
        Warranty:'',
        'Printer Ports':'',
    }, // Store specifications as an array
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    const product=product;
    console.log(product);
    setIsAdding(true);
  };
  const handleSpecification=(e)=>{
    const {name, value}=e.target;
    setProduct((prevProduct)=>({
      ...prevProduct,
      specifications:{
        ...product.specifications,[name]:value,
      }
    }))
  }

  useEffect(() => {
    if (isAdding) {
      fetch('http://localhost:7000/eproducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      <div className="col-md-6 bg-warning">
        <h1 className="font-monospace text-center">Add Product</h1>
      </div>
      <div className="col-md-6">
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
              <select class="form-select" aria-label="Default select example">
                <option selected disabled>Select Category</option>
                <option value="Laptop">Laptop</option>
                <option value="Phones">Phones</option>
                <option value="Tablet">Tablet</option>
                <option value="Camera">Camera</option>
                <option value="Audio">Audio</option>
                <option value="Gaming">Gaming</option>
                <option value="TV">TV</option>
                <option value="Printers">Printers</option>
                <option value="HomeAppliance">HomeAppliance</option>
              </select>
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
            <label htmlFor="specifications">Specifications</label>
            <label htmlFor="brand">Brand:
            <input
              type="text"
              id="brand"
              name="Brand"
              value={product.specifications.Brand}
              onChange={handleSpecification}
              className="form-control"
            />
            </label>
  
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
