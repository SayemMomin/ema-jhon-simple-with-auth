import React from 'react';

const ReviewItem = (props) => {
    //console.log(props.product)
    const{name, quantity, price, key} = props.product
    const reviewItemStyle={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    };
    return (
        <div Style={reviewItemStyle}>
            <p className="product-name">Product Name: {name}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;