const fs = require("fs");
//const proc = request("process");
//require("doteny").config();
const filename = "./data/customers.json";


let datalayer = {

    //Renvoi tous les clients du customers.json
    getAllCustomers : function(){
        //read json file
        const data =fs.readFileSync(filename);

        //parse to object
        const customers = JSON.parse(data);

        //return custormers
        return customers;
    },

   //renvoie que les numero de  clients de la  page
    getCustomers : function(number, page) {
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
    addCustomer: function(newCustomer) {

        // read existing customer data
        const dataC = fs.readFileSync(filename);
        const customers = JSON.parse(dataC);
         
    
        // add new customer to array
        customers.push(newCustomer);
    
        // save updated customer data to file
        const customerContent = JSON.stringify(customers);

        fs.writeFileSync(filename, customerContent,err=>{
            if(err) throw err;
        });
    },
    
    updateCustomer : function(customer){
        // Charge le contenu du fichier JSON
        const data = fs.readFileSync(filename);
        const clients = JSON.parse(data);

        // Trouve l'objet à mettre à jour
        const objectid = clients.findIndex(obj => obj.id === customer.id);

        // Si l'objet existe, met à jour ses propriétés avec les données fournies
        if (objectid !== -1) {
            const updatedObject = { ...clients[objectid], ...customer };
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
    removeCustomer : function(customer){
        //get data from json file
        const rawdata = fs.readFileSync(filename);
        //parse to object
        let newcustomer = JSON.parse(rawdata);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const id = newcustomer.findIndex(user => user.id === parseInt(customer));
        if (id != -1) {
            //puis de le retirer s'il existe 
            newcustomer.splice(id, 1);
            //et de reecrire le fichier
            fs.writeFileSync(filename, JSON.stringify(newcustomer, null, 2));
            return 1;
        } else 
          return 0;        
    }
              

};


module.exports= datalayer;