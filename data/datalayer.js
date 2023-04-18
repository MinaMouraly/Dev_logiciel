const fs = require("fs");
//const proc = request("process");
//require("doteny").config();
const filename = "./data/customers.json";

let datalayer = {

    getAllCustomers : function(){
        //read json file
        const data =fs.readFileSync(filename);

        //parse to object
        const customers = JSON.parse(data);

        //return custormers
        return customers;
    },

   //renvoie les clients par page
    getCustomers : function (number, page) {
        {

         //read json file
         let rawdata =fs.readFileSync(filename);

         //parse to object 
         let customers = JSON.parse(rawdata);

         const total = customers.length;

         //filter by number and page
         if(number && page){
            customers = customers.slice((page- 1) * number, page*number);
         }
         
         //create object with total count and result
         customers={
            total: total,
            customers: customers

         };
         
         //return customers
         return customers;

        }
    },
  
    //ajouter un client à la base de données
    addCustomer: function(last, first,company,country,email) {
        // read existing customer data
        const data = fs.readFileSync(filename);
        const customers = JSON.parse(data);
    
        // create new customer object
        const newCustomer = {
            name: last,
            first: first,
            company:company,
            country:country,
            email: email,
        };
    
        // add new customer to array
        customers.push(newCustomer);
    
        // save updated customer data to file
        const customerContent = JSON.stringify(customers);
        fs.writeFileSync(filename, customerContent);
    
        return newCustomer;
    },
    
    updateUser : function(user){
        // Charge le contenu du fichier JSON
        const data = fs.readFileSync(filename);
        const clients = JSON.parse(data);

        // Trouve l'objet à mettre à jour
        const objectid = clients.findIndex(obj => obj.id === user.id);

        // Si l'objet existe, met à jour ses propriétés avec les données fournies
        if (objectid !== -1) {
            const updatedObject = { ...clients[objectid], ...user };
            clients[objectid] = updatedObject;
            // Écrit le nouveau contenu du fichier JSON
            const updatedData = JSON.stringify(clients, null, 2);
            fs.writeFileSync(filename, updatedData);
            return 1;
        } else {
            return 0;
        }
    },

    //retire l'user en fonction de son id
    removeUser : function(removeuser){
        //get data from json file
        const rawdata = fs.readFileSync(filename);
        //parse to object
        let newclients = JSON.parse(rawdata);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const id = newclients.findIndex(user => user.id === parseInt(removeuser));
        if (id != -1) {
            //puis de le retirer s'il existe 
            newclients.splice(id, 1);
            //et de reecrire le fichier
            fs.writeFileSync(filename, JSON.stringify(newclients, null, 2));
            return 1;
        } else 
          return 0;        
    }
                    

};

module.exports= datalayer;