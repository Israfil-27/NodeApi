const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    Name: {
        type: String,   // kategori adının veri tipi
        required: true, // zorunlu alan
        unique: true    // benzersiz alan (aynı kategori 2. defa eklenemez)
    },
    lastName: {
        type: String,
        required: true,
    },
    age:{
        type:String,
        require:false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now // oluşturulma tarihi, varsayılan olarak şu anın zamanını alır
    }
}, { collection: 'ProtuctTest' }); // Collection adını burada belirtiyoruz

module.exports = mongoose.model('ProtuctTest', categorySchema);