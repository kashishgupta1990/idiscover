var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var keySchema = new Schema({    
    keyword: String,
    description: String,
    key_bool:   {
        type: Boolean,
        default: false
    }
});

var typeSchema = new Schema({
    
    sec_name: String,
    type_bool: {
        type: Boolean,
        default: true
    },    
    keywords: [keySchema]
});

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    type_num: {
        type:String,
        default:''
    },
    type_selected: {
        type: Boolean,
        default: false
    },
    usertype: [typeSchema]
    
});



User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
