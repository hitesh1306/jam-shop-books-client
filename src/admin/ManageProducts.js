import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      {' '}
      <h2 className="titles manage-product-title">
        Total {products.length} products
      </h2>
      <div className="manage-products-main">
        {products.map((p, i) => (
          <div className="manage-products-main-flex">
            <div className="update-product-name" key={i}>
              {p.name}
            </div>
            <div className="update-product-update">
              <Link
                style={{ textDecoration: 'none' }}
                to={`/admin/product/update/${p._id}`}
              >
                Update
              </Link>
            </div>
            <div
              className="delete-product"
              style={{ cursor: 'pointer' }}
              onClick={() => destroy(p._id)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ManageProducts;
