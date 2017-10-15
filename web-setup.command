#!/bin/sh
CWD="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

create () {
  test -d "$(dirname -- "$1")" || \
    mkdir -p "$(dirname -- "$1")"
  tee "${CWD}/$1" <<< $2 > /dev/null
}

yarn add --dev \
  "babel-cli" \
  "babel-core" \
  "babel-preset-env" \
  "frankwallis/gulp-hub#4.1.1" \
  "gulpjs/gulp#4.0" \
  "npm-run-all"

create ".babelrc" "$(cat << 'EOF'
{
  "presets": ["env"]
}
EOF
)"

create "gulp/index.js" "$(cat << 'EOF'
// -- imports ---------------------------------------------------------------

import GulpHub from "gulp-hub"
import gulp from "gulp"

// -- gulp ------------------------------------------------------------------

gulp.registry(new GulpHub("./*.js"))

gulp.task("default", (done) => {
  done()
})
EOF
)"
