//const pres= require("./Presentation/consolePres");
const apiServ = require("./Presentation/apiPres");
const port = 3001;

function main(){
   
    //start api serveur
    apiServ.start(port);//recupere les donne 

    //start console ui

    //press.start();
}
main();
