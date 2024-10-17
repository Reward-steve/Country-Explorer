const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
	return src("src/Scss/index.scss").pipe(sass()).pipe(dest("css"));
}

function watchTask() {
	watch(["src/Scss/index.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
