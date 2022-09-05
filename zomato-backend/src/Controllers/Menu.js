const Menu = require('../Models/Menus');

// Add Menu Items

exports.addMenuModel = (req, res) => {
    
    const {
    
        name,
        description,
        restaurantId,
        image,
        qty,
        resName,
        price
    } = req.body;

    const item = new Menu({ 
    
        name: name, 
        description: description, 
        restaurantId: restaurantId, 
        image: image, 
        qty: qty, 
        resName: resName, 
        price: price 
    })
    
    item.save().then(result => {

        res.status(200).json({ message: "Items Added Sucessfully", restaurant: result })

    }).catch(err => {

        console.log(err)
    })
}

// Geting All Menu Items

exports.getAllMenu = (req, res) => {
    
    Menu.find().then(result => {

        res.status(200).json({ 

            message: "Restaurant Menu Fetched Successfully", itemsList: result
        })
    }).catch((err) => {

        console.log(err);
    })
}

// Geting Menu Items By Id

exports.getMenuModel = (req, res) => {

    const resId = req.params.id;
    
    Menu.find({ rest: resId }).then(result => {
        
        res.status(200).json({ 

            message: "Restaurant Items Fetched Sucessfully", itemsList: result 
        })
    }).catch(err => {
    
        console.log(err)}
    );
}