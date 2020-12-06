import React, { useEffect } from 'react';
import fakeData from '../../fakeData'
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import loader from '../../images/loader.gif';

const Shop = () => {
    //console.log(fakeData)
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10)
    //
    //console.log(first10, first10.length)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)
        if (products.length > 0) {
            const previousCart = productKeys.map( existingKey => {
                const product = fakeData.find ( pd => pd.key === existingKey)
                //console.log(existingKey, saveCart[existingKey])
                product.quantity = saveCart[existingKey]
                return product;
            })
            //console.log(previousCart)
            setCart(previousCart)
        }                 
    }, [products])

   

    const handleAddProduct = (product) =>{
        //console.log('add clicked', product)
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity +1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1
            newCart = [...cart, product];
        }
        setCart(newCart)       
        addToDatabaseCart(product.key, count)
        
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                { products.length > 0 ?
                    products.map(pd => <Product 
                    key ={pd.key}
                    showaddToCart ={true}
                    handleAddProduct = {handleAddProduct}
                    product= {pd}>

                    </Product> )
                    : <img src={loader} alt="" className="img-fluid w-50" />
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-button">Review your order!</button>
                    </Link>
                </Cart>
                
            </div>
            
        </div>
    );
};

export default Shop;