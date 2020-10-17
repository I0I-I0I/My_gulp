var syntax         = 'sass', // Syntax: sass or scss;
		gulpVersion    = '4'; // Gulp version: 3 or 4
		gmWatch        = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

var gulp          = require('gulp')
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
        del           = require('del');// Local Server
		notify        = require('gulp-notify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
        autoprefixer  = require('gulp-autoprefixer');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		//online: false,
		// open: false,
		// Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html', )
	.pipe(browserSync.reload({ stream: true }))
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});



if (gulpVersion == 4) {

	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch('app/*.html', gulp.parallel('code'));
	});
	gmWatch ? gulp.task('default', gulp.parallel('styles', 'browser-sync', 'watch')) 
					: gulp.task('default', gulp.parallel('styles', 'browser-sync', 'watch'));

};

