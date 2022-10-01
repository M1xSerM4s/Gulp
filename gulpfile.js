//Основаной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js"; // Копирование из папки ./src/files/
import { reset } from "./gulp/tasks/reset.js"; // Очистка dist перед копирвоанием
import { html } from "./gulp/tasks/html.js"; // Копирование html из ./src/*.html + работа с pug
import { server } from "./gulp/tasks/server.js"; // Открытие и автообновление файлов в бразуере(на сервере)
import { scss } from "./gulp/tasks/scss.js"; // Обработка scss файлов
import { js } from "./gulp/tasks/js.js"; // Обработка js файлов
import { images } from "./gulp/tasks/images.js"; // Сжатие/перенос изображений и конвертация в webp
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"; // Шрифты
import { svgSpriteLocal } from "./gulp/tasks/svgSprite.js"; // svg спрайты для иконок из папки src/svgicons в dist/img/icons/icons.svg
import { zip } from "./gulp/tasks/zip.js"; // Создание zip архива
import { ftp } from "./gulp/tasks/ftp.js"; // ftp перенос файлов

// Наблюдатель за изменениями в файле
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSpriteLocal };

// Последовательная обработка шрфитов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Параллельные основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// Построение сценариев выполненных задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнение сценария по умолчнаию
gulp.task("default", dev);
