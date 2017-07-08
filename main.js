const electron= require('electron');
const {app, BrowserWindow}=electron;
const {webContents} = require('electron');

app.on('ready',()=>{
    let win= new BrowserWindow({width:800,height:600,'web-preferences': {'web-security': false}});
    win.loadURL(`file://${__dirname}/index.html`);
    let contents = win.webContents;
    let port=3535;
    const http=require('http');
    http.createServer(function(request,response){
        if(request.method=='POST'&&request.url=='/msg'){
           var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                console.log("Recieved: " + body);
                contents.executeJavaScript('document.getElementById("chat").innerHTML+='+"'"+'<p><span class="msg">'+
                body+'</span></p>'+
                 "';document.querySelector('#bottom').scrollIntoView();document.getElementById('message').focus();");
            });
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('post received');
        }
        }).listen(port);
    console.log('Listening on port' +port);
    });
electron.app.on('browser-window-created',function(e,window) {
      window.setMenu(null);
  });
//const remote = require('electron').remote;
