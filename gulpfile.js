const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const merge = require("merge-stream");
const { formatPhoneNumber } = require("./src/resources/format-phone-number");
const { formatDate } = require("./src/resources/format-date");

const clean = () => {
  return del(["dist"]);
};

const resources = () => {
  return merge(
    src("src/libs/**").pipe(dest("dist/libs")),
    src("src/favicon.svg").pipe(dest("dist")),
    src("src/fonts/**").pipe(dest("dist/fonts"))
  );
};

const htmlBuild = () => {
  return src("src/index.pug")
    .pipe(
      pug({
        locals: {
          formatPhoneNumber,
          formatDate,
        },
      })
    )
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
};

const htmlDev = () => {
  return src("src/index.pug")
    .pipe(
      pug({
        locals: {
          formatPhoneNumber,
          formatDate,
        },
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const stylesBuild = () => {
  return src(["src/style.scss", "src/components/**/*.scss"])
    .pipe(
      sass
        .sync({ includePaths: require("scss-resets").includePaths })
        .on("error", notify.onError())
    )
    .pipe(concat("style.css"))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: {
          2: {
            mergeMedia: false,
          },
        },
      })
    )
    .pipe(dest("dist"));
};

const stylesDev = () => {
  return src(["src/style.scss", "src/components/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass
        .sync({ includePaths: require("scss-resets").includePaths })
        .on("error", notify.onError())
    )
    .pipe(concat("style.css"))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: {
          2: {
            mergeMedia: false,
          },
        },
        format: "beautify",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images"));
};

const helpersBuild = () => {
  return src("src/scripts/**/*.js")
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]],
      })
    )
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(dest("dist/scripts"));
};

const helpersDev = () => {
  return src(["src/scripts/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist/scripts"))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return src(["src/components/**/*.js", "src/main.js"])
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]],
      })
    )
    .pipe(concat("main.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(dest("dist"));
};

const scriptsDev = () => {
  return src(["src/components/**/*.js", "src/main.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]],
      })
    )
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const imagesSrc = [
  "src/images/**/*",
  "!src/images/svg/**/*",
  "!src/images/svg",
];

const images = () => {
  return src(imagesSrc).pipe(image()).pipe(dest("dist/images"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });

  watch(["src/libs/**", "src/favicon.svg", "src/fonts/**"], resources);
  watch("src/scripts/**", helpersDev);
  watch("src/**/*.pug", htmlDev);
  watch("src/**/*.scss", stylesDev);
  watch("src/**/*.js", scriptsDev);
  watch(imagesSrc, images);
  watch("src/images/svg/**/*.svg", svgSprites);
};

exports.build = series(
  clean,
  resources,
  htmlBuild,
  stylesBuild,
  helpersBuild,
  scriptsBuild,
  images,
  svgSprites
);
exports.dev = series(
  clean,
  resources,
  htmlDev,
  stylesDev,
  helpersDev,
  scriptsDev,
  images,
  svgSprites,
  watchFiles
);
exports.default = exports.dev;
