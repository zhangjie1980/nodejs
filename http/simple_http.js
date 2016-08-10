var http = require('http');
http.createServer(function(req, resp) {
    //resp.write("Hello world");
    //resp.end();
    resp.end("Hello World");
}).listen(8888);
