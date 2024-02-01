"use client";
import React from 'react'
import Image from 'next/image';
import styles from './CardProduct.module.css';

import { CartContext } from '@/context/cartProvider';

import ProductInterface from '@/utils/productInterface';

import { API_BASE_URL } from '@/utils/constants';
import { IMAGES_ENDPOINT } from '@/utils/constants';


export default function CardProductComponent(product: ProductInterface) {

  const { addToCart } = React.useContext(CartContext);

  return (
    <li className={styles.card}>
      <div className={styles.ImageContainer}>
        <Image
          src={API_BASE_URL + IMAGES_ENDPOINT + product.model + '.jpg'}
          className={styles.image}
          alt={product.model}
          fill={true}
        />
      </div>
      <h3>{product.model}</h3>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price}</p>
      <button 
        className='btn-primary'
        onClick={() => addToCart({...product, quantity: 1})}
      >
          Add to cart
      </button>
    </li>
  )
}
