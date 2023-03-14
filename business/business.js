const dal= require("../data/datalayer");
//const  _ = require("underscore");

const defaultNumber=10;
const defaultPage= 1;
const maxNumber =100;

const business={

    getAllCustomers : function() {

        return dal.getAllcustomers();
    },

    getCustomers : function(number, page) {

        //check params
        if(number == undefined || page== undefined) {
            number = defaultNumber;
            page= defaultPage;
        }

        if(number> maxNumber ){
            number - maxNumber;
        }

        //get data from DAL
        const resCustomers = dal.getcustormers(number,page);

        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total/ number);

        //return customers
        return resCustomers

        
    },

    /*addcustomers: function(customer)
    {

    },

    getCounterByAttriIbute : function(attr){

    };*/
}


module.exports=business;
