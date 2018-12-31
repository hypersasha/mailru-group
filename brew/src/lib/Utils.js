export function XhrFilesUpload(files, host, onFinish, onProgress) {
    let xhr = new XMLHttpRequest();

    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file[]', files[i], files[i].name);
    }

    // On progress
    xhr.upload.onprogress = function(event) {
        let percentage = (event.loaded / event.total) * 100;
        if (onProgress) {
            onProgress(percentage);
        }
    };

    // On upload completed.
    xhr.onload = xhr.onerror = function() {
        if (this.status === 200) {
            if (onFinish) {
                onFinish(JSON.parse(this.response));
            }
        } else {
            console.log("XhrFilesUpload Error: " + this.status);
        }
    };

    xhr.open("POST", host, true);
    xhr.send(formData);
}