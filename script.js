window.onload = function(){
 //===================================
   //data
   var rawCsvData = "";
   var ajax = new XMLHttpRequest();
   var recordsArray = [];
 //===================================
   //event handlers
   //get csv and populate email list
   ajax.onload = function(){
     if( ajax.status === 200 || ajax.status === 0){
       rawCsvData = ajax.responseText;//capture raw csv and..
       //split it into records array and ...
       recordsArray = rawCsvData.split("\r");
       populateDropdownList(recordsArray)
     }
     else{
       alert("You've got ajax problems or remote file problems");
     }
   }
   
   //select a friend to email
   id('selEmail').onchange = function(){
     var i = id('selEmail').selectedIndex;
     var chosenPerson = id('selEmail').options[i].text;
     
     //here's where we "fix" the name
     //===============================
     var pieces = chosenPerson.split(',');
     chosenPerson = pieces[1] + " " + pieces[0];      
     //===============================
     var yes = confirm('Email '+ chosenPerson +'?');   
     if(yes){
         email(chosenPerson + " " + pieces[2]);
     }
     id('selEmail').selectedIndex = 0;// go back to email heading
   };

   //===================================  
   //functions
   function id(identifier){
     return document.getElementById(identifier);
   }
   
   function email(name){
     //alert('Emailing this person: ' + name);
     
     //Here's where we actually send the email
     //=======================================
     window.location.assign("mailto:"+name); 
     //========================================
   }
   
   //populate drop down list
   function populateDropdownList(lines){        
       id('selEmail').innerHTML = "";
       var heading = document.createTextNode("Choose Friend Below");
       var opt0 = document.createElement('option');
       opt0.appendChild(heading);
       id('selEmail').appendChild(opt0);
       
       //eliminate the csv header and then sort the names
       for(var i = 1; i < lines.length ; i++){
           lines[i-1] = lines[i];
       }
       lines.pop(); //pull out redundant line from the bottom of the list
       lines.sort();
       
       //populate dropdown list
       for(var i = 0; i < lines.length; i++){
           var opt = document.createElement('option');
           opt.appendChild(document.createTextNode(lines[i]));
           id('selEmail').appendChild(opt);
       }
   }
   //====================================     
   //actions    
   ajax.open('GET','friendMail.csv', true);
   ajax.send(null);
}