import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <div className="your-cart-has">
          Your cart has {`${items.length}`} items
        </div>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <div>
      <h2 className="titles">
        Your cart is empty. <br /> <br />
      </h2>
      <Link
        style={{ textDecoration: 'none' }}
        className="continue-shopping"
        to="/shop"
      >
        Continue shopping
      </Link>
    </div>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      {/* <div className="row">
        <div className="col-3.9">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-7">
          <h2>Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div> */}

      <div className="cart-main">
        {/*LEFT */}
        <div className="cart-left">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        {/*RIGHT */}
        <div className="cart-right">
          <h2 className="titles">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
