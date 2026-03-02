# GitHub Setup Instructions

## Текущее состояние
- Репозиторий: https://github.com/supertrue-hub1/Sravnipay.git
- Ветка: main
- Последний коммит: `3e90076` - add_pm2_config

## Что было сделано
1. Обновлен `.gitignore` - исключены временные файлы
2. Добавлена конфигурация PM2 (ecosystem.config.js)
3. Изменения закоммичены

## Для пуша на GitHub

### Вариант 1: С использованием токена
```
bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/supertrue-hub1/Sravnipay.git
git push
```

### Вариант 2: Вручную через терминал
```
bash
cd D:\NewProject\next-mfo
git push
```
При запросе введите username и Personal Access Token.

## Получить токен GitHub
1. Зайдите на https://github.com/settings/tokens
2. Нажмите "Generate new token (classic)"
3. Выберите права: `repo`
4. Скопируйте токен и используйте как пароль

## Клонирование репозитория
После пуша другие смогут клонировать:
```
bash
git clone https://github.com/supertrue-hub1/Sravnipay.git
cd Sravnipay
npm install
```

## Запуск на сервере (PM2)

### Предварительно нужно собрать проект:
```
bash
npm run build
```

### Запуск с PM2:
```bash
pm2 start ecosystem.config.js
```

### Другие команды PM2:
```
bash
pm2 stop next-mfo      # Остановить
pm2 restart next-mfo   # Перезапустить
pm2 logs               # Посмотреть логи
pm2 list               # Список процессов
```

### При ошибке "Script not found: app.js"
Убедитесь что запускаете из папки с проектом и после `npm install` выполнили `npm run build`.

## Важно для продакшена
Next.js проект требует Node.js >= 24.0.0
