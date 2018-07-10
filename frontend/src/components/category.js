import React, { Component } from 'react';
import Main from './categories/index'
import SubCategory from './categories/subCategory'

class Category extends React.Component {
  render() {
    return (
      <div>
        {/*
        <Main />
        */}
        <SubCategory />
      </div>
    );
  }
}

export default Category;