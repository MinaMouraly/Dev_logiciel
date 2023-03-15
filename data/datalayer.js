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

   /* addCustomers: function(customers){

    }*/

    getCustomers : function (number, page) {
        {

         //read json file
         let rawdata =fs.readFileSync(filename);

         //parse to object 
         let customers = JSON.parse(rawdata);

         const total = customers.length;

         //filter by number and page
         if(number && page){
            customers = customers.slice((page- 1) * number, page* number);
         }
         
         //create object with total count and result
         const result ={
            total: total,
            result: customers

         };
         
         //return customers
         return result;

        }
    }

};

module.exports= datalayer;