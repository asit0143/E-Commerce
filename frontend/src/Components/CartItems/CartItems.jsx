import React, { useContext } from 'react';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';
import add_cart_icon from '../Assets/Frontend_Assets/add_cart_icon.png';
const CartItems = () => {
    const {getTotalCartAmount,all_product,CartItems,removeFromCart, addToCart} = useContext(ShopContext);
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
                <p>Add</p>
            </div>
            <hr/>
            {all_product.map((e)=>{
                if(CartItems[e.id]>0)
                {
                    return<div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>₹{e.new_price}</p>
                        <button className='cartitems-quentity'>{CartItems[e.id]}</button>
                        <p>₹{e.new_price*CartItems[e.id]}</p>
                        <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                        <img src={add_cart_icon} onClick={()=>{addToCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
            }  
            return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Sub Total:</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee:</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total:</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                        <hr/>
                    </div>
                    <button>Proceed to CheckOut</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
