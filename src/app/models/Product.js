const db = require('../db.js')

exports.findAll = (err, success) => {
   db.product.findAll().then(sucess).catch(err)
}