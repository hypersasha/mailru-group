<img src="https://pp.userapi.com/c855020/v855020041/41b19/YVcV3Hu5iC0.jpg"/>

### Компонент `<Button>`
Добавляет элемент кнопки на страницу приложения.
Кнопка полностью адаптивная подходит одновременно как для веб, так и мобильных интерфейсов.

```jsx
<Button
    onClick={(isActive) => { console.log('Invite sent!'); }}
    theme={'royal-blue'}>
    Send Invite
</Button>
```
Список props, которые может принимать данный компонент.

|Название|Тип|Описание|
| ------------ | ------------ | ------------ |
| align  | string  | Выравнивание кнопки по горизонтали внутри родительского элемента. Допустимые значения: *left* (default), *center*, *right*. |
| after  | object  | Контент, который следует расположить в правой части кнопки. Только для размеров medium и выше.  |
| before | object | Контент, который следует расположить в правой части кнопки. Только для размеров medium и выше. |
| disabled | bool | Отключает кнопку для взаимодействия. Default: *false*. |
| level  | string  | Стиль кнопки, согласно Instant Brew styleguide. Допустимые значения: *primary* (default), *secondary*.  |
| loading | bool | Показывает индикатор загрузки внутри кнопки. Событие onClick для кнопки отключается. Default: *false*. |
| size | string | Устанавливает размер кнопки. Допустимые значения: *small*, *medium*, *large* (default). |
| theme | string | Задает цвет кнопки согласно названиям градиентов из Instant Brew Styleguide. **Допустимые значения:** *green-apple* (default), *royal-blue*, *veronika*, *mustard*, *clear-sky*, *indigo*.|
| noWide | bool | Установить ширину кнопки согласно её содержимому. Эта опция доступна только для кнопок размером **large**. |