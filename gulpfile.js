var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    jsmin = require('gulp-jsmin');

gulp.task('browserify', function() {
    gulp.src('./src/js/cair.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['browserify']);

// Watcher Task
gulp.task('watch', function() {
    gulp.watch(['./src/js/**/*.js'], ['browserify']);
});