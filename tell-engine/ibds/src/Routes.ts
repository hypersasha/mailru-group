import {Request, Response, Application} from "express";
import * as fs from "fs";
import * as path from "path";
import * as Busboy from "busboy";
import {FileUploader} from "./RequestHandlers/FileUploader";

export class Routes {

    public routes(app: Application): void {

        // Allow Cross-Origin access to this server.
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            next();
        });

        app.get('/test', (req, res) => {
            res.end("That's all folks, yeah!");
        });

        // Uploads a new file on the server.
        app.post('/upload', (req, res) => {
            let saveDir = path.resolve('./ibds/uploads/');
            let fu : FileUploader = new FileUploader(saveDir,31457280, 10); // 30 MB and 1 file maximum

            // Lets create config for busboy
            let config = {
                headers: req.headers,
                limits: {
                    fileSize: fu.MaxFileSize,
                    files: fu.FilesCount
                }
            };

            let busboy = new Busboy(config);
            req.pipe(busboy);

            let uploadedFiles:Array<string> = [];
            busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
                fu.OnFile(fieldname, file, filename, encoding, mimeType);
                // Save name of uploaded file to array.
                file.on('end', () => {
                    uploadedFiles.push(filename);
                });
            });

            busboy.on('finish', () => {
                console.log('Upload complete');
                res.writeHead(200, {'Connection': 'close'});
                let response = {
                    uploaded: uploadedFiles
                };
                res.end(JSON.stringify(response));
            });
        })
    }
}