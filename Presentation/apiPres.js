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
        app.get('/api/customers',(req,res)=>{
            res.jsendFile(__dirname+'/liste.html');
        });
            
        //ajoute un client
        app.post("/api/customers",function(req,res){
           const customer=req.body
            const newc= business.addCustomer(customer);
            res.json(newc);
            res.send({message:"ok"});
        });


        //modifie
        app.put('/api/customers', (req, res) => {
            const customer = req.body;
            let update = business.updateCustomer(customer);
            res.status(200).send(update);
        });

        //supprime
        app.delete('/api/customers', (req, res) => {
            const customerid = req.query.id;
            let customer = business.getCustomers(customerid);
            if (!customer) {
                res.status(404).send({ message: `Le client avec l'ID ${customerid} n'existe pas` });
                return;
              }
              let remove = business.removeCustomer(customerid);
              res.status(200).send({ message: `Le client avec l'ID ${customerid} a été supprimé` });
           
        });
        
    
        //lance l'ecoute du serveur
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

module.exports = apiServ;