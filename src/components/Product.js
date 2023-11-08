import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/eproducts/${id}`)
      .then((response) => response.json())
      .then((productData) => setProduct(productData))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [id]);

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
    HomeAppliance:['Brand','Machine Operation','Tub Type','Warranty','Type'],
    Printers:['Brand','Duplex','Paper','Print Technology','Warranty','Printer Ports']
  };

  const category = product.category;
  const specificationsToShow = categorySpecificationsMap[category] || [];

  return (
    <div className=''>
      <h4>{product.name}</h4>
      <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
      <p>Category: {product.category}</p>
      <p>Price: ksh{product.price}</p>
      <h4>Specifications:</h4>
      <ul>
        {specificationsToShow.map((specification) => (
          <li key={specification}>
            <strong>{specification}:</strong> {product.specifications[specification]}
          </li>
        ))}
      </ul>
    </div>
  );
}
