//une API permet a deux application de communiquer entre elles
//pluutot une echange de données entre serveurs et clients

//create api with express to expose from buisness layer
var express = require("express");
const business = require("../business/business");
var app= express();

const apiServ= {

    start: function(port) {

        //add middlesware to parse json
        app.use(express.json());

        app.get("/test",function(req,res){

            console.log(req.query);

            res.json(
                {
                    "test": "test"
                }
            )
        });

        app.get("/api/custormers",function(req,res){

              /* const number = req.query.number;
               const page = req.query.page;
               const resCustomers =business.getCustormers;*/

               const customers = business.getAllCustomers();
               res.json(customers);

        });

        //add cors middleware

        app.listen(port,function(){
            console.log("Server running on port\t" + port);
        });
    }
};

module.exports= apiServ;
