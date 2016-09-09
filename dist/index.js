"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypescriptTask = (function (_super) {
    __extends(TypescriptTask, _super);
    function TypescriptTask(name, paths, options) {
        _super.call(this, name, null, paths);
        this.options = options;
    }
    TypescriptTask.prototype.loadDependencies = function () {
        this.gulpIf = require("gulp-if");
        this.ts = require("gulp-typescript");
        this.fs = require("fs");
        this._ = require("lodash");
    };
    TypescriptTask.prototype.registerWatchers = function () {
        this.watch(this.src.baseDir + Elixir.config.ts.search)
            .ignore(this.output.path);
    };
    TypescriptTask.prototype.gulpTask = function () {
        return gulp.src(this.src.path)
            .pipe(this.initSourceMaps())
            .pipe(this.compile())
            .pipe(this.gulpIf(Elixir.config.ts.concatFiles, this.concat()))
            .pipe(this.minify())
            .on('error', this.onError())
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess());
    };
    TypescriptTask.prototype.compile = function () {
        this.recordStep("Transforming Typescript");
        return this.ts(this.mergeOptions());
    };
    TypescriptTask.prototype.mergeOptions = function () {
        var defaults = {
            target: "ES5",
            module: "commonjs",
            sortOutput: Elixir.config.ts.concatFiles,
        }, project = {};
        if (this.fs.existsSync("tsconfig.json"))
            project = this.ts.createProject("tsconfig.json");
        return this._.extend(defaults, project.config.compilerOptions, this.options);
    };
    return TypescriptTask;
}(Elixir.Task));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TypescriptTask;

"use strict";
Elixir.config.ts = {
    folder: "ts",
    outputFolder: "js",
    concatFiles: true,
    search: "/**/*.ts"
};
Elixir.extend("typescript", function (scripts, output, baseDir, options) {
    new TypescriptTask("typescript", getPaths(scripts, baseDir, output), options);
});
function getPaths(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || Elixir.config.get("assets.ts.folder"))
        .output(output || Elixir.config.get("public.ts.outputFolder"), "all.js");
}
exports.getPaths = getPaths;

//# sourceMappingURL=index.js.map
