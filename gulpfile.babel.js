import gulp from 'gulp';
import concat from 'gulp-concat';
import del from 'del';
import gutil from 'gulp-util';
import ngTemplates from 'gulp-angular-templatecache';
import sass from 'gulp-sass';
import sequence from 'gulp-sequence';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	dirs: {
		dist: 'dist',
		images: "src/images/**/*.{png,svg}",
		lib: "dist/lib",
		script: "src/app/**/*.js",
		style: "src/style/**/*.scss",
		template: "src/templates/**/*.html"
	},

	libs: [
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js'
	],

	watch: {
		interval: 800
	}
};

const catchError = (error, graceful) => {
	gutil.log(gutil.colors.magenta(error));
	if (graceful) {
		this.emit('end');
	}
};

/**
 * @task clean
 *
 * Delete previously built content
 */
gulp.task('clean', () => del(config.dirs.dist));

/**
 * @task libs
 *
 * Copy all vendor dependencies
 */
gulp.task('libs', (cb) => gulp.src(config.libs)
	.pipe(gulp.dest(config.dirs.lib))
);

/**
 * @task styles
 *
 * Copy image assets across
 */
gulp.task('images', () => gulp.src(config.dirs.images)
	.pipe(gulp.dest(config.dirs.dist))
);

/**
 * @task scripts
 *
 * Build the scripts
 */
gulp.task('scripts', () => gulp.src(config.dirs.script)
	.pipe(sourcemaps.init())
	.pipe(concat('app.js'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.dirs.dist))
);

/**
 * @task styles
 *
 * Build the styles
 */
gulp.task('styles', () => gulp.src(config.dirs.style)
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(config.dirs.dist))
);

/**
 * @task templates
 *
 * Build the templates
 */
gulp.task('templates', () => {
	return gulp.src(config.dirs.template)
		.pipe(ngTemplates({
			module: 'app',
			moduleSystem: 'IIFE',
			transformUrl: url => `/templates/${url}`
		}).on('error', catchError))
		.pipe(gulp.dest(config.dirs.dist));
});


/**
 * @task watch
 *
 * Watch for changes
 */
gulp.task('watch', () => {
	gulp.watch(config.dirs.images, config.watch, ['images']);
	gulp.watch(config.dirs.script, config.watch, ['scripts']);
	gulp.watch(config.dirs.style, config.watch, ['styles']);
});


/**
 * @task build
 *
 * Rebuild the project
 */
gulp.task('build', (cb) => sequence.apply(this, ['images', 'scripts', 'styles', 'templates', cb]));

/**
 * @task dist
 *
 * Complete build the dist BB widget
 */
gulp.task('default', ['clean'], (cb) => sequence.apply(this, ['libs', 'build', cb]));