# Проект: Вычислитель отличий

Утилита для поиска отличий в конфигурационных файлах

## Установка и удаление

### Используя npm

- Установить

```sh
npm install -g dmytr1k-gendiff
```

- Удалить

```sh
npm uninstall -g dmytr1k-gendiff
```

### Используя git

- Установить

```sh
git clone git@github.com:Dmytr1K/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
make link
```

- Удалить

```sh
cd frontend-project-lvl2
make unlink
cd ..
rm -R frontend-project-lvl2
```

## Встроенная справка

- Получить подсказку по работе с программой

```sh
gendiff -h
```

- Узнать версию

```sh
gendiff -V
```

[![asciicast](https://asciinema.org/a/346866.svg)](https://asciinema.org/a/346866)

## Работа с программой

### Сравнение плоских файлов (JSON)

- Пример работы с относительными путями до файлов

[![asciicast](https://asciinema.org/a/346867.svg)](https://asciinema.org/a/346867)

- Пример работы с относительным и абсолютным путями до файлов

[![asciicast](https://asciinema.org/a/346868.svg)](https://asciinema.org/a/346868)
