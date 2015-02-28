var fs = require("fs");
var path = require("path");
var url = require("url");

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var _ = require('lodash');
var reload = browserSync.reload;

var options = _.assign({ debug: true }, watchify.args)
var bundler = watchify(browserify(['./ts/main.ts'], options));
bundler.transform(hbsfy);
bundler.plugin('tsify', {
    target: 'ES5',
    noImplicitAny: true
});

bundler.on('update', bundle_task); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle_task () {

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('dev.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

function replace_script (req, res, next) {
    var fileName = url.parse(req.url);
    fileName = fileName.href.split(fileName.search).join("");
    if (fileName.match(/^\/$/)) {
        console.log(fileName);
        res.end(fs.readFileSync('index.html').toString().replace(/dist\/index\.js/g, 'dist/dev.js'));
    }
    next();
}

gulp.task('watch', function () {
    browserSync({
        server: {
            baseDir: '.',
            middleware: replace_script,
        }
    });

    gulp.watch('scss/*.scss', ['css']);
    gulp.watch('*.html', {cwd: '.'}, reload);

    return bundle_task();
});

gulp.task('build', function () {
    browserify(['./ts/main.ts'])
        .transform(hbsfy)
        .plugin('tsify', {
            target: 'ES5'
        })
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

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
        .pipe(gulp.dest('./dist'))
        .pipe(reload({ stream:true }));
});

gulp.task('clean', function (cb) {
    del([
      'dist',
    ], cb);
});
