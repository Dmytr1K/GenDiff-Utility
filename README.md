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

[![asciicast](https://asciinema.org/a/349597.svg)](https://asciinema.org/a/349597)

## Работа с программой

### Сравнение плоских файлов

#### Flat JSON with stylish output format

[![asciicast](https://asciinema.org/a/349595.svg)](https://asciinema.org/a/349595)

#### Flat JSON with plain output format

[![asciicast](https://asciinema.org/a/349763.svg)](https://asciinema.org/a/349763)

#### Flat YAML и INI

Результат аналогичен сравнению JSON

### Сравнение файлов, имеющих вложенные структуры

#### Nested JSON with stylish output format

[![asciicast](https://asciinema.org/a/349594.svg)](https://asciinema.org/a/349594)

#### Nested JSON with plain output format

[![asciicast](https://asciinema.org/a/349762.svg)](https://asciinema.org/a/349762)

#### Nested YAML и INI

Результат аналогичен сравнению JSON
