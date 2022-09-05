const Restaurants=require('../Models/Restaurant');


// Adding Restaurants

exports.addRestaurants=(req,res)=>{

    const {
        
        name,
        city,
        location_id,
        city_id,
        locality,
        thumb,
        aggregate_rating,
        rating_text,
        min_price,
        contact_number,
        cuisine,
        image,
        mealtype_id,
    } = req.body;
    
    const Rest = new Restaurants({ 
        
        name: name, 
        city: city, 
        location_id: location_id, 
        city_id: city_id,  
        locality: locality, 
        thumb: thumb, 
        aggregate_rating: aggregate_rating, 
        rating_text: rating_text, 
        min_price: min_price, 
        contact_number: contact_number, 
        cuisine: cuisine, 
        image: image, 
        mealtype_id: mealtype_id 
    });
    
    Rest.save().then(result => {

        res.status(200).json({

            message: "Restaurant Added Sucessfully", 
            restaurant: result })
    }).catch(err => {

        console.log(err)
    })
}

// Geting All Restaurants

exports.getAllRestaurants=(req,res)=>{

    Restaurants.find().then((success)=>{
        
        res.status(200).json({
            
            message:"restaurants has been fetched successfully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({
            message:"error while fetching data",
            Error:err
        })
    })

}

// Geting All Restaurants By Id Of Restaurants

exports.getRestaurantById=(req,res)=>{

    const rest_id=req.params.id;

    Restaurants.find({_id:rest_id}).then((success)=>{

        res.status(200).json({
            message:"data fetched succesfully",
            RestaurantData:success
        })
    }).catch((err)=>[
         
        res.status(500).json({
            message:"error occured whild fetching data",
            Error:err
        })
    ])
}


// Geting Restaurants By Name Of Restaurants

exports.getRestaurantByName=(req,res)=>{

    const rest_name=req.params.name;

    Restaurants.find({name:rest_name}).then((success)=>{

        res.status(200).json({
            message:"data fetched succefully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({

            message:"data fetching failed",
            Error:err
        })
    })
}

// Geting Restaurants By City Of the Restarants

exports.getRestaurantByCity=(req,res)=>{

    const rest_city=req.params.city;

    Restaurants.find({city:rest_city}).then((success)=>{

        res.status(200).json({

            message:"fetched successfully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({
            
            message:"data fetching failed",
            Error:err
        })
    })
}

/// applying filter options on Restaurant based on location-id, mealtype-id, cuisine, hcost, lcost, sort and paginationa and limit

exports.FilterRestaurants=(req,res)=>{

    const {
        
        mealtype,
        location,
        cuisine,
        hcost,
        lcost,
        sort=1,
        page=1
    }=req.body;

    let filters={};

   if(mealtype){
       
      filters.mealtype_id=mealtype
   }
   if(location){
       filters.location_id=location
   }
   if(cuisine){
       
        filters["cuisine.name"]={
            $in:cuisine
        }
   }
   if(hcost)
   {
       filters.min_price={
           $lt:hcost
       }
   }
   if(lcost){
       
      filters.min_price={
          $gt:lcost
      }
   }
   if(lcost && hcost){

     filters.min_price={
         $lt:hcost,
         $gt:lcost
     }
   }

    Restaurants.find(filters).sort({min_price:sort}).then((success)=>{

        //pagination
        const pageSize=2
        var result=success.slice(page*pageSize-pageSize,page*pageSize);
        

        res.status(200).json({
            message:req.body,
            Restaurants:result,
            pageNo:page,
            noOfPages:Math.ceil((success.length/pageSize))
        })
    }).catch((err)=>{

        res.status(500).json({
            message:"error occured",
            Error:err
        })
    })
}