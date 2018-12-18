var http = require('http');

var net = require('net');
var HOST = '0.0.0.0';
//var HOST = '18.223.100.180';
var PORT = 8080;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('"Hello server from node client"');
});

client.on('data', function(data) {

	obj = JSON.parse(data);

    console.log("Enviando sms");

    http.get('http://localhost/api-sms/web/app_dev.php/sms/send?number='+obj.number+'&text='+obj.text, (resp) => {
        resp.on('data', (data) => {
        	console.log(data);
        });
    }).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
});

client.on('close', function() {
    console.log('Connection closed');
});
