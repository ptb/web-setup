// -- imports ---------------------------------------------------------------

var flatmap = require("gulp-flatmap")
var gulp = require("gulp")
var html = require("./html")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var slim = require("gulp-slim")
var spawn = require("child_process")
  .spawn
var util = require("./util")

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .slim

// -- functions -------------------------------------------------------------

var build = function build (min, wrap) {
  return lazypipe()
    .pipe(slim, opts.slim(min))
    .pipe(html.build(min, wrap))
}

var inspect = function inspect () {
  return lazypipe()
    .pipe(util.trim())
    .pipe(function () {
      flatmap(function (stream, file) {
        spawn("slim-lint", [file.path], {
          "stdio": "inherit"
        })
        return stream
      })
    })
}

// -- gulp ------------------------------------------------------------------

gulp.task("watch:slim", function (done) {
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
