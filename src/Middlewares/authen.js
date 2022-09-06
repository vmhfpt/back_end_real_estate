const jwt = require('jsonwebtoken');
function authLogin(req, res, next){
   //next();
   const authHeader = req.header('authorization');
      const token = authHeader && authHeader.split(' ')[1];
      if(token == null){
        return res.sendStatus(403);
      }
      try {
         const decoded = jwt.verify(token, 'secret');
         req.userId = decoded.data.id;
         req.name = decoded.data.name;
         req.email = decoded.data.email;
         next();
      }catch {
        
       return  res.sendStatus(403);
      } 
    

}
module.exports = authLogin;