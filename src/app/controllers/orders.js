const express = require('express');
const router = express.Router();

// Importing Models
const Product = require('../models/Product.js')
const Order = require('../models/Order.js')

module.exports = function(app){
	app.use('/api/v1', router);


  router.get('/order', (req, res) => {    
    Order.find()
      .populate('product_id') 
      .exec(function(err, product){
        res.json(product)
      });
    });


  router.get('/products', (req, res) => {
    console.log("Getting all products! 🙌")
    Product.find()
    .exec((err, products) => {
      res.json(products)
    })
  })

  router.get('/order/:orderID', (req, res) => {
    // console.log(req.params.orderID)
    Order.findById(req.params.orderID, (err, docs) => {
      console.log("DOCS REURNED--- ",docs)
      res.json(docs)
    }).populate('product_id') 

  })

  router.post('/order', (req, res) => {
    // console.log('Create NEW Order:', req.body);
    const newOrder = new Order(req.body)
    let total = []
    let i = 0
    req.body.product_id.forEach((id) => {
      Product.findById(id, (err, product) => {
        i++
        total.push(product.price)
        if(i === req.body.product_id.length){
          newOrder.total_price = newOrder.getTotalPrice(total)
          newOrder.save((err, order) => {
          if(err) return res.send(err);
            res.json(order);
          })
        }      
      })
    })
  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Getting an order by Id and updating it.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.put('/order/:orderID', (req, res) => {
    console.log("Update Order now: ", req.body )
    let arryTotal = []
    let i = 0
    req.body.product_id.forEach((id) => {
      Product.findById(id, (err, product) => {
        i++
        arryTotal.push(product.price)
        if(i === req.body.product_id.length){
         Order.findOne({_id: req.params.orderID}, (err, order) => {
            order.total_price = order.getTotalPrice(arryTotal)
            order.product_id = req.body.product_id
            console.log("3: ", order)
            order.save((err, order) => {
              if(err) return res.send(err);
              console.log("hello")
              res.json(order);
            });
          })
        }
      })
    })    
  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Deleting by the orderID.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.delete('/order/:orderID', (req, res) => {
    const id = req.params.orderID;
    Order.delete(id, (err) => {
      console.log("DELETE THIS NOW!!!! ", req.params.orderID )
      res.sendStatus(500);
    }), (successData) => {
      res.status(200).json(successData)
    }
  })

  return router;
}

