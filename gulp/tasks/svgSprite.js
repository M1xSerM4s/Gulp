import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";

export const svgSpriteLocal = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            // Создавать страницу с перечнем иконок
            example: false,
          },
        },
      })
    )
    .pipe(
      svgmin({
        multipass: true,
        js2svg: {
          // Beutifies the SVG output instead of
          // stripping all white space.
          pretty: true,
          indent: 4,
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.src.imagesIcons}`));
};
