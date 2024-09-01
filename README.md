Тестовая задача для собеседования на
позицию Web-разработчик (React) в компанию TLTPRO.
Ссылка на задание: https://docs.google.com/document/d/1M8sADzrv7yRjdd4uUqooz8MQlzKqgCyNz_vqENK00kk/edit

## Описание

Реализована Frontend часть.
Web-приложение для работы с данными из бызы (список товаров). 

Выполнена страница авторизации, получение с сервера и хранение токена.

Список пользователей:
{
    "id": 1,
    "email": "admin@example.com",
    "password": "admin123",
    "roles": [ 1, 2 ]
},
{
    "id": 2,
    "email": "user@example.com",
    "password": "user123",
    "roles": [ 2 ]
}
Выполнена страница "Товары". Вывод товаров представлен в двух вариантах: табличном и карточном. Один вариант сверстан с использованием flex, другой с использованием grid. Страница полностью функциональна: пагинация, поиск, CRUD-операции.

При выполнении проекта использовались:
 - TypeScript
 - React
 - Redux Toolkit (RTK Query)
 - Tailwind

Библиотеки:
 - Formik
 - Yup
 - Classnames
 - react-toastify
 - MUI

## Get started

### Клонируем репозиторий

```bash
git clone git@github.com:VitalMangal/TLTPRO.git
```

### Инициализация

```bash
npm run init.
```

### Запускаем приложение

```bash
npm run react
```
