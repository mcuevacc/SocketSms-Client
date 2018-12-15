var http = require('http');

var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

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
