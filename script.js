//reaserch cross domain requests https://www.xul.fr/ajax/xdomainrequest.php
//https://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript
var pack={username:'',message:''};
function initialized(){
  document.getElementById('username').focus();
}
function user(){
  if(document.getElementById('username').value.length>1){
  pack.username=document.getElementById('username').value;
  document.getElementById('welcome').style.display="none";
  var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          document.getElementById('chat').innerHTML+='<p><span class="msg">'+this.responseText+'</span></p>';
          document.getElementById('message').focus();
    };
    xmlHttp.open("GET",'http://ServerIP:8080/login', true); // true for asynchronous 
    xmlHttp.send(null);
    
  }else{alert("Username Must Be Longer than 1 Letter");}
}
function fastUser(event){
    var key = event.which || event.keyCode;
    if(key===13){
      user();
    }else{}
}
function send(){
  if(document.getElementById('message').value.length>1){
  pack.message=document.getElementById('message').value;
  document.getElementById('message').value='';
  var request = new XMLHttpRequest();
  request.open('POST','http://ServerIP:8080/msg');
  request.setRequestHeader('Content-type','application/json');
  request.send(pack.username+': '+pack.message);
  }else{alert("Message Must Be Longer than 1 Letter");
  document.getElementById('username').focus();
  }
}
function fastSend(event) {
    var key = event.which || event.keyCode;
    if(key===13){
      send();
      event.preventDefault();
    }else{}
}
function logout(){
  var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          document.getElementById('chat').innerHTML+='<p><span class="msg">'+this.responseText+'</span></p>';
          document.getElementById('message').focus();
    };
    xmlHttp.open("GET",'http://ServerIP:8080/logout', true); // true for asynchronous 
    xmlHttp.send(null);
}
//post taken from https://stackoverflow.com/questions/5584923/a-cors-post-request-works-from-plain-javascript-but-why-not-with-jquery
//Handle the incoming message this way
/*function send(){
  pack.message=document.getElementById('message').value;
  document.getElementById('chat').innerHTML+='<p><span class="msg">'+pack.username+": "+pack.message+'</span></p>';
  document.getElementById('message').value="";
}*/
