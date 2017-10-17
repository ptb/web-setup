// -- imports ---------------------------------------------------------------

var babel = require("gulp-babel")
var eslint = require("gulp-eslint")
var gulp = require("gulp")
var gulpIf = require("gulp-if")
var js = require("./js")
var jsbeautifier = require("gulp-jsbeautifier")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var util = require("./util")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(babel, opts.babel(min))
    .pipe(gulpIf, !min, jsbeautifier(opts.jsbeautifier))
    .pipe(gulpIf, !min, eslint(opts.eslint))
    .pipe(js.build(min, wrap))
}

var inspect = function inspect () {
  return lazypipe()
    .pipe(util.trim())
    .pipe(jsbeautifier, opts.jsbeautifier)
    .pipe(jsbeautifier.reporter)
    .pipe(eslint, opts.eslint)
    .pipe(eslint.format)
}

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .es6

// -- gulp ------------------------------------------------------------------

gulp.task("build:es6", function (done) {
  util.src(glob, true, build(false, false))
    .pipe(gulp.dest(opts.path.tmp))
  util.src(glob, true, build(true, false))
    .pipe(gulp.dest(opts.path.out))
  done()
})

gulp.task("watch:es6", function (done) {
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
