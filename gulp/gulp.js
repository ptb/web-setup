// -- imports ---------------------------------------------------------------

var GulpHub = require("gulp-hub")
var gulp = require("gulp")

// -- gulp ------------------------------------------------------------------

gulp.registry(new GulpHub("./*.js"))
gulp.task("build", gulp.parallel("build:es6", "build:js", "build:riot",
  "build:sass", "build:svg"))
gulp.task("default", gulp.parallel("watch:es6", "watch:riot", "watch:sass",
  "watch:slim", "watch:svg"))
