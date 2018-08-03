const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const removeHtmlComments = require('gulp-remove-html-comments');
const minHtml = require('gulp-htmlmin');
const concat = require('gulp-concat');

const paths = {
    root: './build',
    page: {
        src: './src/index.html'
    },
    php: {
        src: './src/server.php'
    },
    scss: {
        src: './src/scss/**/*.scss',
        main: './src/scss/main.scss',
        dest: './build/styles'
    },
    script: {
        src: './src/lib/*.js',
        dest: './build/lib'
    },
    img: {
        src: './src/img/**/*.*',
        dest: './build/img'
    },
    fonts: {
        src: './src/fonts/*.*',
        dest: './build/fonts'
    }
};

function clear() {
    return del(paths.root);
}

function html() {
    return gulp.src(paths.page.src)
        .pipe(removeHtmlComments())
        .pipe(minHtml({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.root))
}

function php() {
    return gulp.src(paths.php.src)
        .pipe(gulp.dest(paths.root))
}

function styles() {
    return gulp.src(paths.scss.main)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(paths.scss.dest))
}

function script() {
    return gulp.src(paths.script.src)
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.script.dest))
}

function img() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest))
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

function watch() {
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.page.src, html);
    gulp.watch(paths.php.src, php);
    gulp.watch(paths.script.src, script);
    gulp.watch(paths.scss.src, styles);
}

exports.clear = clear;
exports.html = html;
exports.styles = styles;
exports.fonts = fonts;
exports.img = img;
exports.script = script;
exports.php = php;

gulp.task('default', gulp.series(
    clear,
    gulp.parallel(html, script, styles),
    gulp.parallel(fonts, img, php),
    watch
));