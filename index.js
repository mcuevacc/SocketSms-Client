var http = require('http');

var net = require('net');
var HOST = '0.0.0.0';
//var HOST = '18.223.100.180';
var PORT = 8080;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('Conected to: ' + HOST + ':' + PORT);
    client.write('"Hi server from node client"\n');
});

client.on('data', function(data) {
    try {
        console.log("Sending SMS: "+data);    
    	obj = JSON.parse(data);    

        http.get('http://localhost/api-sms/web/app_dev.php/sms/send?number='+obj.number+'&text='+obj.text, (resp) => {
            resp.on('data', (data) => {
            	console.log('Response: '+data);
            });
        }).on("error", (err) => {
    	  console.log("Error: " + err.message);
    	});
    } catch (error) {
        console.error(error);
    }
});

client.on('close', function() {
    console.log('Connection closed');
});
