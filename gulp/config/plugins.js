import replace from "gulp-replace"; // Поиск и замена текста
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщения(подсказки)
import browsersync from "browser-sync"; // Сервер
import newer from "gulp-newer"; // Проверка на изменения картинок(если картинки уже сжимались и конвертировались, то эти действия не будут совершаться повторно)
import ifPlugin from "gulp-if"; // Условное ветвление

// Экспортируемый объект со всеми общими плагинами
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};
