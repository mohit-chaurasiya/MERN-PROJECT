const jwt = require('jsonwebtoken');

const User = require('../models/User');


const requireAuth =  async (req, res, next)=>{
    
    const {authorization} = req.headers;

    if(!authorization){
       
        return res.status(401).json({
            error: 'Authorization token required'
        })
    }

    const token  = authorization.split(' ')[1];

    try {
        
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById({_id}).select('_id role');

        next(); 
    } 
    catch (error) {
        res.status(401).json({
            error: 'Request is not authorized'
        })
    }
    
}

module.exports = requireAuth;