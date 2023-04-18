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

        //recuperer tous les cients
        app.get("/api/customers/all", function(req, res){

            const customers = business.getAllCustomers();

            //transforme en flux lisible par le navigateur
            res.status(200).json(customers);
        });

        //recuperer les clients par page
        app.get("/api/customers", function(req, res){

            const number = req.query.number;
            const page = req.query.page;

            // get customers from business layer
            // const customers = business.getAllCustomers();
            const resCustomers = business.getCustomers(number, page);
           
            // res.json(customers);
            res.status(200).json(resCustomers);
        
        });

        //ajoute un client
        app.post("/api/customers",function(req,res){

            let message = business.addCustomer(req.body);
            res.status(200).send(message);
        });


        app.put('/api/customers', (req, res) => {
            let message = business.updateUser(req.body);
            res.status(200).send(message);
        })

        app.delete('/api/customers', (req, res) => {
            const clientid = req.query.id;
            let message = business.removeUser(clientid);
            res.status(200).send(message);
        })
    /* app.post("/api/customers",function(req,res){

            const reqAddCustomer = {
                email : req.query.email,
                first :  req.query.first,
                last : req.query.last,
                company : req.query.company,
                country : req.query.country
            };

            const formC = business.addcustomer(reqAddCustomer);
        
            // res.json(customers);
            res.json(formC);

        });*/

        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

module.exports = apiServ;