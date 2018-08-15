let gulp = require("gulp");

let server = require("gulp-webserver");

let fs = require("fs");

let path = require("path");

let url = require("url");

let querystring = require("querystring");

let sass = require("gulp-sass");

let minCss = require("gulp-clean-css");

let uglify = require("gulp-uglify");

gulp.task("server", () => {
    return gulp.src("src")
        .pipe(server({
            port: 8080,
            liveraload: true,
            middleware: (req, res, next) => {

                var pathname = url.parse(req.url).pathname;

                if (pathname === "/favicon.ico") {

                    res.end("")

                    return false;
                }
                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, msg: "list" }))
                } else {

                    pathname = /.html|.css|.js$/.test(pathname) ? pathname : "/index.html";

                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
});

gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});

gulp.task("dev", gulp.series("devCss", "server", "watch"));