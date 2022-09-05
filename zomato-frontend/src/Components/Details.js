import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from './constants';
import '../Styles/Details.css';
import Modal from 'react-modal'

export default class Details extends Component {

  constructor() {
    super();
    this.state = {
      restaurant: null,
      itemModal: false,
      resturantId: undefined,
      menuItems: [],
      subtotal: 0,
      orderEntryModal: undefined,
      name: null,
      email: null,
      mobileNumber: undefined,
      address: undefined,
    };
  }

  componentDidMount = () => {
    const qs = queryString.parse(window.location.search);
    console.log(qs);

    const { id } = qs;
    axios
      .get(`${API_URL}/getRestaurantById/${id}`)
      .then((res) => {
        console.log(res.data.RestaurantData);
        this.setState({
          restaurant: res.data.RestaurantData[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleModal = (state, value) => {

    const { resturantId } = this.state;
    console.log('res', resturantId);
    this.setState({ [state]: value });
    if (state == 'itemModal' && value == true)
      axios
        .get(`http://localhost:4500/getMenu/${resturantId}`)
        .then((res) => {
          console.log('items', res.data.itemsList)
          this.setState({ menuItems: res.data.itemsList })
        }).catch(err => console.log(err))
  };

  addItems = (index, opType) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (opType == 'add') {
      item.qty = item.qty++;
    }
    else {
      item.qty = item.qty--;
    }
    items[index] = item;
    items.map((item) => {
      total += item.qty * item.price;
    })
    this.setState({ menuItems: items, subtotal: total });
  }

  handleChange = (event, state) => {
    this.setState({ [state]: event.target.value });
  };

  addItems = (index, operationType) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (operationType == "add") {
      item.qty = item.qty + 1;
    } else {
      item.qty = item.qty - 1;
    }
    items[index] = item;
    items.map((item) => {
      total += item.qty * item.price;
    });
    this.setState({ menuItems: items, subtotal: total });
  };

  isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }

  isObj = (val) => {
    return typeof val === 'object'
  }

  stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }

  buildForm = ({ action, params }) => {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', this.stringifyValue(params[key]))
      form.appendChild(input)
    })

    return form
  }

  post = (details) => {
    const form = this.buildForm(details);
    document.body.appendChild(form);
    form.submit()
    form.remove()
  }

  getData = (data) => {
    return fetch(`http://localhost:4500/api/payment`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => console.log(err))
  }

  payment = () => {
    const { subtotal } = this.state;

    this.getData({ amount: subtotal }).then(response => {

      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response
      }
      this.post(information)

    })

  };


  render() {

    const {
      restaurant,
      itemModal,
      menuItems,
      subtotal,
      orderEntryModal
    } = this.state;

    return (
      <div className='container details'>
        {restaurant ? (
          <>
            <div className='images'>
              <Carousel showThumbs={false}>
                {
                  this.state.restaurant.thumb.map((item, index) => {
                    return (
                      <div>
                        <img
                          key={index}
                          src={require(`../${item}`)}
                          alt='not found'
                        />
                      </div>
                    );
                  })
                }
              </Carousel>
            </div>
            <div className='restName my-3'>
              {restaurant.name}
              <button className='btn fontSizeFixer btn-danger float-end mt-4' onClick={() => this.handleModal('itemModal', true)}>
                Place Online Order
              </button>
            </div>
            <div className='myTabs mb-5'>
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Contact</Tab>
                </TabList>
                <TabPanel>
                  <div className='about my-5'>About this place</div>
                  <div className='cuisine'>Cuisine</div>
                  <div className='cuisines'>
                    {restaurant.cuisine.map((item, index) => {
                      return <span key={index}>{item.name},</span>;
                    })}
                  </div>
                  <div className='cuisine mt-3'>Average Cost</div>
                  <div className='cuisines'>
                    {restaurant.min_price} for two people (approx.)
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='cuisine my-5'>
                    Phone Number
                    <div className='text-danger'>
                      {restaurant.contact_number}
                    </div>
                  </div>
                  <div className='cuisine mt-5 '>{restaurant.name}</div>
                  <div className=' fontSizeFixer text-muted mt-2 '>
                    {restaurant.locality}
                    <br />
                    {restaurant.city}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </>
        ) : (
          <div>Loading......{restaurant}</div>
        )}

        <Modal
          isOpen={itemModal}
          className='menuPage'
        >
          <div className='itemContainer' >
            <div><span class="glyphicon " onClick={() => this.handleModal('itemModal', false)}>X</span>
            </div>
            <div className='MenuContiner'>

              {menuItems && menuItems.length > 0 ?
                menuItems.map((item, index) => {
                  return (
                    <div id="box">
                      <div className="menuContainer">
                        <div className="menuInfo">
                          <h3 className="menuItemName">{item.name}</h3>
                          <h4 className="Rupees">Cost : &#8377; {item.price}</h4>
                          <div className="Deep">{item.description}</div>
                        </div>
                        {/* <img src ={item.image} class="image" /> */}
                        <div>
                          <img className='img' src={item.image} alt='notFound'></img>
                          {item.qty == 0 ?
                            <div><button class="addBtn" onClick={() => this.addItems(index, 'add')}>ADD</button></div> :
                            <div className="subbutton">
                              <button className='minusBtn' onClick={() => this.addItems(index, 'subtract')}>-</button>
                              <span className='numBtn' >{item.qty}</span>
                              <button class="plusBtn" onClick={() => this.addItems(index, 'add')}>+</button>
                            </div>}
                        </div>
                      </div>
                    </div>
                  )
                })
                : <div>Not Available</div>}
            </div>

            <div><h3 class="subtotal">SubTotal : {subtotal} </h3>
              <button className="btn btn-danger sumbit" onClick={() => { this.handleModal("orderEntryModal", true); this.handleModal("itemModal", false); }}> PAY NOW </button></div>
          </div>
        </Modal>

        <Modal isOpen={orderEntryModal} className='paymentPage' >
          <div>
            <div
              className="glyphicon"
              onClick={() => this.handleModal("orderEntryModal", false)}
            >X</div>
            <div class="restuarantName">{ }</div>
            <div class="AmountPaid">
              <span>Amount : &#8377; </span>
              <span>{subtotal}</span>
            </div>
            <div class="customerName">NAME :

              <input className='inputName' type='text' placeholder='Enter Name' />
            </div>
            <div className="customerName">E-MAIL :

              <input className='inputName' type='text' placeholder='Enter E-Mail' />
            </div>
            <div className="customerName">MOBILE NUMBER :
              <input
                className="inputName"
                type="phone"
                placeholder="Enter mobile number"
                onChange={(event) => this.handleChange(event, "mobileNumber")}
              />
            </div>
            <div className="customerAdd">ADDRESS :
              <textarea
                className="inputAdd"
                type="text"
                placeholder="Enter your address"
                onChange={(event) => this.handleChange(event, "address")}
              />
            </div>
            <button
              id="pay"
              className="btn btn-danger"
              onClick={this.payment}
            >
              PROCEED
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
