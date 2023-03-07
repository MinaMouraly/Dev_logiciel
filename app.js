const chalk= require('chalk');//permet d'ajouter de la couleur 
//var prompt= require('prompt');
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
        '2= societe\n'+
        '3= ajout utilisateur\n')
    );
    
  
  function main(){

    //on demande le choix a l'utilisateur 
    var choix= readlineSync.question('Choisissez 1,2 ou 3:');

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
    else if(choix=='3')
    {
        utilisateur();
    }
}

  //fonction pour l'utilisateur 
  function utilisateur()
  {

    const newUser = {

        id: readlineSync.question('ID: '),
  
        email: '',
  
        first: readlineSync.question('Prénom: '),
  
        last: readlineSync.question('Nom: '),
  
        company: readlineSync.question('Société: '),
  
        created_at: new Date().toISOString(),
  
        country: readlineSync.question('Pays: ')
  
      };
    
       // Demande de l'adresse email à l'utilisateur, avec une boucle pour s'assurer qu'elle est valide

    let email;

    do {

      email = readlineSync.question('Email: ');

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        console.log(chalk.red('Adresse email invalide. Veuillez saisir une adresse email valide.'));

        email = undefined;

      }

    } while (!email);


    // Ajout de l'adresse email valide à l'utilisateur et sauvegarde dans le fichier users.json

    newUser.email = email;

    users.push(newUser);

    fs.writeFileSync('users.json', JSON.stringify(users));

    console.log('Utilisateur ajouté avec succès !');
  }

  main();

   
   

    


