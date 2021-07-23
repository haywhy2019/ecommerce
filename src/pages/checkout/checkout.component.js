import React from "react";
import "./checkout.styles.scss"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import { selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors"
import CheckoutItem from "../../components/checkout-item/checkout-item"

function CheckoutPage({cartItems, total}) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Desrciption</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {
          cartItems.map(cartItem => (
            <CheckoutItem  cartItem={cartItem} key={cartItem.id}/>
          ))
      }
      <div className="total">
          <span>TOTAL: ${total}</span>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);
