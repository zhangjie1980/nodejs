var http = require("http");
var url = require("url");
var items = [];
http.createServer(function(req, resp) {
    switch(req.method) {
        case 'POST':
            var item = '';
            req.setEncoding("UTF-8");
            req.on("data", function(chunk) {
                item += chunk;
            });
            req.on("end", function() {
                items.push(item);
                resp.end("OK\n");
            });
            break;
        case 'GET': 
            var body = items.map(function(item, i) {
                return i + ")" + item;
            }).join("\n");
            resp.setHeader("Content-Type", "'text/plain' ; charset='utf-8'");
            resp.setHeader("Content-Length", Buffer.byteLength(body));
            resp.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(-1), 10);
            if (isNaN(i)) {
                resp.statusCode = 400;
                resp.end("Invalid item id");
            } else if (!items[i]) {
                resp.statusCode = 404;
                resp.end("Item not found");
            } else {
                items.splice(i, 1);
                resp.statusCode = 200;
                resp.end("OK\n");
            }
            break;
    } 
}).listen(8888);
