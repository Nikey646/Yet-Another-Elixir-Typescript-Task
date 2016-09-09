export default class TypescriptTask extends Elixir.Task {

	private gulpIf
	private ts
	private fs
	private _

	constructor(name : string, paths : string[], private options : Object) {
		super(name, null, paths)
	}

	loadDependencies() {
		this.gulpIf = require("gulp-if")
		this.ts = require("gulp-typescript")
		this.fs = require("fs")
		this._ = require("lodash")
	}

	registerWatchers() {
		this.watch(this.src.baseDir + Elixir.config.ts.search)
			.ignore(this.output.path)
	}

	gulpTask() {
		return gulp.src(this.src.path)
			.pipe(this.initSourceMaps())
			.pipe(this.compile()) // Ignore errors, since Typescript still compiles by default
			.pipe(this.gulpIf(Elixir.config.ts.concatFiles, this.concat()))
			.pipe(this.minify())
			.on('error', this.onError())
			.pipe(this.writeSourceMaps())
			.pipe(this.saveAs(gulp))
			.pipe(this.onSuccess())
	}

	compile() {
		this.recordStep("Transforming Typescript")
		return this.ts(this.mergeOptions());
	}

	mergeOptions() {
		let defaults = {
				target: "ES5",
				module: "commonjs",
				sortOutput: Elixir.config.ts.concatFiles,
			},
			project = {}

		if (this.fs.existsSync("tsconfig.json"))
			project = this.ts.createProject("tsconfig.json");

		return this._.extend(defaults, project.config.compilerOptions, this.options);
	}

}
