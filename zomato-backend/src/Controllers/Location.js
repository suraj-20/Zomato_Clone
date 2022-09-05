const Locations=require('../Models/Location');

// Adding All Locations

exports.addLocations = (req, res) => {
    
    const {
       
        name,
        city_id,
        location_id,
        city,
        country_name,
    } = req.body;
    
    const Location = new Locations({ 
    
        name: name, 
        city_id: city_id, 
        location_id: location_id, 
        city: city, 
        country_name: country_name 
    
    });
    
    Location.save().then(result => {
    
        res.status(200).json({

            message: "City Added Sucessfully", 
            city: result 
        })
    
    }).catch(err => {

        console.log(err)
    })
}

// Geting All Locations

exports.getAllLocations=(req,res)=>{

    Locations.find().then((success)=>{
        
        res.status(200).json({
            message:"successfully fetched",
            Locations:success
        })
    }).catch((err)=>{

        res.status(500).json({
            message:"someting went wrong",
            Error:err
        })
    })
}

