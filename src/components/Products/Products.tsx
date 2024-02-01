import React from 'react'
import styles from './Products.module.css';
import CardProduct from '../CardProduct/CardProduct';
import { API_BASE_URL } from '@/utils/constants';
import { PRODUCTS_ENDPOINT } from '@/utils/constants';
import { STOCK_ENDPOINT } from '@/utils/constants';
import { PRICES_ENDPOINT } from '@/utils/constants';

import ProductInterface from '@/utils/productInterface';

async function getProducts() {
    const products = await fetch(API_BASE_URL + PRODUCTS_ENDPOINT);
    const stock = await fetch(API_BASE_URL + STOCK_ENDPOINT);
    const prices = await fetch(API_BASE_URL + PRICES_ENDPOINT);

    if (!products.ok || !stock.ok || !prices.ok) {
        throw new Error('Failed to fetch data');
    }

    const productsData = await products.json();

    const stockData = await stock.json();

    const pricesData = await prices.json();

    const data = productsData.map((product: ProductInterface) => {
        const stockItem = stockData.find((item: any) => item.id === product.id);
        const priceItem = pricesData.find((item: any) => item.id === product.id);

        return {
            ...product,
            stock: stockItem?.stock,
            price: priceItem?.price,
        };
    });

    const modifiedData = data.map((item: { model: string, [key: string]: any }) => {
        return { ...item, model: item.model.replace(/\s/g, '-') };
    });

    return modifiedData;
}



export default async function Products() {
    const data = await getProducts()

    return  (
    <>
        <h2 className={styles.title}>New Arrivals</h2>
        <ul className={styles.grid}>
            {data.map((product: ProductInterface) => (
                <CardProduct
                    key={product.id}
                    {...product}
                />
            ))}
        </ul>
    </>
    )
}
