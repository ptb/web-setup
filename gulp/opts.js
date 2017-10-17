// -- imports ---------------------------------------------------------------

var browserslist = require("browserslist")
var fs = require("fs")
var path = require("path")
var webpack = require("webpack")

// -- functions --------------------------------------------------------------

var opts = {
  "autoprefixer": function autoprefixer () {
    return {
      "browsers": this.browserslist,
      "cascade": false,
      "remove": true
    }
  },
  "babel": function babel (min) {
    return {
      "compact": min,
      "minified": min,
      "plugins": ["check-es2015-constants",
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping", "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-destructuring",
        "transform-es2015-duplicate-keys", "transform-es2015-for-of",
        "transform-es2015-function-name", "transform-es2015-literals",
        "transform-es2015-object-super", "transform-es2015-parameters",
        "transform-es2015-shorthand-properties",
        "transform-es2015-spread", "transform-es2015-sticky-regex",
        "transform-es2015-template-literals",
        "transform-es2015-typeof-symbol",
        "transform-es2015-unicode-regex", "transform-regenerator"]
    }
  },
  "browserslist": browserslist([">0.25% in my stats"], {
    "stats": ".caniuse.json"
  }),
  "changedInPlace": {
    "firstPass": true
  },
  "cssbeautify": {
    "autosemicolon": true,
    "indent": "  "
  },
  "csslint": {
    "adjoining-classes": false,
    "box-model": true,
    "box-sizing": false,
    "bulletproof-font-face": true,
    "compatible-vendor-prefixes": false,
    "display-property-grouping": true,
    "duplicate-background-images": true,
    "duplicate-properties": true,
    "empty-rules": true,
    "fallback-colors": true,
    "floats": true,
    "font-faces": true,
    "font-sizes": true,
    "gradients": true,
    "ids": true,
    "import": true,
    "important": true,
    "known-properties": true,
    "order-alphabetical": false,
    "outline-none": true,
    "overqualified-elements": true,
    "qualified-headings": true,
    "regex-selectors": true,
    "shorthand": true,
    "star-property-hack": true,
    "text-indent": true,
    "underscore-property-hack": true,
    "unique-headings": true,
    "universal-selector": true,
    "unqualified-attributes": true,
    "vendor-prefix": true,
    "zero-units": true
  },
  "cssnano": function cssnano () {
    return {
      "autoprefixer": {
        "add": true,
        "browsers": this.browserslist
      }
    }
  },
  "eslint": {
    "fix": true
  },
  "glob": function glob (base) {
    return {
      "css": path.join(base, "**", "*.css"),
      "es6": path.join(base, "**", "*.es?(6)"),
      "html": path.join(base, "**", "*.?(x)html"),
      "js": path.join(base, "**", "*.js"),
      "riot": path.join(base, "**", "*.riot", "*"),
      "sass": path.join(base, "**", "*.s@(a|c)ss"),
      "slim": path.join(base, "**", "*.sl?(i)m"),
      "svg": path.join(base, "**", "*.svg"),
      "tag": path.join(base, "**", "*.tag")
    }
  },
  "htmlmin": function htmlmin (min) {
    return {
      "collapseWhitespace": min,
      "keepClosingSlash": true,
      "minifyURLs": true,
      "removeComments": true,
      "removeScriptTypeAttributes": true,
      "removeStyleLinkTypeAttributes": true,
      "useShortDoctype": true
    }
  },
  "htmltidy": {
    "doctype": "html5",
    "indent": true,
    "indent-spaces": 2,
    "input-xml": true,
    "logical-emphasis": true,
    "new-blocklevel-tags": "",
    "output-xhtml": true,
    "quiet": true,
    "sort-attributes": "alpha",
    "tidy-mark": false,
    "wrap": 78
  },
  "jsbeautifier": {
    "js": {
      "file_types": [".es6", ".js", ".json"],
      "break_chained_methods": true,
      "end_with_newline": true,
      "indent_size": 2,
      "jslint_happy": true,
      "keep_array_indentation": true,
      "keep_function_indentation": true,
      "max_preserve_newlines": 2,
      "space_after_anon_function": true,
      "wrap_line_length": 78
    }
  },
  "path": {
    "cwd": process.cwd(),
    "out": path.join(process.cwd(), "docs"),
    "src": path.join(process.cwd(), "code"),
    "tmp": path.join(process.cwd(), "copy")
  },
  "rename": {
    "extname": ".xhtml"
  },
  "restart": {
    "args": ["-e", 'activate app "Terminal"', "-e",
      'tell app "System Events" to keystroke "k" using command down'],
    "files": ["config.rb", "gulpfile.js/*", "package.json", "yarn.lock"]
  },
  "riot": function riot (min) {
    return {
      "compact": min
    }
  },
  "sass": function sass (min) {
    return {
      "outputStyle": min ? "compressed" : "expanded"
    }
  },
  "slim": function slim (min) {
    return {
      "chdir": true,
      "options": ["attr_quote='\"'", `format=:${this.ext.html}`,
        "shortcut={ '.' => { attr: 'class' }, '@' => { attr: 'role' }, " +
        "'&' => { attr: 'type', tag: 'input' }, '#' => { attr: 'id' }, " +
        "'%' => { attr: 'itemprop' }, '^' => { attr: 'data-is' } }",
        "sort_attrs=true"],
      "pretty": !min,
      "require": "slim/include"
    }
  },
  "trimlines": {
    "leading": false
  },
  "uglify": function uglify (min) {
    return {
      "compress": {
        "warnings": false
      },
      "mangle": min,
      "output": {
        "beautify": !min,
        "comments": false,
        "indent_level": 2
      },
      "sourceMap": true
    }
  },
  "watch": {
    "ignoreInitial": false
  },
  "webpack": function (min) {
    return {
      "output": {
        "filename": "[name].js"
      },
      "plugins": [
        new webpack.SourceMapDevToolPlugin({
          "filename": "[name].map",
          "moduleFilenameTemplate": function (info) {
            if (!min && fs.existsSync(info.absoluteResourcePath)) {
              return `file://${encodeURI(info.absoluteResourcePath)}`
            }
            return `${path.basename(info.resourcePath)}?${info.hash}`
          }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin(this.uglify(min))
      ],
      "resolve": {
        "extensions": [".js", ".json"]
      }
    }
  }
}

// -- exports ---------------------------------------------------------------

module.exports = opts
