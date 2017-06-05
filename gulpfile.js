var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('.'))
});

gulp.task('scripts', function() {
  return gulp.src(['js/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',['styles']);
    gulp.watch('js/**/*.js',['scripts']);
});