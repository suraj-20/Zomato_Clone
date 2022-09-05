import React, { Component } from 'react';
import { API_URL } from './constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      Text: '',
      Suggestions: [],
    };
  }

  GetAllRestaurantsByLocation = (event) => {
    const Location_Id = event.target.value;
    const selectedOption = this.props.Locations.find((item) => {
      return item.location_id == Location_Id;
    });

    const city_id = selectedOption.city_id;
    const city_name = selectedOption.city;

    localStorage.setItem('city_id', city_id);

    axios.get(`${API_URL}/getRestaurantByCity/${city_name}`).then((res) => {
      this.setState({
        restaurants: res.data.RestaurantData,
      });
    });
  };

  OnSearchTextChange = (event) => {
    const SearchText = event.target.value;

    let Suggestions = [];
    if (SearchText.length > 0) {
      Suggestions = this.state.restaurants.filter((item) =>
        item.name.toLowerCase().includes(SearchText.toLowerCase())
      );
    }

    this.setState({
      Text: SearchText,
      Suggestions: Suggestions,
    });
  };

  renderSuggestions = () => {
    const { Suggestions } = this.state;

    if (Suggestions.length == 0) {
      return null;
    } else {
      return (
        <ul className='suggestionsBox'>
          {Suggestions.map((item, index) => {
            return (
              <Link to={`/Details?id=${item._id}`}>
                <li key={index} className='suggestionItem'>
                  <div className='suggestionImage'>
                    <img
                      src={require(`../${item.image}`)}
                      alt='not found'
                    />
                  </div>
                  <div className='suggestionText'>
                    <div className='suggestionTextName'>{item.name}</div>
                    <div className='suggestionTextLocality'>
                      {item.locality}
                    </div>
                  </div>
                  <div className='orderButton text-danger'>Order Now &gt;</div>
                </li>
              </Link>
            );
          })}
        </ul>
      );
    }
  };

  render() {
    const { Locations } = this.props;

    return (
      <>
        <div class='topSection'>
          <div class='logo-section'>
            <div class='logo'>e!</div>
          </div>
          <div class='Find-Best-Restaurants'>
            Find the Best Restauratns,Cafes, and bars
          </div>
          <div class='Search '>
            <select
              class='Search_location'
              onChange={this.GetAllRestaurantsByLocation}
            >
              <option disabled selected>
                Please type a location
              </option>
              {Locations.map((item, index) => {
                return (
                  <option key={index} value={item.location_id}>
                    {item.name},{item.city}
                  </option>
                );
              })}
            </select>
            <div class='searchSection'>
              <input
                type='search'
                placeholder='Search For Restaurants'
                class='Search_restaurants'
                onChange={this.OnSearchTextChange}
              />
              <i class='fas fa-search'></i>
              {this.renderSuggestions()}
            </div>
          </div>
        </div>
      </>
    );
  }
}
