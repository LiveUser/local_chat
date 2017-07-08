/*var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  //sending file
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);*/
const http = require('http');
let online=[];
var body='';
//http://unirest.io/nodejs.html
var unirest = require('unirest');
server = http.createServer( function(req, res) {
    if (req.method == 'POST' && req.url == '/msg') {
        console.log("POST");
            body = '';
            req.on('data', function (data) {
            body += data;
        });
        req.on('end', ()=> {
            console.log("Recieved Message Successfully");
            for(i=0;i<online.length;i++){
            let counting=i;
            console.log('attemping to post on '+'http://'+online[counting]+':3535/msg');
            unirest.post('http://'+online[counting]+':3535/msg')
            .set('Content-Type', 'text/plain')
            .send(body)
            .end(function(response){
              if(response.body=='post received'){
                console.log(response.body);
              }
              else if(response.body!=='post received'&&online.length==1){
                online=[];
                console.log('Last person left the chat');
              }
              else{
                online.splice(counting,counting+1);
                console.log('Someone left the chat without logging out');
                console.log(online);
                i-=1;
              }
            });
            }
        });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('post received');
    }
    else if(req.method=='GET'&&req.url=='/login'){
        //16
        if(req.connection.remoteAddress.length==16){
        online.push(req.connection.remoteAddress.substring(7,req.connection.remoteAddress.length));
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Logged in Successfully');
        console.log(req.connection.remoteAddress.substring(7,req.connection.remoteAddress.length)+" Logged in Successfully(IPV4)");
        }
        else if(req.connection.remoteAddress.length>16){
            online.push(req.connection.remoteAddress);
            console.log(req.connection.remoteAddress.substring(7,req.connection.remoteAddress.length)+" Logged in Successfully(IPV6)");
        }else{console.log('Failed to log in');}
    }
    else if(req.method=='GET'&&req.url=='/logout'){
        if (online.length!==1){
            for(b=0;b<online.length;b++){
                online.splice(b,b+1);
                console.log('Someone left the chat');
            }
        }else{online=[];console.log('No people online');}
    }
    else{
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('an error occurred');
    }
    
});

port = 8080;
host = '10.0.0.68';
server.listen(port);
console.log('Listening at http://' +host + ':' + port);

//https://github.com/buckyroberts/Source-Code-from-Tutorials/blob/master/Node.js/014_NodeJs/server.js
//https://www.youtube.com/watch?v=_D2w0voFlEk
