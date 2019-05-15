<img src="https://pp.userapi.com/c855124/v855124516/428b5/K3gZzmyG6_U.jpg"/>

### Компонент `<Title>`
Добавляет заголовок определенного уровня на страницу приложения.

```jsx
<Title align={"center"}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <i style={{color: "var(--hyper-green)"}} className="material-icons">favorite_border</i>
        <h1 style={{marginLeft: 6}}>Заварилось!</h1>
    </div>
</Title>
```
Список props, которые может принимать данный компонент.

|Название|Тип|Описание|
| ------------ | ------------ | ------------ |
| level  | string  | Уровень заголовка. Допустимые значения: *title-1* (default), *title-2*, *title-3*, *title-4*, *category*, *subtitle-1*, *subtitle-2*. |
| align  | string  | Выравнивание текста заголовка. Допустимые значения: *left* (default), *center*, *right*.  |
| after | object | Контент, который следует расположить после заголовка. |
| before | object | Контент, который следует расположить перед заголовком. |