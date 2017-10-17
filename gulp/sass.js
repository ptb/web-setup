// -- imports ---------------------------------------------------------------

var css = require("./css")
var csscomb = require("gulp-csscomb")
var gulp = require("gulp")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var sass = require("gulp-sass")
var sassLint = require("gulp-sass-lint")
var util = require("./util")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(sass, opts.sass(min))
    .pipe(css.build(min, wrap))
}

var inspect = function inspect () {
  return lazypipe()
    .pipe(util.trim())
    .pipe(csscomb)
    .pipe(sassLint)
    .pipe(sassLint.format)
}

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .sass

// -- gulp ------------------------------------------------------------------

gulp.task("build:sass", function (done) {
  util.src(glob, true, build(false, false))
    .pipe(gulp.dest(opts.path.tmp))
  util.src(glob, true, build(true, false))
    .pipe(gulp.dest(opts.path.out))
  done()
})

gulp.task("watch:sass", function (done) {
  gulp.watch(glob, opts.watch)
    .on("all", function (evt, file) {
      if (["add", "change"].includes(evt)) {
        util.src(file, false, inspect())
          .pipe(gulp.dest(opts.path.src))
      }
    })
  done()
})

// -- exports ---------------------------------------------------------------

module.exports = {
  build,
  inspect
}
