import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class QuickSearch extends Component {

  render() {

    return (
      <>
        <div class=' col-md-6 col-sm-6 col-lg-4 '>
          <Link
            to={`/filter?mealType=${this.props.mealType}&mealTypeId=${this.props.mealTypeId}`}
            style={{ textDecoration: 'none' }}
          >
            <div class='QuickBoxes'>
              <div class='Quickimg_box'>
                <img
                  src={
                    require(`../Assets/Homepage/${this.props.mealType}1.jpg`)

                  }
                  class='Quickimg'
                />
              </div>
              <div class='QuickTex'>
                <div class='Quickhead'>{this.props.mealType}</div>
                <div class='QuickPara'>{this.props.content}</div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
