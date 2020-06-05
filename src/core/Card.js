import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
          <div className="card-view-book">View Book</div>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <div className="card-buy" onClick={addToCart}>
          Buy
        </div>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <div
          className="card-view-book"
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          Remove
        </div>
      )
    );
  };
  return (
    <div className="card card-sizing">
      <div className="one">
        {shouldRedirect(redirect)}
        <div className="card-image">
          <ShowImage className="image" item={product} url="product" />
        </div>
        <div className="card-text">
          <p className="product-description">
            {product.description.substring(0, 100)}...
          </p>
        </div>
        <div className="card-stats">
          <div className="stat">
            <div className="value">$ {product.price}</div>
          </div>
          <div className="stat">
            <div className="value">In stock</div>
            <div className="type">{product.quantity}</div>
          </div>
          <div className="stat">
            <div className="value">Category</div>
            <div className="type category-header">
              {product.category && product.category.name}
            </div>
          </div>
        </div>
        <div className="card-button">
          {showViewButton(showViewProductButton)}
          {showAddToCartBtn(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
      </div>
    </div>

    // <div className="card ">
    //   <div className="card-header card-header-1 ">{product.name}</div>
    //   <div className="card-body">
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url="product" />
    //     <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
    //     <p className="card-p black-10">$ {product.price}</p>
    //     <p className="black-9">Category: {product.category && product.category.name}</p>
    //     <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
    //     {showStock(product.quantity)}
    //     <br />

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>
  );
};

export default Card;
