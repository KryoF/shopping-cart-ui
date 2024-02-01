"use client";
import React, {useContext} from 'react'
import Image from 'next/image';
import styles from './Checkout.module.css';
import NavBar from '@/components/NavBar/NavBar';
import { CartContext } from '@/context/cartProvider';

import { API_BASE_URL } from '@/utils/constants';
import { IMAGES_ENDPOINT } from '@/utils/constants';

import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";


export default function Checkout() {
    const { cartItems, updateQuantity} = useContext(CartContext);

    return (
    <>
      <NavBar />
      
      <div className={styles.CheckoutDiv}>
        {cartItems.length > 0 ? (
          <>
            <h2 className={styles.title}>Checkout</h2>
            
            <table className={styles.itemsTableDesk}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.tdProduct}>
                      <div className={styles.imageContainer}>
                        <Image 
                          className={styles.productImage}
                          src={API_BASE_URL + IMAGES_ENDPOINT + item.model + ".jpg"}
                          fill={true}
                          alt={item.model} 
                        />
                      </div>
                      {item.model}
                    </td>
                    <td>{item.size}</td>
                    <td>
                      <div className={styles.updateQuantityDIV}>
                        <FaMinusCircle 
                          onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                        />
                          {item.quantity || 0}
                        <FaPlusCircle 
                          onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                        />
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>${((item.quantity || 0) * (item.price ?? 0)).toFixed(2)}</td>

                  </tr>
                ))}
              </tbody>          
            </table>

            <div className={styles.itemsTableMobile}>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className={styles.tdProduct}>
                    <div className={styles.imageContainer}>
                      <Image 
                        className={styles.productImage}
                        src={API_BASE_URL + IMAGES_ENDPOINT + item.model + ".jpg"}
                        fill={true}
                        alt={item.model} 
                      />
                    </div>
                    {item.model}
                  </div>
                  <div className={styles.quantityAndSize}>
                    <div>Size: {item.size}</div>
                    <div className={styles.updateQuantityDIV}>
                      <FaMinusCircle 
                        onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                      />
                        {item.quantity || 0}
                      <FaPlusCircle 
                        onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                      />
                    </div>
                  </div>
                  <div>Unit Price: ${item.price}</div>
                  <div>Total Price: ${((item.quantity || 0) * (item.price ?? 0)).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className={styles.paymentDiv}>
              <h4>Total: ${cartItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.price ?? 0), 0).toFixed(2)}</h4>
              <button 
                className="btn-primary"
                onClick={() => alert('This is a demo site, no payment will be processed')}
              >
                Go to pay
              </button>
            </div>
          </>
        ) : (
          <h2 className={styles.empty}>Tu carrito está vacío</h2>
        )}
      </div>
    </>
      );
}
