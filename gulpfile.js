//Import modules
var gulp = require('gulp');
var sass = require('gulp-sass');

//Paths
var paths = {
  styles: {
    src: 'stylesheets/sass',
    files: 'stylesheets/sass/**/*.scss',
    dest: 'stylesheets/'
  }
}

//Error handling
var displayError = function(error) {
  var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",'');

  if(error.fileName)
    errorString += ' in ' + error.fileName;

  if(error.lineNumber)
    errorString += ' on line ' + error.lineNumber;

  console.error(errorString);
}

gulp.task('sass', function () {
  gulp.src(paths.styles.files)
  .pipe(sass({
    outputStyle: 'compressed', //:nested, :compact, :expanded, :compressed
    sourceComments: 'map',
    includePaths : [paths.styles.src]
  }))
  .on('error', function(err){
    displayError(err);
  })
  .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('default', ['sass'], function() { 
  gulp.watch(paths.styles.files, ['sass'])
  .on('change', function(evt) {
    console.log(
      '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
    );
  });
});