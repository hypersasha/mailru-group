### Компонент `<Droppable>`
Данный компонент добавляет выбора файлов для загрузки на сервер, путём перетаскивания их в окно браузера.
См. пример использования:

```jsx
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDragOver: false,
            isDropped: false,
            isActive: true
        };

        this.HandleDragEnter = this.HandleDragEnter.bind(this);
        this.HandleDragOver = this.HandleDragOver.bind(this);
        this.HandleDragLeave = this.HandleDragLeave.bind(this);
        this.HandleDrop = this.HandleDrop.bind(this);
    }

    HandleDrop(files) {

        if (files && files.length > 0) {
            console.log(files);
            this.setState({
                isDragOver: false,
                isDropped: true,
                isActive: false
            });
        } else {
            this.setState({
                isDragOver: false
            });
        }
    }

    HandleDragEnter() {
        this.setState({
            isDragOver: true
        });
    }

    HandleDragOver() {
        this.setState({
            isDragOver: true
        });
    }

    HandleDragLeave() {
        this.setState({
            isDragOver: false
        });
    }

    render() {
        return (
            <div className="App">
                <Droppable className={"dropbox" + (this.state.isDragOver ? ' dragOver' : '')}
                           isActive={this.state.isActive}
                           onDrop={this.HandleDrop}
                           onDragEnter={this.HandleDragEnter}
                           onDragOver={this.HandleDragOver}
                           onDragLeave={this.HandleDragLeave}>
                    <div className="dropbox-area">
                        <p>{!this.state.isDropped ? "Drag your files here." : "Om-nom-nom your files!"}</p>
                    </div>
                </Droppable>
            </div>
        );
    }
}
```

Список props, которые может принимать данный компонент.

|Название|Тип|Описание|
| ------------ | ------------ | ------------ |
| className  | string  | Пользовательский стиль, переписывающий стандартный less компонента.  |
| onDragEnter  | function  | Обработчик события перемещения файла в зону droppable.  |
| onDragOver  | function  | Обработчик события перемещения файла внутри зоны droppable. |
| onDragLeave  | function  | Обработчик события покидания файла зоны droppable. |
| onDrop  | function  | Обработчик события отпускания файла в зону droppable. Принимает единственный аргумент **files** (файлы, отпущеные в droppable).|
| isActive  | function  | Активна ли зона droppable? Если false, то вышеописанные события вызываться **не будут**. |