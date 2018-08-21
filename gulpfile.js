let gulp = require("gulp");

let server = require("gulp-webserver");

let fs = require("fs");

let path = require("path");

let url = require("url");

let querystring = require("querystring");

let sass = require("gulp-sass");

let minCss = require("gulp-clean-css");

let autoprefixer = require('gulp-autoprefixer');

let uglify = require("gulp-uglify");

let mock = require("./mock")

gulp.task("server", () => {

    return gulp.src("src")

    .pipe(server({
        port: 8080,
        liveraload: true,
        middleware: (req, res, next) => {

            var pathname = url.parse(req.url).pathname;



            if (pathname === "/favicon.ico" || pathname === "/js/libs/swiper.min.js.map") {

                res.end("")

                return false;
            }
            if (/^\/api/.test(pathname)) {

                let decoded = decodeURI(req.url);

                res.end(JSON.stringify({ code: 1, msg: mock(decoded) }))

            } else {

                pathname = /\.html|\.css|\.js|\.png|\.jpg$/.test(pathname) ? pathname : "/index.html";

                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
            }
        }
    }))
});

gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});

gulp.task("dev", gulp.series("devCss", "server", "watch"));