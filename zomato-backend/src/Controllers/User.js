const UserData=require('../Models/User');


exports.UserSignUp=(req,res)=>{

   const {
       email,
       password,
       FirstName,
       LastName
   }=req.body;
  
   const UserObj=new UserData({
       
        email:email,
        password:password,
        FirstName:FirstName,
        LastName:LastName
   })

   console.log(UserObj)
   UserData.find(
       {
           email:email,
           password:password
       }
   ).then((result)=>{

    if(result.length>0){

        res.status(400).json({
            message:"user already registered, please login to continue",
    
        })
    }
    else{
        UserObj.save().then((result)=>{

            res.status(200).json({
                message:"user registred successfully",
                UserData:result
            })
        }).catch((err)=>{

            res.status(500).json({
                
                message:"data fetching failed",
                Error:err
            })
        })
    }
   })

}


exports.UserLogIn=(req,res)=>{

    const {
        email,
        password
    }=req.body;

     UserData.find({email:email,password:password}).then((result)=>{

        if(result.length>0){

            res.status(200).json({
                
                message:"user Loggedin Successfully",
                isLoggedIn:true,
                userData:result
            })
        }
        else{

            res.status(400).json({
                
                message:"either Email or Password is wrong",
                isLoggedIn:false,

            })
        }
     }).catch((err)=>{
         
        res.status(500).json({

            message:"error in data base",
            Error:err
        })
     })
}