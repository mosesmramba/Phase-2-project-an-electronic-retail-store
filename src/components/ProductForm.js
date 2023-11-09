import React, { useState, useEffect } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    specifications: {
      'Camera Resolution': '',
      Condition: '',
      'Video Resolution': '',
      Type: '',
      'Connection Type': '',
      Storage: '',
      Brand: '',  // Set a default value here
      Duplex: '',
      Paper: '',
      'Print Technology': '',
      Warranty: '',
      'Printer Ports': '',
    },
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
    setIsAdding(true);
  };

  const handleSpecification = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      specifications: {
        ...prevProduct.specifications,
        [name]: value,
      },
    }));
  };

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
            <select className="form-select" aria-label="Default select example" name="category" onChange={handleInputChange}>
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
            <label>Specifications:</label>
            <input
              type="text"
              name="Camera Resolution"
              value={product.specifications['Camera Resolution']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Camera Resolution"
            />
            <input
              type="text"
              name="Condition"
              value={product.specifications['Condition']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Condition"
            />
            <input
              type="text"
              name="Video Resolution"
              value={product.specifications['Video Resolution']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Video Resolution"
            />
            <input
              type="text"
              name="Type"
              value={product.specifications['Type']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Type"
            />
            <input
              type="text"
              name="Connection Type"
              value={product.specifications['Connection Type']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Connection Type"
            />
            <input
              type="text"
              name="Storage"
              value={product.specifications['Storage']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Storage"
            />
            <input
              type="text"
              name="Brand"
              value={product.specifications['Brand']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Brand"
            />
            <input
              type="text"
              name="Duplex"
              value={product.specifications['Duplex']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Duplex"
            />
            <input
              type="text"
              name="Paper"
              value={product.specifications['Paper']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Paper"
            />
            <input
              type="text"
              name="Print Technology"
              value={product.specifications['Print Technology']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Print Technology"
            />
            <input
              type="text"
              name="Warranty"
              value={product.specifications['Warranty']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Warranty"
            />
            <input
              type="text"
              name="Printer Ports"
              value={product.specifications['Printer Ports']}
              onChange={handleSpecification}
              className="form-control"
              placeholder="Printer Ports"
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
