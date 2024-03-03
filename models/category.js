const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,   // kategori adının veri tipi
        required: true, // zorunlu alan
        unique: true    // benzersiz alan (aynı kategori 2. defa eklenemez)
    },
    description: {
        type: String,
        required: false,
        default: 'default açıklama ekledim :)' // varsayılan açıklama
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now // oluşturulma tarihi, varsayılan olarak şu anın zamanını alır
    }
}, { collection: 'Categories' }); // Collection adını burada belirtiyoruz

module.exports = mongoose.model('Category', categorySchema);
