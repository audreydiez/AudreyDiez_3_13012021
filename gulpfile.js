const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

function scssTask(){
    return src('sass/main.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('public/css', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function watchTask(){
    watch('*.html', browsersyncReload);
    watch('restaurants/*.html', browsersyncReload);
    watch(['sass/**/*.scss'], series(scssTask, browsersyncReload));
}

exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
);