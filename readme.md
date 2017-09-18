# Overview of Application

We have credited an api for purchasing items from Firehouse Subs. We are currently on Version 1 of this api. Through the collection of routes below you can create, read, update, and delete an order. You will need to use AJAX as some of the supported method types are not handled natively by browsers. See our documentation below to learn more.

## Local Install For Devlopers

Set up for local development is easy. We use NPM as our package manager to maintain our packages. To install this application on your local machine, run the following commands.

```git clone https://github.com/jonathandavidpollock/FireshouseSubs.git```

```cd FireshouseSubs```

```npm install```

```npm start```

We recommend installing the package nodemon to auto-refresh your browser after saving your files

If you have any issues, please submit an issue here on Github.

### MongoDB

Install and start mongodb.

``npm install mongodb`` then ``npm i`` to make sure everything is installed. This will also populate the database with 3 sample products.

then use ``mongod`` to make sure the mongo is running.

### Env

Create a .env file in the local directory.

```
MONGO_HOST=localhost
MONGO_DATABASE=yourDatabase
```

## Setup for a VPS (Virtual Private Server)

### Initial Server Setup with Ubuntu 16.04

We are assuming you alrady have Ubuntu setup. If not here is a quick tutorial to get started.

[Server Setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

### Install Nginx on Ubuntu 16.04

This is a guide on how to install Nginx on your server.

[Install Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

##### How To Secure Nginx with Let's Encrypt on Ubuntu 16.04

Note this is Recommended  but isn't necessary at this time. It is up to you if you want to do it now or later. If you want to go ahead and do it here is a quick [guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04).

### Set Up a Node.js Application for Production on Ubuntu 16.04

This is the last part left to do. Follow this guide and it will help you get your node enviroment setup on your server.

[Setup Node.js](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)



## How to Operate the Application

### Routes

#### HTTP Request

##### Base URL

`https://api-firehouse.herokuapp.com/api/v1`

When this URL is hit you will see "Hello Word" in the browser. 
This can be a quick check to see if you are connecting to the API. 
If you see "Hello World" you are set to go.

##### Get Products

`https://api-firehouse.herokuapp.com/api/v1/products`

This is getting all products from the database. To see all the products in the database run the command above. The product id's are needed to make a new order.  

##### Get Orders
This is the route that needs to be hit to get all orders from the database. The example down below is what the data will look like for the return.

`https://api-firehouse.herokuapp.com/api/v1/order`


```
[
    {
        "_id": "59aeb8c9cd2f6072acc0d86f",
        "__v": 0,
        "total_price": 1,
        "product_id": [
            {
                "_id": "59ac17689421581a6a87dc9b",
                "name": "Firehouse Meatball",
                "price": 1,
                "__v": 0
            }
        ]
    },
    {
        "_id": "59aeb8d5cd2f6072acc0d870",
        "__v": 0,
        "total_price": 1,
        "product_id": [
            {
                "_id": "59ac17689421581a6a87dc9b",
                "name": "Firehouse Meatball",
                "price": 1,
                "__v": 0
            },
            {
                "_id": "59ac17689421581a6a87dc9a",
                "name": "Smokehouse beef & cheddar brisket",
                "price": 1,
                "__v": 0
            }
        ]
    }
]
```
##### Get Order by Id
This route is getting an order by a single Id. The example down below is what the data will look like for the return.

`http://localhost:3000/api/v1/order/:orderID`

`https://api-firehouse.herokuapp.com/api/v1/order/59aeb8c9cd2f6072acc0d86`


```
{
    "_id": "59aeb8c9cd2f6072acc0d86f",
    "__v": 0,
    "total_price": 1,
    "product_id": [
        {
            "_id": "59ac17689421581a6a87dc9b",
            "name": "Firehouse Meatball",
            "price": 1,
            "__v": 0
        }
    ]
}
```
##### Post

`https://api-firehouse.herokuapp.com/api/v1/order`

This route is to create a new order. To create a new order you need to add product items to the product\_id array. The product_id array is a field in the Order Schema. Here is a example down below.


To test if the api is working use [Postman](https://www.getpostman.com/). The product\_id is needed to create the order. You can add many product\_id's to one order. As you see below.

![postman post example](http://image.ibb.co/mJPMMv/Screen_Shot_2017_09_05_at_4_30_15_PM.png "Postman Post Example")

This should be the output after creating a new order as you can see in the picture above. In the picture above we added 2 products to the order.

```
{
    "__v": 0,
    "_id": "59af09321dfab37fa2a6a4ca",
    "total_price": 2,
    "product_id": [
        "59ac17689421581a6a87dc9b",
        "59ac17689421581a6a87dc9b"
    ]
}
```
##### Update

`https://api-firehouse.herokuapp.com/api/v1/order/orderID`

This route is to update a order. All you need to do is pass the id of the order you want to update. For Example:

`https://api-firehouse.herokuapp.com/api/v1/order/59af09321dfab37fa2a6a4ca`

You can also test this using [Postman](https://www.getpostman.com/). Below is a example of how to update a order in Postman. We are using the same order as the one we just created. We are adding 2 more products to the order. The product\_id array now has 4 products in it.

![postman update example](http://image.ibb.co/icDZ8a/Screen_Shot_2017_09_05_at_4_43_38_PM.png "Postman Put Example")

##### Delete

`https://api-firehouse.herokuapp.com/api/v1/order/orderID`

This route is to delete a order. All you need to do is pass the id of the order you want to delete. For Example:

`https://api-firehouse.herokuapp.com/api/v1/order/59af09321dfab37fa2a6a4ca`

You can also test this using [Postman](https://www.getpostman.com/). Below is a example of how to delete a order in Postman. We are using the same order as the one we just created and updated. We pass in the order id and send the request. We then get a response back from the api `OK`. The order has now been deleted.

![postman delete example](http://image.ibb.co/kOqgoa/Screen_Shot_2017_09_05_at_4_47_54_PM.png "Postman Delete Example")



## Post Mortem
This project took approximately four days to complete with a team of four developers. One developer focused on CRUD. One focused on  routes. One focused on documentation. This project pushed our knowledge of Node.js and our first time at deploying a Node.js application. The largest hurdle was the Post request. There was a problem with Mongo not syncing perfectly with Javascript. We believe it was because Javascript was running to fast, even when we used promises.

This project was also our first large team project. It challenged our knowledge of Git. We all worked remotely. We learned the a lot about how to do work remote. All in all it was a valuable learning experience.
