import React, { useEffect } from 'react';
import { useState } from 'react';
import './Review.css'
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import image from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])

    const [placeOrder, setPlaceOrder] = useState(false)
    const history = useHistory();

    const handlePlaceOrder = () => {
        //console.log('order place')
        //setCart([]);
        // processOrder()
        // setPlaceOrder(true)
        history.push('/shipment');
    }
    let happyImage;
    if (placeOrder) {
        happyImage = <img src={image} alt=""/>
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key]
            return product;
        })
       // console.log(cartProducts)
        setCart(cartProducts)
    }, [])
    
    return (
        <div className="review-container">
           <div className="product-container">
           {
                 happyImage
           }
           <p>Cart Items: {cart.length}</p>
           {
                cart.map(pd => <ReviewItem 
                    key = {pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem> )
            }
           </div>
    
            <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder}> Proceed CheckOut</button>
                {/* <button onClick={handlePlaceOrder}> place the order</button> */}
            </Cart>
            </div>
        </div>
       
    );
};

export default Review;