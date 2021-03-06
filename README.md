# Butternut

The fast, future-friendly minifier

*Warning: this is alpha software. Test thoroughly before using in production! Consider using the [check option](#the-check-option). Please report any bugs you find!*


## Why?

Butternut is significantly faster than other JavaScript minifiers, and works with the latest version of JavaScript (ES2015, aka ES6, and beyond). It's typically around 4x faster than UglifyJS and 10-15x faster than Babili.

The compression is better than Babili and Closure Compiler (in standard compilation mode — you can get better results with Closure in advanced mode, but only by writing your code in a very particular way). It's *almost* as good as Uglify in its current version.

You can test out the different tools with `npm run bench`.

*Note: UglifyJS supports ES2015+ as of very recently — see [uglify-es](https://www.npmjs.com/package/uglify-es).*


## How?

The traditional approach to minification is this: parse your source code into an abstract syntax tree (AST) using something like [Acorn](https://github.com/ternjs/acorn), manipulate the AST, and finally generate code from it.

Butternut takes a different approach. It uses Acorn to generate an AST, but instead of steps 2 and 3 it then edits the code *in place* using [magic-string](https://github.com/Rich-Harris/magic-string) — which is much less costly than AST manipulation and code generation.


## Usage

The easiest way to use Butternut is to plug it into your existing build process:

* [rollup-plugin-butternut](https://github.com/rollup/rollup-plugin-butternut)

Alternatively, you can use it directly via the CLI or the JavaScript API:


### Command Line Interface

Install Butternut globally, then use the `squash` command:

```bash
npm install --global butternut # or npm i -g butternut
squash app.js > app.min.js
```

Run `squash --help` to see the available options.


### JavaScript API

Install Butternut to your project...

```bash
npm install --save-dev butternut # or npm i -D butternut
```

...then use it like so:

```js
const butternut = require('butternut');
const { code, map } = butternut.squash(source, options);
```

The `options` argument, if supplied, is an object that can have the following properties:

* `sourceMap` — set to `false` if you don't want to generate a sourcemap. Defaults to `true`
* `file` — the destination filename, used in sourcemap generation
* `source` — the source filename, used in sourcemap generation
* `includeContent` — whether to include the original source in the sourcemap. Defaults to `true`
* `check` — see [below](#the-check-option)


### The `check` option

Since Butternut is a new project, it hasn't yet been battle-tested. It *may* generate code that you don't expect. If you pass `check: true` (or use the `--check` flag, if using the CLI), Butternut will parse the generated output to verify that it is valid JavaScript. If not, it means it's messed something up, in which case it will try to help you find the code that it failed to minify correctly.

If you find bugs while using Butternut, please raise an issue!


## License

[MIT](LICENSE)