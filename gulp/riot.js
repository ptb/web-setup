// -- imports ---------------------------------------------------------------

var concat = require("gulp-concat")
var es6 = require("./es6")
var gulp = require("gulp")
var js = require("./js")
var lazypipe = require("lazypipe")
var opts = require("./opts")
var path = require("path")
var rename = require("gulp-rename")
var riot = require("gulp-riot")
var sass = require("./sass")
var slim = require("./slim")
var streamqueue = require("streamqueue")
var svg = require("./svg")
var util = require("./util")

// -- functions -------------------------------------------------------------

var build = function build (min) {
  return lazypipe()
    .pipe(riot, opts.riot(min))
    .pipe(js.build(min, false))
}

var inspect = function inspect (base, file, min) {
  var dir = path.dirname(file)
  var tag = path.basename(dir)
    .split(".")[0]

  return streamqueue.obj(
      util.src(opts.glob(dir)
        .slim, false, slim.build(min, true)),
      util.src(opts.glob(dir)
        .svg, false, svg.build(min, true)),
      util.src(opts.glob(dir)
        .sass, false, sass.build(min, true)),
      util.src(opts.glob(dir)
        .es6, false, es6.build(min, true))
    )
    .pipe(concat(`${tag}${min ? ".min" : null}.tag`))
    .pipe(util.wrap(tag, min)())
    .pipe(rename({
      "dirname": path.relative(base, path.dirname(dir))
    }))
}

// -- variables -------------------------------------------------------------

var glob = opts.glob(opts.path.src)
  .riot

// -- gulp ------------------------------------------------------------------

gulp.task("build:riot", function (done) {
  util.src(glob, true, build(false))
    .pipe(gulp.dest(opts.path.tmp))
  util.src(glob, true, build(true))
    .pipe(gulp.dest(opts.path.out))
  done()
})

gulp.task("watch:riot", function (done) {
  gulp.watch(glob, opts.watch)
    .on("all", function (evt, file) {
      if (["add", "change"].includes(evt)) {
        inspect(opts.path.src, file, false)
          .pipe(gulp.dest(opts.path.src))
        inspect(opts.path.src, file, true)
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
