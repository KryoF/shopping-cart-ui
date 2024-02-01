"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { CartContext } from '@/context/cartProvider';

import { FaShoppingCart } from "react-icons/fa";

export default function NavBarComponent() {

    const {cartItems } = useContext(CartContext);
    return (
    <nav className={styles.navbar}>
        <Link href={'/'}><h1>OnlineShop</h1></Link>
        <Link href={'/checkout'} className={styles.cartIconContainer}>
            <FaShoppingCart className={styles.cartIcon}/>   
            <span id={'cartCounter'} className={styles.cartCounter}>
                {cartItems.length > 0 ? cartItems.length : 0}
            </span>
        </Link>
    </nav>
    )
}
