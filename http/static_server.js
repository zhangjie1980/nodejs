var http = require("http");
var parse = require("url").parse;
var join = require("path").join;
var fs = require("fs");

var root = __dirname;

http.createServer(function(req, resp) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    console.log("path = " + path);

    //var stream = fs.createReadStream(path);

    /*
    stream.on("data", function(chunk) {
        resp.write(chunk);
    });
    stream.on("end", function() {
        resp.end();
    });
    */

    //这个方法会自动调用resp.end()方法
    /*
    stream.pipe(resp);
    stream.on("error", function(err) {
        resp.statusCode = 500;
        resp.end("Internal Server Error");
    });
    */

    fs.stat(path, function(err, stat) {
        if (err) {
            console.log("err = " + err.code);
            if ('ENOENT' == err.code) {
                resp.statusCode = 404;
                resp.end("File Not Found");
            } else {
                resp.statusCode = 500;
                resp.end("Internal Server Error");
            }
        } else {
            resp.setHeader("Content-Length", stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(resp);
            stream.on("error", function(err) {
                resp.statusCode = 500;
                resp.end("Internal Server Error");
            });
        }
    });

}).listen(8888);
