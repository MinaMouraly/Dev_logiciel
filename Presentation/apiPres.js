//une API permet a deux application de communiquer entre elles
//pluutot une echange de données entre serveurs et clients

//create api with express to expose from buisness layer
var express = require("express");
const business = require("../business/business");
var app = express();
const cors = require('cors');

const apiServ = {
    start: function(port) {
        
        app.use(express.json());

        app.use(cors({
            origin: '*'
        }));

        app.get("/test", function(req, res){
            const testObj = {
                test: "test"
            };

            console.log("call done");
            res.json(testObj);
        });

        app.get("/api/customers", function(req, res){

            const number = req.query.number;
            const page = req.query.page;

            // get customers from business layer
            // const customers = business.getAllCustomers();
            const resCustomers = business.getAllCustomers(number, page);

            // res.json(customers);
            res.json(resCustomers);
        });

        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

module.exports = apiServ;