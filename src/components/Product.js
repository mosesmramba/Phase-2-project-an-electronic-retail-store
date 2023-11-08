import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // State to keep track of the total price
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:7000/eproducts/${id}`)
      .then((response) => response.json())
      .then((productData) => setProduct(productData))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [id]);

  useEffect(() => {
    // Update the total price when quantity or product price changes
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const categorySpecificationsMap = {
    Laptop: ['Processor', 'Memory', 'Storage', 'Operating System', 'Warranty'],
    Phones: ['Network', 'Internal Storage', 'RAM', 'Battery', 'Warranty'],
    Tablet: ['Network', 'Internal Storage', 'RAM', 'Battery', 'Warranty'],
    Camera: ['Brand', 'Camera Resolution', 'Condition', 'Video resolution', 'Warranty'],
    Audio: ['Brand', 'Condition', 'Connection Type', 'Type', 'Warranty'],
    Gaming: ['Brand', 'Condition', 'Storage', 'Warranty'],
    TV: ['Brand', 'Screen Resolution', 'Screen type', 'Type', 'Warranty'],
    HomeAppliance: ['Brand', 'Machine Operation', 'Tub Type', 'Warranty', 'Type'],
    Printers: ['Brand', 'Duplex', 'Paper', 'Print Technology', 'Warranty', 'Printer Ports'],
  };

  const category = product.category;
  const specificationsToShow = categorySpecificationsMap[category] || [];

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:7000/eproducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProduct(updatedProduct);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error editing product: ", error));
  };

  const handleDeleteProduct = () => {
    fetch(`http://localhost:7000/eproducts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Handle successful deletion, e.g., navigate back to the product list page
      })
      .catch((error) => console.error("Error deleting product: ", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  return (
    <div className='container row mt-5 mb-5'>
      <div className='col-md-6'>
        <h4>{product.name}</h4>
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
      </div>
      <div className='col-md-6 card'>
        <h5>Category: {product.category}</h5>
        <p>Price: ksh{product.price}</p>
        <p>Total Price: ksh{totalPrice}</p> {/* Display the total price */}
        <h4>Specifications:</h4>
        <ul>
          {console.log('specifications',specificationsToShow)}
          {specificationsToShow.map((specification) => (
            <li key={specification}>
              <strong>{specification}:</strong> {product.specifications[specification]}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setQuantity(quantity - 1)} className='btn btn-light me-1' type='button'>-</button>
          <input className='btn btn-light me-1' type='number' value={quantity} readOnly />
          <button onClick={() => setQuantity(quantity + 1)} className='btn btn-light me-1' type='button'>+</button>
        </div>
        {isEditing ? (
          <div className="container mt-5 mb-5">
            <div>
              <input
                type='text'
                name='name'
                value={editedProduct.name}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div>
              <input
                type='text'
                name='category'
                value={editedProduct.category}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div>
              <input
                type='number'
                name='price'
                value={editedProduct.price}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div>
              <input
                type='text'
                name='image'
                value={editedProduct.image}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div>
              <input
                type='text'
                name='specifications'
                value={editedProduct.specifications}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div>
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        ) : (
          <div className=''>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteProduct}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
