const dal= require("../data/datalayer");    //import the data layer
//const  _ = require("underscore");

const defaultNumber=10; //default number of customers per page
const defaultPage= 1;   //default page
const maxNumber =50;   //max number of customers per page

const business={

    getAllCustomers : function() {  //get all customers
        return dal.getAllCustomers();   //call the DAL function
        
    },

    getCustomers : function(number, page) { //get customers by page

        //check params
        if(page== undefined) {

            page= defaultPage;
        }
        
        if(number == undefined ){ 
            number = defaultNumber;
        }

        if(number> maxNumber ){
            number = maxNumber;
        }

        //get data from DAL
        const resCustomers = dal.getCustomers(number,page);

        resCustomers.page = page;
        resCustomers.number = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total/ number);

        //return customers
        return resCustomers;
 
    },
     

   //ajouté un client à la base de données  
 
   addCustomer: function(reqAddCustomer)  {
        dal.addCustomer(reqAddCustomer);
         return { success: true, message: "Utilisateur ajouté avec succès." };

   },

   updateUser : function(user){
    let nb = dal.updateUser(user);
    if(nb) return { success: true, message: "Utilisateur modifié avec succès." };
    else return { success: false, message: "Erreur lors de la modification du client." };
  },

        removeUser : function(user){
            let nb = dal.removeUser(user);
            if(nb) return { success: true, message: "Utilisateur supprimé avec succès." };
            else return { success: false, message: "ID d'utilisateur non trouvé." };
        }

};


//export the business object

module.exports=business;
