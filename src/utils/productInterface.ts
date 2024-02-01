interface ProductInterface {
    id:     number;  
    model:  string;
    code:   string;
    size:   string;
    price?:  number;
    stock?: number;
    quantity?:  number;
}

export default ProductInterface;
