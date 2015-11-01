var bower = require('bower');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var minifyCss = require('gulp-minify-css');
var minimist = require('minimist');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sh = require('shelljs');
var connect = require('gulp-connect');

var knownOptions = {
  string: 'env',
  default: { env: process.env.CLIENT_NODE_ENV || 'development'} // 'development', 'production'
};

var options = minimist(process.argv.slice(2), knownOptions);

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/**/*.js']
};

gulp.task('serve', ['inject', 'watch'], function() {
  connect.server({
    root: 'www',
    port: 8100,
    livereload: true
  });
});

gulp.task('default', ['sass', 'config']);

gulp.task('reload', function () {
  gulp.src('./www/*')
    .pipe(connect.reload());
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('config', function () {
  gulp.src('configFile.json')
  .pipe(gulpNgConfig('freshFeast.config', { environment: options.env }))
  .pipe(gulp.dest('./www/js'))
});

gulp.task('watch', ['inject'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['inject']);
  gulp.watch(['./www/**/*'], ['reload']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('inject', function () {
  var target = gulp.src('./www/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./js/**/*.js', '!./js/**/*.min.js', './css/*.css', '!./css/*.min.css'], {read: false, 'cwd': './www'});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./www'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
