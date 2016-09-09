var elixir	= require("laravel-elixir"),
	path 	= require("path")

require("./dist/index")

elixir.config.assetsPath = "src"
elixir.config.publicPath = "dist"
elixir.config.ts.folder = ""
elixir.config.ts.outputFolder = ""

elixir(function(mix) {
	mix.typescript([
		"TypescriptTask.ts",
		"index.ts",
	], path.join(Elixir.config.get("public.ts.outputFolder"), "index.js"))
})
