const chalk= require('chalk');//permet d'ajouter de la couleur 
var prompt= require('prompt');
const fs = require('fs');//require permet de lire un fichier
const process = require('process');
let rawdata = fs.readFileSync('users.json');
//on a recupéré les données du fichier et on les stocke dans users
let users = JSON.parse(rawdata);// sert  a parser le fichier , il analyse les chaines de caractere
let country = new Array(users.length);
let company = new Array(users.length);
let i;

const input = process.argv[2];//permet d'ecrire et d'avoir le resultat
const readlineSync = require('readline-sync');//readline permet d'avoir une conversation avec l'utilisateur 
//et readlinesync permet d'avoir une conversation avec le terminal
    
    //Log the menu 
    console.log(
        chalk.blue('Menu:\n'+
        '1= pays\n'+
        '2= societe\n')
    );
    
    //on demande le choix a l'utilisateur 
    var choix= readlineSync.question('Choisissez 1 ou 2:');

    if (choix === '1' || input =='country') {
        //on met que les country dans country
        for (i = 0; i < users.length; i++) {
            country[i] = users[i].country;
        }
        // on compte les country et on les met dans l'objet counts
        const counts = {};
        for (const num of country) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
    
        let res = [];
        // on transforme l'objet counts en tableau
        for (i in counts) {
            res.push({ "country": i, "count": counts[i] });
        }
    
        //on sort le tableau
        res.sort((a, b) => b.count - a.count);
        console.log(res);
    
    }else if(choix === '2' || input=='company'){
        //on met que les company dans company
        for (i = 0; i < users.length; i++) {
            company[i] = users[i].company;
        }
        // on compte les company et on les met dans l'objet counts
        const counts = {};
        for (const num of company) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
    
        let res = [];
        // on transforme l'objet counts en tableau
        for (i in counts) {
            res.push({ "company": i, "count": counts[i] });
        }
    
        //on sort le tableau
        res.sort((a, b) => b.count - a.count);
        console.log(res);
    }
   
    prompt.start();//on commence la demande d'info a l'user
    
    prompt.get(['username','email' ],function(err,result){
     
        console.log('comande line:\n');
        console.log('username:'+result.username);
        console.log('email:'+result.email);
    
    });

    


