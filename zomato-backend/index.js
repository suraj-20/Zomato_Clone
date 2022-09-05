const express=require('express');
const app=express();
const port=4500;
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const routes=require('./src/Routes/Restaurant')
const paymentRoute=require('./paymentRoute')

//intlizing all the libraries
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);
app.use('/api',paymentRoute);







//connecting to mongodb

mongoose.connect(
    'mongodb+srv://sura_j20:s8u2r8a7j@cluster0.dtydm.mongodb.net/zomato?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    
).then((success)=>{

    console.log("mongodb connected");

    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
    })
}).catch((err)=>{
    
    console.log(`Error occured while Connecting ${err}`)
})





