const MealTypes=require('../Models/MealType');

// Adding MealTpyes

exports.addMealTypes = (req, res, next) => {

    const {
    
        name,
        content,
        image,
        meal_type,
    } = req.body;

    const MT = new MealTypes({ 
    
        name: name, 
        content: content, 
        image: image, 
        meal_type: meal_type 
    });
    
    MT.save().then(result => {

        res.status(200).json({ 

            message: "MealType Added Sucessfully", 
            mealtype: result 
        })

    }).catch(err => {
        
        console.log(err)
    })
}

// Geting All Mealtypes

exports.getAllMealTypes=(req,res)=>{

    MealTypes.find().then((success)=>{

        res.status(200).json({
            message:"data fetched successfully",
            MealTypes:success
        })

    }).catch((err)=>{

        res.status(200).json({
            
            message:"error occurred while fetching",
            Error:err
        })
    })
}