import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <div className="jumbotron-title">{title}</div>
      <div className="jumbotron-description"> {description}</div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
