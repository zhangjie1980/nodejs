var http = require("http");
http.createServer(function(req, resp) {
    var data = "<p>Baidu <a href='http://www.baidu.com'>Click to Baidu</a></p>";
    resp.setHeader("Content-Type", "text/html");
    resp.setHeader("Content-Length", data.length);
    resp.statusCode = 302;

    resp.write(data);
    resp.end();
}).listen(8888);
