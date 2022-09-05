import React, { Component } from 'react';
import '../Styles/Filter.css';
import queryString from 'query-string';
import { API_URL } from './constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Filter extends Component {

  constructor() {
    super();
    this.state = {
      mealType: '',
      mealTypeId: 0,
      locations: [],
      selectedCityName: '',
      locationsInCity: [],
      selectedLocatin: '',
      pageNo: 1,
      restaurantList: [],
      noOfPages: 0,
      cuisines: [],
      hCost: undefined,
      lCost: undefined,
      sortOrder: 1,
    };
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { mealType, mealTypeId } = qs;
    this.setState({
      mealType,
      mealTypeId,
    });

    const city_id = localStorage.getItem('city_id');

    axios
      .get(`${API_URL}/getAllLocations`)
      .then((res) => {
        const locations = res.data.Locations;
        const SelectedCity = locations.find((city) => city.city_id == city_id);
        const selectedCityLocations = locations.filter(
          (city) => city.city_id == city_id
        );

        this.setState({
          locations: res.data.Locations,
          selectedCityName: SelectedCity.city,
          locationsInCity: selectedCityLocations,
        });

        setTimeout(() => {
          this.filteRestaurants();
        }, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLocationChange = (e) => {
    const locatin_id = e.target.value;
    this.setState({
      selectedLocatin: locatin_id,
    });

    setTimeout(() => this.filteRestaurants(), 0);
  };

  handleCuisineChange = (e, cuisine) => {
    let { cuisines } = this.state;
    const index = cuisines.indexOf(cuisine);
    console.log('cuisines', cuisines);
    console.log('cuisine', cuisine);

    console.log(index);
    if (index < 0 && e.target.checked) {
      cuisines.push(cuisine);
      console.log('length of cuisines', cuisines.length);
    } else {
      cuisines.splice(index, 1);
    }
    this.setState({
      cuisines: cuisines,
    });
    setTimeout(() => {
      this.filteRestaurants();
    }, 0);
  };

  handleCostChange = (e, lCost, hCost) => {
    this.setState({
      hCost: hCost,
      lCost: lCost,
    });
    setTimeout(() => this.filteRestaurants(), 0);
  };

  handleSortChange = (e, sortOrder) => {
    this.setState({
      sortOrder: sortOrder,
    });
    setTimeout(() => this.filteRestaurants(), 0);
  };

  handlePageChange = (pageNo) => {
    console.log('increases page number', pageNo);
    if (pageNo < 1) return;
    this.setState({
      pageNo: pageNo,
    });
    setTimeout(() => this.filteRestaurants(), 0);
  };

  getPages = () => {
    const { noOfPages } = this.state;
    let pages = [];

    for (let i = 0; i < noOfPages; i++) {
      pages.push(
        <button
          className='paginate-btn'
          onClick={() => this.handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  filteRestaurants = () => {
    const {
      mealTypeId,
      selectedLocatin,
      cuisines,
      hCost,
      lCost,
      sortOrder,
      pageNo,
    } = this.state;

    console.log(
      'thi is the page number from filterRestaurants function',
      pageNo
    );

    const req = {
      mealtype: mealTypeId,
      location: selectedLocatin,
      page: pageNo,
    };
    
    console.log('this is the page number inside req.pageNo', this.state.pageNo);

    if (cuisines.length > 0) {
      req.cuisine = cuisines;
    }

    if (hCost !== undefined && lCost !== undefined) {
      req.hcost = hCost;
      req.lcost = lCost;
    }

    if (sortOrder !== undefined) {
      req.sort = sortOrder;
    }
    
    axios({
      method: 'POST',
      url: `${API_URL}/FilterRestaurants`,
      headers: { 'Content-Type': 'application/json' },
      data: req,
    })
      .then((res) => {
        console.log('Restaurant Details', res.data.Restaurants);
        this.setState({
          restaurantList: res.data.Restaurants,
          pageNo: res.data.pageNo,
          noOfPages: res.data.noOfPages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    
    const {
      mealType,
      restaurantList,
      locationsInCity,
      selectedCityName,
      pageNo,
    } = this.state;
    let currPage = pageNo;

    return (
      <>
        <div className='heading'>
          {mealType} places in {selectedCityName}
        </div>

        <div>
          {restaurantList.length > 0 ? (
            restaurantList.map((item, index) => {
              return (
                <Link to={`/Details?id=${item._id}`}>
                  <div key={index} className='fooditems'>
                    <img
                      src={
                        require('../Assets/Filterpage/breakfast.jpg')
                      }
                      className='rightimg'
                    />
                    <div className='rightboxtext'>
                      <div className='rightboxhead'>
                        {item.name}
                        <div className='rightboxsub'>{item.city} </div>
                        <div className='rightboxsub'>{item.locality}</div>
                      </div>
                    </div>
                    <hr />
                    <div id='heading1'>
                      <span className='cuisine'>CUISINES :</span>
                      <span className='bakery'>
                        {item.cuisine.map((item) => {
                          return `${item.name}, `;
                        })}
                      </span>

                      <div>
                        <span className='cuisine'>COST FOR TWO :</span>
                        <span className='bakery'>{item.min_price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div style={{ position: 'realative' }}>
              <div className='text-danger text-center my-5 No-Results'>
                No Results Found
              </div>
            </div>
          )}

          {restaurantList.length > 0 ? (
            <div className='paginate'>
              <button
                className='paginate-btn'
                onClick={() => this.handlePageChange(--currPage)}
              >
                {' '}
                &lt;
              </button>

              {this.getPages()}

              <button
                className='paginate-btn'
                onClick={() => this.handlePageChange(++currPage)}
              >
                &gt;
              </button>
            </div>
          ) : null}
        </div>
        <div className='filter'>
          <div className='head'>Filters</div>
          <div className='subhead'>Select Location</div>
          <div>
            <select
              className='box'
              onChange={(e) => this.handleLocationChange(e)}
            >
              <option value=''>--Select Location</option>
              {locationsInCity.map((location, index) => {
                return (
                  <option key={index} value={location.location_id}>
                    {location.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='cusine'>Cusine</div>

          <div>
            <div className='ftelement'>
              <input
                type='checkbox'
                name='cuisine'
                onChange={(e) => this.handleCuisineChange(e, 'North Indian')}
              />{' '}
              north inidan
            </div>
            <div className='ftelement'>
              <input
                type='checkbox'
                name='cuisine'
                onChange={(e) => this.handleCuisineChange(e, 'South Indian')}
              />{' '}
              south inidan
            </div>
            <div className='ftelement'>
              <input
                type='checkbox'
                name='cuisine'
                onChange={(e) => this.handleCuisineChange(e, 'Chinese')}
              />{' '}
              chinese
            </div>
            <div className='ftelement'>
              <input
                type='checkbox'
                name='cuisine'
                onChange={(e) => this.handleCuisineChange(e, 'Fast Food')}
              />{' '}
              fast food
            </div>
            <div className='ftelement'>
              <input
                type='checkbox'
                name='cuisine'
                onChange={(e) => this.handleCuisineChange(e, 'Streed Food')}
              />{' '}
              street food
            </div>
          </div>

          <div className='cusine'>Cost for two</div>
          <div>
            <div className='ftelement'>
              <input
                type='radio'
                name='cost'
                onChange={(e) => {
                  this.handleCostChange(e, 0, 500);
                }}
              />{' '}
              less than ₹ 500
            </div>
            <div className='ftelement'>
              <input
                type='radio'
                name='cost'
                onChange={(e) => {
                  this.handleCostChange(e, 500, 1000);
                }}
              />{' '}
              ₹ 500 to ₹ 1000
            </div>
            <div className='ftelement'>
              <input
                type='radio'
                name='cost'
                onChange={(e) => {
                  this.handleCostChange(e, 1000, 1500);
                }}
              />{' '}
              ₹ 1000 to ₹ 1500
            </div>
            <div className='ftelement'>
              <input
                type='radio'
                name='cost'
                onChange={(e) => {
                  this.handleCostChange(e, 1500, 2000);
                }}
              />{' '}
              ₹ 1500 to ₹ 2000
            </div>
            <div className='ftelement'>
              <input
                type='radio'
                name='cost'
                onChange={(e) => {
                  this.handleCostChange(e, 2000, 100000);
                }}
              />{' '}
              ₹ 2000+
            </div>
          </div>
          <div className='cusine'>Sort</div>
          <div className='ftelement'>
            <input
              type='radio'
              name='sort'
              onChange={(e) => this.handleSortChange(e, 1)}
            />{' '}
            Price low to high
          </div>
          <div className='ftelement'>
            <input
              type='radio'
              name='sort'
              onChange={(e) => this.handleSortChange(e, -1)}
            />{' '}
            Price high to low
          </div>
        </div>
      </>
    );
  }
}
