#!/bin/sh
CWD="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
EXT="xhtml"
GULP="${CWD}/gulp"
PROJ="$(basename -- "${CWD}")"
SITE="ptb2.me"

cd "${CWD}"
mkdir -p "${GULP}"

yarn add --dev \
  frankwallis/gulp-hub#4.1.1 \
  gulpjs/gulp#4.0 \
  npm-run-all

yarn add --dev \
  browserslist

yarn add --dev \
  gulp-changed-in-place \
  gulp-if \
  gulp-inject-string \
  gulp-trimlines \
  kexec \
  lazypipe

yarn add --dev \
  gulp-if \
  gulp-htmlmin \
  gulp-indent \
  gulp-rename \
  gulp-htmltidy \
  gulp-w3cjs \
  lazypipe

yarn add --dev \
  gulp-flatmap \
  gulp-slim \
  lazypipe

gem install \
  slim_lint

yarn add --dev \
  gulp-htmltidy \
  gulp-if \
  gulp-indent \
  gulp-svgmin \
  lazypipe

yarn add --dev \
  gulp-autoprefixer \
  gulp-cssbeautify \
  gulp-csslint \
  gulp-cssnano \
  gulp-if \
  gulp-indent \
  lazypipe

yarn add --dev \
  gulp-csscomb \
  gulp-sass \
  gulp-sass-lint \
  lazypipe

yarn add --dev \
  gulp-if \
  gulp-indent \
  lazypipe \
  webpack-stream \
  webpack

yarn add --dev \
  babel-core \
  eslint

yarn add --dev \
  babel-preset-env \
  eslint-plugin-json \
  eslint-plugin-promise \
  eslint-plugin-standard \
  gulp-babel \
  gulp-eslint \
  gulp-if \
  gulp-jsbeautifier \
  lazypipe

yarn add \
  riot

yarn add --dev \
  gulp-concat \
  gulp-rename \
  gulp-riot \
  lazypipe \
  streamqueue

mkdir -p "${CWD}/code" "${CWD}/code/css" "${CWD}/code/fonts" \
  "${CWD}/code/img" "${CWD}/code/js" "${CWD}/code/_" "${CWD}/copy" \
  "${CWD}/data" "${CWD}/docs" "${CWD}/lib" "${CWD}/logs"

printf "%s\n" '*' '!.gitignore' > "${CWD}/copy/.gitignore"
touch "${CWD}/code/.keep" "${CWD}/docs/.keep"
