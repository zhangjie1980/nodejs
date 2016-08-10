var http = require("http");
var items = [];
var qs = require("querystring");

http.createServer((req, resp) => {
    if ('/' == req.url) {
        switch(req.method) {
            case 'GET':
                show(resp);
                break;
            case 'POST':
                add(req, resp);
                break;

            default:
            break;
        }
    }
}).listen(8888);

function show(resp) {
    var html = '<html><head><title>Todo List</title></head><body>'
             + '<h1>Todo List</h1>'
             + '<ul>'
             + items.map(function(item) {
                   return '<li>' + item + '</li>'
               }).join(' ')
             + '</ul>'
             + '<form method="post" action="/">'
             +  '<p><input type="text" name="item" /></p>'
             +  '<p><input type="submit" value="Add Item" /></p>'
             + '</form></body></html>';
    resp.setHeader("Content-Type", "text/html");
    resp.setHeader("Content-Length", Buffer.byteLength(html));
    resp.end(html);
}

function add(req, resp) {
    var body = "";
    req.setEncoding("utf-8");
    req.on("data", function(chunk) {
        body += chunk;
    });
    req.on("end", function() {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(resp);
    });
}
