const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

gulp.task('serve', () => {
  browserSync.init({
    server: { baseDir: './dist' },
    open: 'external'
  });

  gulp.watch('./scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch(['./dist/**/*.html', './dist/**/*.js'])
    .on('change', browserSync.reload);
});

gulp.task('scss', () => {
  const browsers = ['last 2 version', 'ie >= 11',];
  const plugins = [
    autoprefixer({ browsers }),
    mqpacker(),
    cssnano({ autoprefixer: false }),
  ];
  return gulp.src('./scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve'));