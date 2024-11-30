# Бэкенд для проекта «Restorunner»

### Сущности

- CLI приложение для генерации моковых данных и складирования их в БД (MongoDb).
- REST API сервер для взаимодействия с фронтом.

---

### Сборка и запуск

- Пример переменных окружения - `.env-example`;
- Предварительно нужно поставить MongoDb, конфиг docker compose: `docker-compose.dev.yaml`;
- Пример команды для инициализации докерфайла: `docker compose --file ./docker-compose.dev.yml --env-file ./.env --project-name "restorunner" up -d`;

- Установка зависимостей: `npm i`;
- Сборка проекта: `npm run build`;

#### CLI:

- После сборки проекта:
- NOTE: моковые данные уже сгенерированы и лежат в `test-data.tsv`, для работы достаточно импортировать их в монгу командой `--import`, подробности ниже.
- Поднять json-сервер для имитации получения данных извне: `npm run mock:server`;
- NOTE: если одна из команд ниже отказывается запускаться из-за нехватки прав, проставляем их: `chmod u+x ./dist/main.cli.js`;
- `./dist/main.cli.js --help` - список доступных команд;
- `./dist/main.cli.js --generate *n* ./mocks/test-data.tsv *url*` - генерация n строк моковых данных, где `url` - адрес json-сервера;
- `./dist/main.cli.js --import mocks/test-data.tsv *db_username* *db_password* *db_ip* *tablename*` - импорт сгенерированных данных в монгу;

#### REST:

- Запуск в dev режиме: `npm run start:dev` (автоматический перезапуск после изменений кода в src);
- Запуск: `npm run start`;
- После можно собирать и запускать фронт: [here](https://github.com/isNotANumber/restorunner).

---

#### Основные технологии:

- HTML;
- SCSS;
- TS/Node/Express/MongoDb/Mongoose;
- Vite.
