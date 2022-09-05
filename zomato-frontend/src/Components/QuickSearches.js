import React, { Component } from 'react';
import QuickSearch from '../Components/QuickSearch';

export default class QuickSearches extends Component {

  render() {

    const { MealTypes } = this.props;

    return (
      <div>
        <div class='BottomSection'>
          <div class='container'>
            <div class='QuickSearches'>Quick Searches</div>
            <div class='disover_restaurants'>
              Discover restaurants by type of meal
            </div>
            <div class='row '>
              {MealTypes.map((item, index) => {
                return (
                  <QuickSearch
                    key={index}
                    mealTypeId={item.meal_type}
                    mealType={item.name}
                    content={item.content}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
