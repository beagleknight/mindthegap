var gulp           = require('gulp'),
    clean          = require('gulp-clean'),
    jade           = require('gulp-jade'),
    connect        = require('gulp-connect'),
    concat         = require('gulp-concat'),
    LIB_FILES      = ['bower_components/phaser/build/phaser.min.js', 'node_modules/systemjs/dist/system.js'],
    STYLE_FILES    = ['src/css/reset.css', 'src/css/**/*.css'],
    TEMPLATE_FILES = ['src/templates/**/*.jade'],
    ASSET_FILES    = ['src/assets/**/*'],
    PUBLIC_FILES   = ['public/**/*'];

gulp.task('clean', function () {
    return gulp.src('public', { read: false })
        .pipe(clean());
});

gulp.task('libs', function() {
    gulp.src(LIB_FILES)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
    gulp.src(STYLE_FILES)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('templates', function () {
    gulp.src(TEMPLATE_FILES)
        .pipe(jade())
        .pipe(gulp.dest('public'));
});

gulp.task('assets', function () {
    gulp.src(ASSET_FILES)
        .pipe(gulp.dest('public/assets'));
});

gulp.task('reload', function () {
    gulp.src(PUBLIC_FILES)
        .pipe(connect.reload());
});

gulp.task('watch', ['build'], function () {
    gulp.watch(STYLE_FILES, ['styles']);
    gulp.watch(TEMPLATE_FILES, ['templates']);
    gulp.watch(ASSET_FILES, ['assets']);
    gulp.watch(PUBLIC_FILES, ['reload']);
});

gulp.task('server', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('build', ['templates', 'styles', 'libs', 'assets']);

gulp.task('dev', ['watch', 'server']);

gulp.task('default', ['dev']);
