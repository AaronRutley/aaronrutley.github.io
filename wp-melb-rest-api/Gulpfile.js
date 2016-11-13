var gulp = require('gulp');
// var sass = require('gulp-sass');
// var jshint = require('gulp-jshint');
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
// var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

// options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

//error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

var livereloadPage = function () {
   // Reload the whole page
   livereload.reload();
 };

// gulp.task('sass', function () {
//   gulp.src('./assets/scss/**/*.scss')
//     .pipe(plumber(plumberErrorHandler))
//     //.pipe(sourcemaps.init())
//     .pipe(sass(sassOptions))
//     //.pipe(sourcemaps.write('./maps/'))
//     .pipe(gulp.dest('./assets/css/'))
//     .pipe(livereload());
// });


// gulp.task('js', function () {
// 	//gulp.src(['./assets/js/jquery.mmenu.min.all.js','./assets/js/jquery.matchHeight.js','./assets/js/master.js'])
//   gulp.src(['./assets/js/master.js'])
//     .pipe(plumber(plumberErrorHandler))
//     .pipe(concat('concat.js'))
//     .pipe(gulp.dest('assets/js'))
//     .pipe(rename('uglify.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('assets/js/'));
// });


gulp.task('watch', function() {
  // live reload listen
  livereload.listen();
  // Watch SCSS changes.
  //gulp.watch('./assets/scss/**/*.scss', ['sass']);
  // Watch js changes.
  //gulp.watch('./assets/js/*.js', ['js']);
  // Watch php changes.
  gulp.watch('./index.html', livereloadPage);
});

gulp.task('default', ['watch']);
