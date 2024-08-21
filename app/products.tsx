"use client";

import { useEffect, useState } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  thumbnail: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const defaultImageUrl = 'https://api.example.com/default-image.png';
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');

        const productsArray = response.data.products;
        console.log(response.data.products); // Check what is returned
        if (Array.isArray(productsArray)) {
          setProducts(productsArray);
        } else {
          console.error('Data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
}, []);

  return (
    <div className="container mx-auto p-4 ">
    <h1 className="text-2xl font-bold mb-4">Product List</h1>
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <Card
              hoverable
              cover={
                <img 
                alt={product.name} 
                src={product.thumbnail}
                // src={product.image?.startsWith('http') ? product.image : `${defaultImageUrl}`} 
                className="rounded-t-lg object-cover h-48 w-full"
              />
           }
            >
              <Card.Meta title={product.name} description={`$${product.price}`} />
              <p className="mt-2 text-gray-600">{product.description}</p>
            </Card>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default ProductList;
