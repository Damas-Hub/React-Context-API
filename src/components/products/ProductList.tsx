import React from 'react';
import styles from './ProductList.module.css';
import { useCart } from '../CartContext';

const ProductList: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Rice', price: 29.99, quantity: 1 },
    { id: 2, name: 'Jollof', price: 19.99, quantity: 1 },
    { id: 3, name: 'Spaghetti', price: 49.99, quantity: 1 },
    { id: 4, name: 'Tilapia', price: 9.99, quantity: 1 },
    { id: 5, name: 'Chicken', price: 39.99, quantity: 1 },
  ];

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productDetails}>
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
