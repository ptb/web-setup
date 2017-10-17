// -- imports ---------------------------------------------------------------

var autoprefixer = require("gulp-autoprefixer")
var cssbeautify = require("gulp-cssbeautify")
var csslint = require("gulp-csslint")
var cssnano = require("gulp-cssnano")
var gulpIf = require("gulp-if")
var indent = require("gulp-indent")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var util = require("./util")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(autoprefixer, opts.autoprefixer())
    .pipe(gulpIf, !min, cssbeautify(opts.cssbeautify))
    .pipe(gulpIf, !min, csslint(opts.csslint))
    .pipe(gulpIf, !min, csslint.formatter("compact"))
    .pipe(gulpIf, wrap, indent())
    .pipe(gulpIf, min, cssnano(opts.cssnano()))
    .pipe(gulpIf, wrap, util.wrap("style", min)())
    .pipe(gulpIf, wrap, indent())
}

// -- exports ---------------------------------------------------------------

module.exports = {
  build
}
