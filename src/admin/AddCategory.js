import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="category-title titles"> Category Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <div className="create-cateory">
        <button className="create-category">Create Category</button>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="back-dashboard">
      <Link
        to="/admin/dashboard"
        style={{ textDecoration: 'none' }}
        className="back-to-dashboard"
      >
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a new category?`}
    >
      <div className="create-category-main">
        {' '}
        {showSuccess()}
        {showError()}
        {newCategoryFom()}
        {goBack()}
      </div>
    </Layout>
  );
};

export default AddCategory;
