const express=require('express');
const router=express.Router();

const RestaurantController=require('../Controllers/Restaurant');
const LocationController=require("../Controllers/Location");
const MealTypeController=require('../Controllers/MealType');
const UserController=require('../Controllers/User');
const MenuController = require('../Controllers/Menu');

// Add Restaurants and Get Restaurants
router.post('/addRestaurants', RestaurantController.addRestaurants)
router.get('/getAllRestaurants',RestaurantController.getAllRestaurants);
router.get('/getRestaurantByName/:name',RestaurantController.getRestaurantByName)
router.get('/getRestaurantByCity/:city',RestaurantController.getRestaurantByCity);
router.get('/getRestaurantById/:id',RestaurantController.getRestaurantById);

// Filter Restaurants
router.post('/FilterRestaurants',RestaurantController.FilterRestaurants);

// Add Locations and Get Locations
router.post('/addLocations',LocationController.addLocations);
router.get('/getAllLocations',LocationController.getAllLocations);

// Add Mealtypes and Get Mealtypes
router.post('/addMealTypes',MealTypeController.addMealTypes)
router.get('/getAllMealTypes',MealTypeController.getAllMealTypes);

// Add User Details
router.post('/UserSignUp',UserController.UserSignUp);
router.post('/UserLogin',UserController.UserLogIn);

// Add Menu Models
router.post('/addMenuModel', MenuController.addMenuModel);
router.get("/getMenu", MenuController.getAllMenu);
router.get('/getMenu/:id', MenuController.getMenuModel);


module.exports=router;