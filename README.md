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

- Установка:

```sh
npm install dmytr1k-gendiff
```

- Удаление:

```sh
npm uninstall dmytr1k-gendiff
```

### Используя git

- Установка:

```sh
git clone git@github.com:Dmytr1K/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
make link
```

- Удаление:

```sh
cd frontend-project-lvl2
make unlink
cd ..
rm -R frontend-project-lvl2
```

## Использование встроенной справки

- Получить подсказку по работе с программой:

```sh
gendiff -h
```

- Узнать версию:

```sh
gendiff -V
```

Пример работы со встроенной справкой:

[![asciicast](https://asciinema.org/a/349958.svg)](https://asciinema.org/a/349958)

## Работа с программой

### Сравнение плоских файлов (содержащих только пары ключ-значение)

#### Сравнение плоских файлов JSON со стильным (по умолчанию) форматом вывода результата

[![asciicast](https://asciinema.org/a/349980.svg)](https://asciinema.org/a/349980)

#### Сравнение плоских файлов JSON с плоским форматом вывода результата

[![asciicast](https://asciinema.org/a/349978.svg)](https://asciinema.org/a/349978)

#### Сравнение плоских файлов JSON с выводом результата в виде строки JSON

[![asciicast](https://asciinema.org/a/349979.svg)](https://asciinema.org/a/349979)

#### Плоские файлы форматов YAML и INI

Результаты сравнения аналогичны результатам сравнения файлов формата JSON

### Сравнение файлов, имеющих вложенные структуры

#### Сравнение файлов JSON, имеющих вложенные структуры, со стильным (по умолчанию) форматом вывода результата

[![asciicast](https://asciinema.org/a/349981.svg)](https://asciinema.org/a/349981)

#### Сравнение файлов JSON, имеющих вложенные структуры, с плоским форматом вывода результата

[![asciicast](https://asciinema.org/a/349982.svg)](https://asciinema.org/a/349982)

#### Сравнение файлов JSON, имеющих вложенные структуры, с выводом результата в виде строки JSON

[![asciicast](https://asciinema.org/a/349983.svg)](https://asciinema.org/a/349983)

#### Файлы форматов YAML и INI, имеющие вложенные структуры

Результаты сравнения аналогичны результатам сравнения файлов формата JSON
