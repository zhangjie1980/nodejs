var http = require("http");
var formidable = require("formidable");

http.createServer(function(req, resp) {
    switch(req.method) {
        case "GET":
            show(resp);
            break;
        case "POST":
            upload(req, resp);
            break;
    }
}).listen(8888);

function show(resp) {
    var html = "<form method='post' action='/' enctype='multipart/form-data'>"
             + "<p><input type='text' name='name' /></p>"
             + "<p><input type='file' name='file' /></p>"
             + "<p><input type='submit' value='upload' /></p>"
             + "</form>";

    resp.setHeader("Content-Type", "text/html");
    resp.setHeader("Content-Length", Buffer.byteLength(html));
    resp.end(html);
}

function upload(req, resp) {
    //检查是否是表单数据
    if (!isFormData(req)) {
        resp.statusCode = 400;
        resp.end("Bad Request: expecting multipart/form-data");
        return;
    }

    var form = new formidable.IncomingForm();
    form.on("field", function(field, value) {
        console.log(field);
        console.log(value);
    });

    form.on("file", function(name, file) {
        console.log(name);
        console.log(file);
    });

    form.on("end", function() {
        resp.end("upload complete!");
    });
    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf("multipart/form-data");
}
