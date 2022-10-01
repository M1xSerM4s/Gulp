import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    // Ищем файлы шрифтов .otf
   return (
       app.gulp
           .src(`${app.path.srcFolder}/fonts/*.otf`, {})
           .pipe(
               app.plugins.plumber(
                   app.plugins.notify.onError({
                       title: "FONTS",
                       message: "Error: <%= error.message %> ",
                   })
               )
           )
           // Конвертируем в .ttf
           .pipe(
               fonter({
                   formats: ["ttf"],
               })
           )
           .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
   );
};

export const ttfToWoff = () => {
   // Ищем файлы шрифтов .ttf
   return (
       app.gulp
           .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
           .pipe(
               app.plugins.plumber(
                   app.plugins.notify.onError({
                       title: "FONTS",
                       message: "Error: <%= error.message %>",
                   })
               )
           )
           // Конвертируем в .woff
           .pipe(
               fonter({
                   formats: ["woff"],
               })
           )
           // Выгружаем в папку с результатом
           .pipe(app.gulp.dest(`${app.path.build.fonts}`))
           // Ищем файлы шрифтов .ttf
           .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
           // Конвертируем в woff2
           .pipe(ttf2woff2())
           // Выгружаем в папку с результатом
           .pipe(app.gulp.dest(`${app.path.build.fonts}`))
   );
};

export const fontsStyle = () => {
   // Файл стилей подключения шрифтов
   let fontsFile = `${app.path.srcFolder}/scss/scss-default/fonts.scss`;
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
       if (fontsFiles) {
           // Проверяем существует ли файл стилей дял подключения шрифтов
           if (!fs.existsSync(fontsFile)) {
               // Если файла нет, создаем его
               fs.writeFile(fontsFile, "", cb);
               let newFileOnly;
               for (var i = 0; i < fontsFiles.length; i++) {
                   // Записываем подключения шрифтов в файл стилей
                   let fontFileName = fontsFiles[i].split(".")[0];
                   if (newFileOnly !== fontFileName) {
                       let fontName = fontFileName.split("-")[0]
                           ? fontFileName.split("-")[0]
                           : fontFileName;
                       let fontWeight = fontFileName.split("-")[1]
                           ? fontFileName.split("-")[1]
                           : fontFileName;
                       let fontWeightLoverCase = fontWeight.toLowerCase();
                       let fontWeightName = [
                           "thin",
                           "extralight",
                           "light",
                           "medium",
                           "semibold",
                           "bold",
                           "extrabold",
                           "heavy",
                           "black",
                           "regular",
                       ];
                       let fontWeightSecondName = fontWeightLoverCase;
                       fontWeightName.forEach((element) => {
                           fontWeightSecondName = fontWeightSecondName.replace(
                               element,
                               ""
                           );
                       });
                       if (fontWeightSecondName) {
                           fontWeightSecondName =
                               fontWeightSecondName[0].toUpperCase() +
                               fontWeightSecondName.slice(1);
                       }
                       if (~fontWeightLoverCase.indexOf("thin")) {
                           fontWeight = 100;
                       } else if (~fontWeightLoverCase.indexOf("extralight")) {
                           fontWeight = 200;
                       } else if (~fontWeightLoverCase.indexOf("light")) {
                           fontWeight = 300;
                       } else if (~fontWeightLoverCase.indexOf("medium")) {
                           fontWeight = 500;
                       } else if (~fontWeightLoverCase.indexOf("semibold")) {
                           fontWeight = 600;
                       } else if (~fontWeightLoverCase.indexOf("bold")) {
                           fontWeight = 700;
                       } else if (
                           ~fontWeightLoverCase.indexOf("extrabold") ||
                           ~fontWeightLoverCase.indexOf("heavy")
                       ) {
                           fontWeight = 800;
                       } else if (~fontWeightLoverCase.indexOf("black")) {
                           fontWeight = 900;
                       } else {
                           fontWeight = 400;
                       }
                       fs.appendFile(
                           fontsFile,
                           `@font-face{\n\tfont-family: ${fontName}${fontWeightSecondName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                           cb
                       );
                       newFileOnly = fontFileName;
                   }
               }
           } else {
               console.log(
                   "Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!"
               );
           }
       }
   });
   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() {}
};