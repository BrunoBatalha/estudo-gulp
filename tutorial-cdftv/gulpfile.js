var gulp = require("gulp");
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var webserver = require("gulp-webserver");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var babel = require("gulp-babel");

// Source path
var js_src = "./src/js/*.js";

// Dist path
var js_dist = "./js/";
var js_dist_name = "scripts.js";

// Minify e Concat Scripts
gulp.task("scripts", function () {
  return (
    gulp
      .src(js_src)
      // .pipe(sourcemaps.init())
      .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(plumber())
      .pipe(uglify())
      .pipe(concat(js_dist_name))
      .pipe(gulp.dest(js_dist))
  );
});

// watch
gulp.task("watch", function () {
  gulp.watch([js_src], gulp.series("scripts"));
});

// webserver
gulp.task("webserver", () => {
  gulp.src("./").pipe(
    webserver({
      fallback: "index.html",
      port: "3333",
      livereload: true,
      open: true,
    })
  );
});

gulp.task("default", gulp.series(gulp.parallel("webserver", "watch")));
