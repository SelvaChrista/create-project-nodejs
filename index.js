const http = require("http");
const fs = require("fs");
const formidable = require("formidable");




const server = http.createServer((req, res) => {
    if(req.url === "/"){
        fs.readFile("index.html", (error, data) => {
            if (error) throw error;
            res.writeHead(200,   {"Content-Type":"text/html"});
            res.end(data);
        });
    }

    if (req.url === "/uploadFile"){
        var form = new formidable.IncomingForm();
        form.parse(req, (error, fields, files) =>{
          

            var originalFilename = files.fuResume[0].filepath;
            var newFilepath = __dirname + "\\resumes\\" + files.fuResume[0].originalFilename;


            fs.copyFile(originalFilename, newFilepath, (error)=>{

                if(error) throw error;
                res.end("File Uploaded!");

            });
        });
    }


});

server.listen(8080);