const db = require('../db.js')

exports.create = (payload, success, err) => {
   db.order.create(payload).then(success).catch(err)
}

exports.findAll = (err, success) => {
   db.order.findAll().then(success).catch(err)
}

exports.find = (err, success) => {
   db.order.find({
      where:payload,
      include: [{
         all:true,
         nested: true
      }],
   }).then(success).catch(err)
}

exports.delete =  (id, err, success) => {
   db.order.destroy({
      where: id
   }).then(success).catch(err)
}