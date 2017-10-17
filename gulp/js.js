// -- imports ---------------------------------------------------------------

var gulp = require("gulp")
var gulpIf = require("gulp-if")
var indent = require("gulp-indent")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var util = require("./util")
var webpack = require("webpack")
var webpackStream = require("webpack-stream")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(gulpIf, wrap, indent())
    .pipe(webpackStream, opts.webpack(min), webpack)
    .pipe(gulpIf, wrap, util.wrap("script", min)())
    .pipe(gulpIf, wrap, indent())
}

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .js

// -- gulp ------------------------------------------------------------------

gulp.task("build:js", function (done) {
  util.src(glob, true, build(false, false))
    .pipe(gulp.dest(opts.path.tmp))
  util.src(glob, true, build(true, false))
    .pipe(gulp.dest(opts.path.out))
  done()
})

// -- exports ---------------------------------------------------------------

module.exports = {
  build
}
