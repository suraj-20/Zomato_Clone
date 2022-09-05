import React, { Component } from 'react';
import '../Styles/Home.css';
import Wallpaper from './Wallpaper';
import QuickSearches from './QuickSearches';
import { API_URL } from './constants';
import axios from 'axios';


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      Locations: [],
      MealTypes: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/getAllLocations`)
      .then((res) => {
        this.setState({
          Locations: res.data.Locations,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${API_URL}/getAllMealTypes`)
      .then((res) => {
        this.setState({
          MealTypes: res.data.MealTypes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const { Locations, MealTypes } = this.state;

    return (
      <>
      
        <Wallpaper Locations={Locations} />
        <QuickSearches MealTypes={MealTypes} />
      
      </>
    );
  }
}
