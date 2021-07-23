import React from 'react'
import {connect} from "react-redux"
import {ReactComponent as ShoppingIcon} from "../../asset/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { toggleCartHidden} from "../../redux/cart/cart.action"
import {selectCartItemsCount} from "../../redux/cart/cart.selectors"
import {createStructuredSelector} from "reselect"
function CartIcon({toggleCartHidden, itemCount}) {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
          <ShoppingIcon className="shopping-icon"/>  
          <span className="item-count">{itemCount}</span>
        </div>
    )
}


const mapStateToProps =  createStructuredSelector({
  itemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);