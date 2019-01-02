import * as fs from "fs";
import * as path from "path";

export class FileUploader {

    private mimeTypes : Array<string>;
    private maxFileSize : number;
    private filesCount : number;
    private saveTo : string;

    /**
     * Constructor
     * @param saveTo Directory to save file.
     * @param max_file_size_bytes Max file size in bytes.
     * @param files_count Max files count to upload.
     */
    constructor(saveTo : string, max_file_size_bytes : number, files_count : number) {
        this.maxFileSize = max_file_size_bytes || 5242880; // 5MB by default
        this.filesCount = files_count || 1;
        this.saveTo = saveTo || path.resolve('./uploads/');

        console.log('Initializing FileUploader with path: ');
        console.log(saveTo);
    }

    get MaxFileSize() {
        return this.maxFileSize;
    }

    get FilesCount() {
        return this.filesCount;
    }

    public OnFile(fieldname:string, file: any, filename: string, encoding: string, mimeType: string) {
        console.log('Saving file to: ' + path.join(this.saveTo, filename));
        file.pipe(fs.createWriteStream(path.join(this.saveTo, filename)));
    }
}