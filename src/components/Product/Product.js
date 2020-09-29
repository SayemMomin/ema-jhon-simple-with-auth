import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props)
    const{img, name, seller, price, key} = props.product;
    return (

        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                <p><small>by: {seller}</small></p>
                <p><small>${price}</small></p>
            {props.showaddToCart === true && <button className="name-button" 
                onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> 
                add to cart</button>}

            </div>
        </div>
                
    );
};

export default Product;