# GitHub Setup Instructions

## Текущее состояние
- Репозиторий: https://github.com/supertrue-hub1/Sravnipay.git
- Ветка: main
- Последний коммит: `42e8e7f` - update_project

## Что было сделано
1. Обновлен `.gitignore` - исключены временные файлы:
   - `.next.zip`, `build.log`
   - `DEPLOYMENT.md`, `DEPLOY_TIMEWEB.md`
   - Скрипты сборки и запуска (`*.ps1`, `*.bat`)
   - `public/.htaccess`

2. Изменения закоммичены

## Для запуша на GitHub

### Вариант 1: Если уже настроен GitHub CLI
```
bash
gh auth login
gh repo sync
git push
```

### Вариант 2: С использованием токена
```
bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/supertrue-hub1/Sravnipay.git
git push
```

### Вариант 3: Вручную через терминал
```
bash
cd D:\NewProject\next-mfo
git push
```
При запросе введите:
- Username: ваш GitHub username
- Password: ваш GitHub Personal Access Token (не пароль!)

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
npm run dev
