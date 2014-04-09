/*
//========= "better???"  select alternitive with Jquery=====
$(document).bind('mobileinit',function(){
 $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
//===================================
*/
//data
var select = document.getElementById('select');
var arrayOfPhoneNumbers = [];
var ajax = new XMLHttpRequest();
var record = [];

// ==========event handlers===========
ajax.onload = function(){
   if(ajax.status === 200 || ajax.status === 0){
       arrayOfPhoneNumbers = ajax.responseText.split("\r");
       for (var i = 1; i<arrayOfPhoneNumbers.length; i++){
         arrayOfPhoneNumbers[i-1] = arrayOfPhoneNumbers[i];    
       }
       arrayOfPhoneNumbers.pop();    
       arrayOfPhoneNumbers.sort();

       select.innerHTML = "";
       for(var i = 0; i< arrayOfPhoneNumbers.length; i++){//fill the select object with phone number options
         record = arrayOfPhoneNumbers[i].split(",");//get a record and slpit it up      
         var name = record[0] + " " + record[1];//join first name and last name      
         var text = document.createTextNode(name);//create text node for the option element      
         var opt = document.createElement('option');//create option element      
         opt.appendChild(text);//place text inside option element      
         opt.value = record[2];//put in the phone number as the option's 'value'      
         select.appendChild(opt);//append option to select element
       }
   }
}

select.onchange = function(){  
   var i = select.selectedIndex;
   location.assign("tel:" + select.options[i].value) ;
}

select.ondblclick = function(){
   if(select.selectedIndex === 0){
       var i = select.selectedIndex;
       location.assign("tel:" + select.options[i].value) ;
       
       alert("slected index is 0");
       return;
   }
   var i = select.selectedIndex;
   location.assign("tel:" + select.options[i].value) ;
}

select.onclick = function(){
   var i = select.selectedIndex;
   location.assign("tel:" + select.options[i].value) ;
}

//activities
var doc = "http://dl.dropboxusercontent.com/u/21142484/.Mobile.Apps/.Final.Weeks/Dialer/PhoneNumbers.csv"
ajax.open("GET",doc,true);
ajax.send();
