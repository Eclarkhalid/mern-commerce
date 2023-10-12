import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import AddItem from '../components/addItem';
import Home from '../home';
import Cart from './cart';
import Orders from '../components/order';

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/addItem' element={<AddItem />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </div>
  );
};

export default connect()(Main);
