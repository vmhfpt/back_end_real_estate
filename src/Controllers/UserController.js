const User = require('../Models/User');
const jwt = require('jsonwebtoken');

class UserController {
    update(req, res){
        return res.json({status : " trang cập nhập"});
    }
    index(req, res){
       return res.json({status : 'Trang danh sách người dùng'});
    }
    destroy(req, res){
        return res.json({dtatus : 'trang xóa người dùng'});
    }
    create(req, res){
      
        /*User.create({name : 'Trần Văn Hoàng', phone_number : '0359932904', address : "Dak lak",password : 'còn lâu mới show mật khẩu ở đây', email : 'tranvanhoangltt904@gmail.com' })
        .then((data) => {
           return res.json(data);
        })
        .catch((error) => {
            return res.json(error);
        })*/
        //return res.json({status : 'trang thên người dùng'});
        User.create({
          name : req.body.name,
          address : req.body.address,
          password : req.body.password,
          email : req.body.email,
          phone_number : req.body.phoneNumber,
          token : null,
          role : 1
        })
        .then((data) => {
          const {id, name, email} = data;
          var token = jwt.sign({
            data: {id, name, email}
          }, 'secret', { expiresIn: '15s' });

          var refreshToken = jwt.sign({
            data: {id, name, email}
          }, 'secret', { expiresIn: '1h' });
          User.findByIdAndUpdate(data._id, {token : refreshToken })
          .then((success) => {
            return res.json({
            id : success._id,
            name : success.name,
            email : success.email,
            status : "success", 
            token ,
            refreshToken ,
          });
          })
        })
        .catch((error) => {
          if(error.keyValue.email){
            return res.json({status : "error" , message : error.keyValue.email + " Đã có người đăng ký"  });
          }else {
            return res.json({status : "error" ,  message : error.keyValue.phone_number + " Đã có người đăng ký"  });
          }
          
        })
    }
    login(req, res){
     // return res.json(req.body)
      User.findOne({email : req.body.params.email})
      .then((data) => {
          data.verifyPassword(req.body.params.password)
          .then((status) => {
              if(status) {
                const {id, name, email} = data;
               var token = jwt.sign({
                    data: {id, name, email}
                  }, 'secret', { expiresIn: '15s' });

                  var refreshToken = jwt.sign({
                    data: {id, name, email}
                  }, 'secret', { expiresIn: '1h' });
                  User.findByIdAndUpdate(data._id, {token : refreshToken })
                  .then((success) => {
                    return res.json({
                    id : success._id,
                    name : success.name,
                    email : success.email,
                    status : "success", 
                    token ,
                    refreshToken ,
                  });
                  })
                 //
              }else {
                return res.json({status : "error", message : "email hoặc mật khẩu không chính xác !!!"});
              }
          })
      })
      .catch((error) => {
        return res.json({status : "error", message : "email chưa được đăng ký"});
      })
    }
    logout( req, res){
      return  User.findByIdAndUpdate(req.body.id, {token : null })
        .then((data) => {
           return ( res.json({status : "đăng xuất thành công", data}));
        })
        .catch((error) => {
          return res.json(error);
        })
    }
    accessToken(req, res) {
      return res.json({
        'status' : 'success',
        name : req.name,
        id : req.userId,
        email : req.email
    });
    }
    refreshToken(req, res){
       // return res.json(req.body);
        if(!req.body.params.refreshToken){
            return res.sendStatus(403);
        }

        User.findOne({token : req.body.params.refreshToken})
        .then((data) => {
             if(!data){
              return res.sendStatus(403);
             }
             try {
              const decoded = jwt.verify(data.token, 'secret');
              const  {id, name, email} = data;

              ///////////
              var token = jwt.sign({
                data: {id, name, email}
              }, 'secret', { expiresIn: '15s' });

              var refreshToken = jwt.sign({
                data: {id, name, email}
              }, 'secret', { expiresIn: '1h' });
              /////////
              User.findByIdAndUpdate(data._id, {token : refreshToken})
              .then((success) => {
                return res.json({status : 'success',
                token,
                refreshToken,
                name : success.name,
                email : success.email,
                id : success.id
                
                });
              })


             }catch{
              return res.sendStatus(403);
            }
        })
        .catch((error) => {
           return res.sendStatus(403);
        })
    }
}
module.exports = new UserController();