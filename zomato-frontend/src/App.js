import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Filter from './Components/Filter';
// import About from './Components/About'
import Details from './Components/Details';
import RestaurantDetails from './Components/Details';
export default class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Filter' element={<Filter />} />
          <Route path='/Details/:id' element={<Details />} />
          <Route path='/details' element={<Details />} />
          <Route path='/' element={<Details />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
