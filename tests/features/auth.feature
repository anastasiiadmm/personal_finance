# language: ru

Функционал: Регистрация и аутентификация пользователя
  Как анонимный пользователь
  Я хочу иметь возможность пользоваться сайтом
  Для этого я хочу регистрироваться и логиниться

  @register
  Сценарий: Регистрация пользователя
    Допустим я нахожусь на странице регистрации
    Если я ввожу в поля текст:
      | field       | value                |
      | email       | kilma.1334@gmail.com |
      | password    | 1qaz@WSX29           |
      | displayName | Kilma                |
    И нажимаю на кнопку Sign up
    То вижу "Register successful"

  @login
  Сценарий: Логин пользователя
    Допустим я нахожусь на странице логина
    Если я ввожу в поля текст:
      | field    | value            |
      | email    | johndoe@test.com |
      | password | 1qaz@WSX29       |
    И нажимаю на кнопку Sign in
    То вижу "Login successful"

  @newGroup
  Сценарий: создание новой группы у залогиненного пользователя
    Допустим я нахожусь на странице логина
    Если я ввожу в поля текст:
      | field    | value            |
      | email    | johndoe@test.com |
      | password | 1qaz@WSX29       |
    И нажимаю на кнопку Sign in
    То вижу "Login successful"
    И попадаю на страницу списка всех групп
    Затем я нажимаю на кнопку Add new group
    Если я ввожу в поля текст:
      | field | value |
      | title | Test  |
    И нажимаю на кнопку Create
    То вижу "Group created successful"


