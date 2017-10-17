// -- imports ---------------------------------------------------------------

var gulpIf = require("gulp-if")
var htmlmin = require("gulp-htmlmin")
var htmltidy = require("gulp-htmltidy")
var indent = require("gulp-indent")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var rename = require("gulp-rename")
var w3cjs = require("gulp-w3cjs")

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(gulpIf, !wrap, rename(opts.rename))
    .pipe(gulpIf, !min, htmltidy(opts.htmltidy))
    .pipe(gulpIf, min, htmlmin(opts.htmlmin(min)))
    .pipe(gulpIf, wrap, indent())
}

var inspect = function inspect () {
  return lazypipe()
    .pipe(w3cjs)
}

// -- exports ---------------------------------------------------------------

module.exports = {
  build,
  inspect
}
