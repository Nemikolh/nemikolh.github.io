var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var reload = browserSync.reload;

var bundler = watchify(browserify('./ts/main.ts', watchify.args));

bundler.plugin('tsify', {
    target: 'ES5'
});

bundler.on('update', bundle_task); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle_task () {

  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('css', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
             // Will generate several css file per scss file
             // that does not start with '_'
            .pipe(sass())
            //.pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('.'))
        .pipe(reload({ stream:true }));
});

gulp.task('watch', function () {
    browserSync({
      server: {
        baseDir: '.'
      }
    });

    gulp.watch('scss/*.scss', ['css']);
    gulp.watch('*.html', {cwd: '.'}, reload);

    return bundle_task();
});

gulp.task('clean', function (cb) {
    del([
      'dist',
    ], cb);
});
