var gulp           = require('gulp'),
    jade           = require('gulp-jade'),
    connect        = require('gulp-connect'),
    jshint         = require('gulp-jshint'),
    concat         = require('gulp-concat'),
    plumber        = require('gulp-plumber'),
    rjs            = require('gulp-requirejs'),
    LIB_FILES      = ['bower_components/phaser/build/phaser.min.js'],
    SCRIPT_FILES   = ['src/js/**/*.js'],
    STYLE_FILES    = ['src/css/**/*.css'],
    TEMPLATE_FILES = ['src/templates/**/*.jade'],
    ASSET_FILES    = ['src/assets/**/*'];

gulp.task('lint', function() {
    gulp.src(SCRIPT_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('requirejs', function() {
    gulp.src('bower_components/requirejs/require.js')
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task('libs', ['requirejs'], function() {
    gulp.src(LIB_FILES)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task('scripts', ['lint'], function() {
    rjs({
        baseUrl: 'src/js',
        name: 'main',
        out: 'main.js'
    })
    .pipe(gulp.dest('public/js'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
    gulp.src(STYLE_FILES)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});

gulp.task('templates', function () {
    gulp.src(TEMPLATE_FILES)
        .pipe(jade())
        .pipe(gulp.dest('public'))
        .pipe(connect.reload());
});

gulp.task('assets', function () {
    gulp.src(ASSET_FILES)
        .pipe(gulp.dest('public/assets'))
        .pipe(connect.reload());
});

gulp.task('watch', ['build'], function () {
    gulp.watch(SCRIPT_FILES, ['scripts']);
    gulp.watch(STYLE_FILES, ['styles']);
    gulp.watch(TEMPLATE_FILES, ['templates']);
    gulp.watch(ASSET_FILES, ['assets']);
});

gulp.task('server', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('build', ['templates', 'scripts', 'styles', 'libs', 'assets']);

gulp.task('default', ['watch', 'server']);
