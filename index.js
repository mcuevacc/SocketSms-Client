var request = require('request');
var options = {
          uri: 'http://localhost/api-sms/web/app_dev.php/sms/send',
          method: 'POST',
          json: null
        };

var net = require('net');
var HOST = '0.0.0.0';
//var HOST = '18.224.27.30';
var PORT = 1337;

var client = new net.Socket();
client.connect(PORT, HOST);

client.on('connect', ()=>{
    console.log('Conected to: '+HOST+':'+PORT);
});

client.on('ready', ()=>{
    console.log('Connection Ready');
    client.write('Sender');
});

client.on('data', (data)=>{
    try {
        console.log("Sending SMS: "+data);

    	options.json = JSON.parse(data);
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body)
          }
        });
        
    }catch(error){
        console.error(error);
    }
});

client.on("end", ()=>{
    console.log("Connection ended");
});

client.on('close', ()=>{
    console.log('Connection closed');
    setTimeout(() => {
        client.connect(PORT, HOST);
    }, 5000);
});

client.on('error', (error)=>{
    console.log('Socket got problem: ', error.message);
});