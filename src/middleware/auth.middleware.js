const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY, (err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            req.body.username=result.username;
            req.body.userid=result.userid;
            next();
        }
    })
}

module.exports={auth};