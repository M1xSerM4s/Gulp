import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";
import prettyHtml from "gulp-pretty-html";

// Для работы с html, а не pug файлами
// import fileinclude from "gulp-file-include";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Для работы с html, а не pug файлами
      // .pipe(fileinclude())
      .pipe(
        pug({
          // Сжатие HTML файла
          pretty: false,
          // Показывать в терминале какой файл обработан
          verbose: true,
        })
      )
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      .pipe(
        prettyHtml({
          indent_size: 4,
          indent_char: " ",
          unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
        })
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
