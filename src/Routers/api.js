const authLogin = require('../Middlewares/authen');
const routeAdminAddress = require('./Admin/address');
const routeAdminUser  = require('./Admin/user');
const routeAdminCategory = require('./Admin/category');
const routeAdminUtility = require('./Admin/utility');
const routeAdminValue = require('./Admin/value');
const routeAdminType = require('./Admin/type');
const routeAdminProperty = require('./Admin/property');
const routerAdminProject = require('./Admin/project');
const UserController = require('../Controllers/UserController');
const routerPostCategory = require('./Post/category');
const routePostProperty = require('./Post/property.js');
const routePostProject = require('./Post/project.js');
const routePostComment = require('./Post/comment.js');
const routerUserProperty = require("./Post/useProperty");
function route(app){
   app.post('/admin/demo', function(req, res) {
      
      return res.json(req.body.params);
   });
   app.post('/admin/refresh-token', UserController.refreshToken);
   app.post('/admin/login', UserController.login);
   app.post('/admin/access-token',authLogin, UserController.accessToken);
   app.post('/admin/logout', UserController.logout);
   app.post('/admin/register',  UserController.create);
   app.use('/admin/user',authLogin, routeAdminUser);
   app.use('/admin/category',authLogin, routeAdminCategory);
   app.use('/admin/utility',authLogin, routeAdminUtility);
   app.use('/admin/type',authLogin, routeAdminType);
   app.use('/admin/value',authLogin, routeAdminValue);
   app.use('/admin/project',authLogin, routerAdminProject);
   app.use('/admin/property',authLogin, routeAdminProperty);
   app.use('/user/property',authLogin, routerUserProperty);
   app.use('/admin/address', authLogin, routeAdminAddress);
  

   app.use('/category', routerPostCategory);
   app.use('/property', routePostProperty);
   app.use('/get-property', routePostProperty);
   app.use('/get-project', routePostProject);
   app.use('/comment', routePostComment);
}
module.exports = route ;