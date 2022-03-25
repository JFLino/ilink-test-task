## Описание

Приложение представляет собой  сервис, который парсит шутки и предоставляет метод для получения их по GraphQL.  Сервис умеет сохранять шутки пользователя в БД (MongoDB), при этом
нужно указать username пользователя (если пользователь с таком username не существует в базе,
то новый пользователь добавиться в базу).

Каждый объект шутки (Joke) содержит поля:
 - id - строка
 - value - строка
 - categories - массив строк
 - created_at - строка
 - updated_at - строка
 - icon_url - строка
 - url - строка

## Запуск сервиса

```bash
# development
$ npm run start

# watch mode
$ npm run start --watch
```

## Получение случайной шутки

```bash
#GraphQL
query nameOfQuery{
  joke {
    id
    value
    categories
    created_at
    updated_at
    icon_url
    url
  }
}
```

## Получение шутки принадлежащей к определенной категории

Сначала можно узнать какие категории вообще существуют (результат массив строк):

```bash
#GraphQL
query nameOfQuery{
  categories 
}
```

Теперь можно получить шутку указав название категории в качестве параметра:

```bash
#GraphQL 
query nameOfQuery{
  jokeByCategory (category: "animal"){ #в качестве примера указана категория "animal"
    #поля объекта Joke, которые вы хотите получить
  }
}

```

## Поиск по ключевым словам

Нужно отметить, что запрос возвращает массив шуток (Joke[])

```bash
#GraphQL
query nameOfQuery{
  jokesByKeyword(keyword: "hello"){# в качестве ключевого слова указано "hello"
    #поля объекта Joke, которые вы хотите получить
  }
}
```

## Получение нескольких случайных шуток

```bash
#GraphQL
query nameOfQuery{
   jokes(number: 2){
    #поля объекта Joke, которые вы хотите получить
  }
}
```

Запрос вернет 2 случайных шутки

## Сохранение шутки в БД

Для сохранения шутки нужно указать username пользователя и id шутки (напомню, id шутки
храниться в объекте Joke) в mutation

```bash
#GraphQL
mutation mutationName{
  	add(username: "MyuserName", jokeId: "idOfJoke")
}
```

Получение сохраненных шуток:

```bash
#GraphQL
query nameOfQuery{
  savedJokes(username: "MyuserName"){
    #поля объекта Joke, которые вы хотите получить
  }
}
```