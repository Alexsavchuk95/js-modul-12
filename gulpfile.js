const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

const cssFiles = [
    './src/css/reset.css',
    './src/css/main.css'
]

const jsScripts = [
    './src/js/script.js'
]

//Таск на стили CSS
function styles(){
    return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

//Таск на срипты JS
function scripts(){
    return gulp.src(jsScripts)
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// Таск на сервер
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/css/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles',styles);
gulp.task('scripts',scripts);
gulp.task('watch', watch);
