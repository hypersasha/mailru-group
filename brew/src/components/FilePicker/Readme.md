### Компонент `<FilePicker>`
Данный компонент добавляет элемент для выбора файлов для загрузки на сервер.

```jsx 
<FilePicker
    className={"brewPicker"}
    onChange={this.HandleFileChange}
    onSizeExceeded={(maxSize) => { alert("Max file size is " + maxSize + " MB") }} />
<button onClick={this.HandleUpload}>Start</button>
```

Загрузите выбранные файлы на сервер, используя следующий код:
```javascript
import {XhrFilesUpload} from './lib/Utils';

...

HandleFileChange(files) {
    console.log(files);
    this.setState({
        filesToUpload: files
    });
}

HandleUpload() {
    XhrFilesUpload(this.state.filesToUpload, "http://localhost:3000/upload", (response) => {
        // On Finished Handler
        console.log(response);
    }, (percentage) => {
        // On Progress Handler
        console.log('Progress: ' + percentage + '%');
    });
}

...
```

Список props, которые может принимать данный компонент.

|Название|Тип|Описание|
| ------------ | ------------ | ------------ |
| name  | string  | Имя поля input для выбора файла.  |
| size  | number  | Максимальный размер файла в байтах.  |
| onSizeExceeded  | function  | Обработчик события превышения допустимого размера файла. |
| onChange  | function  | Обработчик события изменения файла в input. |
| className  | string  | Пользовательский стиль, переписывающий стандартный less для этого компонента. *Обратите внимание*, что изменение стили кнопки для выбора файла будет доступно в классе **.yourClassName-button**  |