// -- imports ---------------------------------------------------------------

var changedInPlace = require("gulp-changed-in-place")
var gulp = require("gulp")
var gulpIf = require("gulp-if")
var injectString = require("gulp-inject-string")
var kexec = require("kexec")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var spawn = require("child_process")
  .spawn
var trimlines = require("gulp-trimlines")

// -- functions -------------------------------------------------------------

var clean = function clean () {
  // console.log("clean")
}

var restart = function restart () {
  if (process.platform === "darwin") {
    spawn("osascript", opts.restart.args)
  }
  kexec(process.argv.shift(), process.argv)
}

var src = function (glob, ignore, func) {
  return gulp.src(glob, {
    "base": opts.path.src,
    "ignore": ignore ? opts.glob("")
        .riot : null
  })
    .pipe(func())
}

var trim = function trim () {
  return lazypipe()
    .pipe(changedInPlace, opts.changedInPlace)
    .pipe(trimlines, opts.trimlines)
}

var wrap = function wrap (el, min) {
  return lazypipe()
    .pipe(gulpIf, !min, injectString.prepend("\n"))
    .pipe(injectString.prepend, `<${el}>`)
    .pipe(injectString.append, `</${el}>`)
    .pipe(gulpIf, !min, injectString.append("\n"))
}

// -- exports ---------------------------------------------------------------

module.exports = {
  clean,
  restart,
  src,
  trim,
  wrap
}

// -- gulp ------------------------------------------------------------------

gulp.task("watch:restart", function (done) {
  gulp.watch(opts.restart.files)
    .on("change", function () {
      restart()
    })
  done()
})
