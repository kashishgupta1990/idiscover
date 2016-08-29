var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

module.exports = mongoose.model('TypeSchema2', typeSchema);
