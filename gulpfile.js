var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify');
	imagemin = require('gulp-imagemin');
	pngquant = require('imagemin-pngquant');

// Minify CSS and store the minified CSS files in the dist folder
gulp.task('styles', function(){
	gulp.src('src/css/*.css')
		.pipe(minifyCSS())
		.pipe(rename(function(path){
			path.extname = ".min";
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({message: 'Gulp/Styles complete!'}));
});

// Minify images and store the minified versions in the dist folder
gulp.task('images', function(){
	gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({message: 'Gulp/Images complete!'}));
});

gulp.task('watch', function(){
	gulp.watch('src/css/*.css', ['styles']);
});

gulp.task('default', ['styles', 'watch', 'images']);
