const gulp = require('gulp');
const cleanFolder = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
/**
 * To clean the dist folder
 * @param {*} callback
 */
function cleanDist(callback) {
  gulp.src('./dist/*').pipe(cleanFolder());
  callback();
}

/**
 *To convert to es5 and minify and store it in destination folder
 * @param {*} callback
 */
function createDist(callback) {
  gulp.src('src/*')
      .pipe(babel({
        presets: [
          [
            '@babel/env',
            {
              'targets': {
                'edge': '17',
                'firefox': '60',
                'chrome': '67',
                'safari': '11.1',
              },
            },
          ],
        ],
      }))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  callback();
}

exports.default = gulp.series(cleanDist, createDist);
