import { API_BASE_URL } from '@/utils/constants';
import { PRODUCTS_ENDPOINT } from '@/utils/constants';

interface Product {
    id: number;
    model: string;
    code: string;
    size: string;
}

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(API_BASE_URL + PRODUCTS_ENDPOINT);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
