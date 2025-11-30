# Nardello Chat (Vercel + Make)

Статичный чат‑интерфейс (HTML/CSS/JS) + serverless‑функция `/api/chat`, проксирующая запрос в Make Webhook.

## Быстрый старт (локально)
1) Установите Vercel CLI: `npm i -g vercel`
2) Инициализируйте проект: `vercel`
3) Добавьте переменную окружения:
```
vercel env add MAKE_WEBHOOK_URL
# вставьте свой https://hook.eu2.make.com/XXXXXX
```
4) Запуск: `npm run dev`
5) Откройте http://localhost:3000

## Продакшн деплой (Vercel)
1) Опубликуйте репозиторий на GitHub.
2) Импортируйте репозиторий в Vercel.
3) В Project → Settings → Environment Variables добавьте `MAKE_WEBHOOK_URL`.
4) Нажмите **Deploy**.

## Формат ответа сценария Make
Ожидается JSON:
```json
{ "status": "ok", "documentTitle": "...", "documentContent": "...", "sourceLink": "..." }
```
При ошибке — фолбэк с полями `message` и/или `content`.

## Структура
```
public/index.html  — фронтенд
api/chat.js        — прокси в Make (serverless)
vercel.json        — конфиг Vercel
package.json       — скрипты
.gitignore
README.md
```