var http = require("http");
http.createServer(function(req, resp) {
    var data = "Hello World";
    resp.setHeader("Content-Length", data.length);
    resp.setHeader("Content-Type", "text/plain");
    resp.setHeader("Custom-Content", "By me");

    //必须在setHeader之后调用，否则会抛出异常。
    resp.write(data);
    resp.end();
}).listen(8888);


