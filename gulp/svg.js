// -- imports ---------------------------------------------------------------

var gulp = require("gulp")
var gulpIf = require("gulp-if")
var htmltidy = require("gulp-htmltidy")
var indent = require("gulp-indent")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var svgmin = require("gulp-svgmin")
var util = require("./util")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(util.trim())
    .pipe(gulpIf, min, svgmin())
    .pipe(gulpIf, wrap, indent())
}

var inspect = function inspect () {
  return lazypipe()
    .pipe(util.trim())
    .pipe(htmltidy(opts.htmltidy))
}

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .svg

// -- gulp ------------------------------------------------------------------

gulp.task("build:svg", function (done) {
  util.src(glob, true, build(false, false))
    .pipe(gulp.dest(opts.path.tmp))
  util.src(glob, true, build(true, false))
    .pipe(gulp.dest(opts.path.out))
  done()
})

gulp.task("watch:svg", function (done) {
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
