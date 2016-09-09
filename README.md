# Yet Another Elixir Typescript Task
Just another Laravel Elixir task to compile Typescript.

Designed in a similar fashion to other Elixir Tasks, such as the [Webpack Task][]. Supports compiling, minification (UglifyJS), concatenation, reading `tsconfig.json` for settings, and `gulp watch` support. Includes Table Summary steps (Mostly inherited), and success notification, listing "Source Files", and part support of "Destination File" (Only accurate when concatenating files)

Written in Typescript, for Typescript? :D

## Usage
#### Basic
```js
elixir(function(mix) {
  mix.typescript("app.ts")
})
```
This will take `resources/ts/app.ts`, run it through gulp-typescript, and put the output in `public/js/all.js`

#### Multiple files
```js
elixir(function(mix) {
  mix.typescript(["app.ts", "modules/my-module.ts"])
})
```
This will take `resources/ts/app.ts` and `resources/ts/modules/my-module.ts`, run them both through gulp-typescript, and put the output in `public/js/all.js`

#### Alternative Output
```js
elixir(function(mix) {
  mix.typescript("app.ts", "public/js/app.js")
})
```
This will take `resources/ts/app.ts`, run it through gulp-typescript, and put the output in `public/js/all.js`

#### Alternative Source Directory
```js
elixir(function(mix) {
  mix.typescript("app.ts", null, "src")
})
```
This will take `src/app.ts`, run it through gulp-typescript, and put the output in `public/js/all.js`

#### Typescript Compiler Options
```js
elixir(function(mix) {
  mix.typescript("app.ts", null, null, {
    module: "system"
  })
})
```
This will take `resource/ts/app.ts`, run it through gulp-typescript, and put the output in `public/js/all.js` in SystemJS module format

## Config Options
Accessed via `Elixir.config.ts.*`

| Key | Type | Description | Default Value |
| --- | --- | --- | --- |
folder|string|The folder within the `assetsPath` that your Typescript files reside in|ts
outputFolder|string|The folder within the `publicPath` that your Typescript files should end up in|js
concatFiles|boolean|Should files be concatenated into a single file? (If false, the output file in the call is ignored)|true
search|string|The search pattern for Typescript files within the `publicPath`|/\*\*/\*.ts

## Default Compiler Options
| Key | Value |
| --- | ----- |
target|ES5
module|commonjs
sortOutput|`Elixir.config.ts.concatFiles`

[Webpack Task]: (https://github.com/JeffreyWay/laravel-elixir-webpack-official/)
