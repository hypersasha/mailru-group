### Модуль `PersonGenerator`
Данный модуль позволяет сгенерировать людей с фальшивыми данными.

```jsx
PersonGenerator.getPersons(options)
    .then((result: IPerson[]) => {})
    .catch((err: Error) => {})
```
Список опций, которые должен принимать данный модуль.

|Название|Тип|Описание|
| ------------ | ------------ | ------------ |
| count | number | Количество генерируемых человек |
| rndNumMin | number | Минимальное граница для случайного числа |
| rndNumMax | number | Максимальная граница для случайного числа |
| bigTextParagraphs | number | Количество абзацев в сгенерированном **большом** тексте для одного человека (Общее количество таких параграфов для всех людей не должно превышать 500) |
| mediumTextSentences | number | Количество предложений в сгенерированном **среднем** тексте для одного человека (Общее количество таких предложений для всех людей не должно превышать 500) |
| smallTextSentences | number | Количество предложений в сгенерированном **маленьком** тексте для одного человека (Общее количество таких предложений для всех людей не должно превышать 500) |
| pictureWidth | number | Ширина генерируемой картинки |
| pictureHeight | number | Высота генерируемой картинки |

Модуль возвращает массив сгенерированных людей со следующими параметрами:

|Название|Тип|
| ------------ | ------------ |
| gender | string |
| firstName | string |
| secondName | string |
| address.index | number |
| address.region |string |
| address.city | string |
| address.street | string |
| address.house | string |
| age | number |
| birthday.year | number |
| birthday.month | number |
| birthday.day | number |
| phone | string |
| email | string |
| username | string |
| workCompany | string |
| photo | string |
| aboutMe | string |
| bigText | string[] |
| mediumText | string[] |
| smallText | string[] |
| rndNumber | number |
| picture | string |
