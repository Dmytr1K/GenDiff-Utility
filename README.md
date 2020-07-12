# Вычислитель отличий

[![Node CI](https://github.com/Dmytr1K/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Dmytr1K/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/12f5f8da35f09a7cda82/maintainability)](https://codeclimate.com/github/Dmytr1K/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/12f5f8da35f09a7cda82/test_coverage)](https://codeclimate.com/github/Dmytr1K/frontend-project-lvl2/test_coverage)

Утилита для поиска отличий в конфигурационных файлах.

***

Второй из четырёх учебных проектов программы обучения [*Фронтенд JavaScript*](https://ru.hexlet.io/professions/frontend) на образовательной онлайн-платформе [**Хекслет**](https://ru.hexlet.io/pages/about).

***

## Установка и удаление

### Используя npm

- Установить:

```sh
npm install dmytr1k-gendiff
```

- Удалить:

```sh
npm uninstall dmytr1k-gendiff
```

### Используя git

- Установить:

```sh
git clone git@github.com:Dmytr1K/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
make link
```

- Удалить:

```sh
cd frontend-project-lvl2
make unlink
cd ..
rm -R frontend-project-lvl2
```

## Встроенная справка

- Получить подсказку по работе с программой:

```sh
gendiff -h
```

- Узнать версию:

```sh
gendiff -V
```

Пример работы со встроенной справкой:

[![asciicast](https://asciinema.org/a/346866.svg)](https://asciinema.org/a/346866)

## Работа с программой

### Сравнение плоских файлов (JSON)

Пример работы с относительными путями до файлов:

[![asciicast](https://asciinema.org/a/346867.svg)](https://asciinema.org/a/346867)

Пример работы с относительным и абсолютным путями до файлов:

[![asciicast](https://asciinema.org/a/346868.svg)](https://asciinema.org/a/346868)
