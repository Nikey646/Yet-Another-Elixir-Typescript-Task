Elixir.config.ts = {
	folder: "ts",
	outputFolder: "js",
	concatFiles: true,
	search: "/**/*.ts"
}

Elixir.extend("typescript", function(scripts, output, baseDir, options) {
	new TypescriptTask("typescript", getPaths(scripts, baseDir, output), options)
})

export function getPaths(src, baseDir, output) {
	return new Elixir.GulpPaths()
		.src(src, baseDir || Elixir.config.get("assets.ts.folder"))
		.output(output || Elixir.config.get("public.ts.outputFolder"), "all.js")
}
