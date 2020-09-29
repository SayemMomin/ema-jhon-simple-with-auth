import React from 'react';
import './Cart.css'

//import Product from './../Product/Product';

const Cart = (props) => {
    const cart = props.cart;
    console.log(props)
    //const total = cart.reduce( (total, prd) => total + prd.price , 0)
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        
        total = total + product.price * product.quantity;
        //console.log(total)
    }
    
    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 0) {
        shipping = 4
    }
    //let tax = Math.round(total/10);
    let tax = (total/10).toFixed(2);
    let GrandTotal = (total + shipping + Number(tax)).toFixed(2)

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }

    return (
        <div>
           
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price: {formatNumber(total)} </p>
            {/* <p>Product Price: {total} </p> */}
            <p>Shipping Cost: {shipping}</p>
            <p>Tax: {tax}</p>
            <h4>Total Price: {GrandTotal}</h4>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;