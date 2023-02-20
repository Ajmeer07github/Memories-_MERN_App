import jwt from 'jsonwebtoken';


const auth = async(req, res, next) => {
    try {
        
       const token = req.headers.authorization.split(" ")[1];
       
       let decodedData;
       
       if(token){

        decodedData = jwt.verify(token, 'test') ;
        
        req.userId = decodedData?.id;

        }
        else{
            console.log("error in token in middelware");
        }

        next();

    } catch (error) {
        console.log(error,"error in middleware");
    }
}

export default auth;