# DoodleTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## SPEC

1. Создание универсального компонента таблицы
   * Задача: Реализуйте компонент таблицы, который принимает данные и параметры конфигурации через входные свойства. Компонент должен поддерживать сортировку, фильтрацию и пагинацию.

2. Реализация маршрутизации с параметрами
   * Задача: Создайте приложение с несколькими маршрутами. Реализуйте маршрутизацию с параметрами и динамическими данными. Обработайте сценарий, когда пользователь вводит недопустимый маршрут.

3. Создание формы с отложенной валидацией
   * Задача: Реализуйте форму, где валидация выполняется не сразу, а после определенного времени (например, 500 мс) после последнего изменения в поле ввода. Используйте debounceTime для оптимизации.

4. Создание кастомного директивы
   * Задача: Напишите кастомную директиву, которая изменяет стиль элемента на основе его состояния (например, меняет цвет фона на зеленый, если текст имеет определенное значение).

5. Создание локального хранилища
   * Задача: Реализуйте функциональность, которая сохраняет данные в локальном хранилище (localStorage) браузера. Данные должны сохраняться между сессиями, и пользователь должен иметь возможность их редактировать.
