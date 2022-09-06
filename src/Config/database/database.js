const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/property');
        console.log('connect database success !');
    } catch {
        console.log('connect database error !');
    }
}
module.exports = {connect};