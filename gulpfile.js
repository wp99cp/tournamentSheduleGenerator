var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    htmlmin = require('gulp-html-minifier'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    fileinclude = require('gulp-file-include'),
    removeHtmlComments = require('gulp-remove-html-comments'),
    uncss = require('gulp-uncss'),
    fs = require('fs'),
    rcs = require('rename-css-selectors'),
    minify = require('gulp-minify-css');

// BrwoserSync
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});


var src = "./src/",
    dist = './dist/';

gulp.task('cls', function() {
    gulp.src(dist + '*.html', {
            force: true
        })
        .pipe(plumber()) // Error Handeling
        .pipe(clean());
});


gulp.task('html', function() {
    gulp.src(src + 'html/*.html')
        .pipe(plumber()) // Error Handeling
        .pipe(removeHtmlComments())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());

});

// ######################################
// Minify SASS
gulp.task('sass', function() {
    var htmlFiles = fs.readdirSync(dist);
    //  htmlFiles = htmlFiles.map(el => dist + el);


    //  htmlFiles = htmlFiles.filter(el => el.includes('.html'));

    console.log(htmlFiles);

    gulp.src(src + 'assets/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(plumber()) // Error Handeling
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({
            basename: 'style'
        }))
        //  .pipe(uncss({            html: htmlFiles        }))
        .pipe(cleanCSS())
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'templates/zh11/css'))
        .pipe(browserSync.stream());


});

// ######################################
// Minify JS
gulp.task('js', function() {
    gulp.src(src + 'assets/js/*.js')
        .pipe(plumber()) // Error Handeling
        .pipe(sourcemaps.init())
        .pipe(concat('global.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        // NOTE: Only use for extren libraries
        //          .pipe(browserify({insertGlobals: true,debug: !gulp.env.production }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'templates/zh11/js'))
        .pipe(browserSync.stream());

});

// ######################################
// Minify JS
gulp.task('js_singleUse', function() {
    gulp.src(src + 'assets/js/singleUse/*.js')
        .pipe(plumber()) // Error Handeling
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        // NOTE: Only use for extren libraries
        //          .pipe(browserify({insertGlobals: true,debug: !gulp.env.production }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'templates/zh11/js'))
        .pipe(browserSync.stream());

});


gulp.task('reduce', function() {

    rcs.loadMapping(dist + 'renaming_map.json');

    try {
        rcs.processCssSync(dist + 'templates/tpl_zh11/css/*.css');
        rcs.processSync([dist + 'templates/tpl_zh11/js/*.js', dist + '*.html']);
        rcs.generateMappingSync(dist, {
            overwrite: true
        });
    } catch (error) {
        console.log(error);
    }

});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch([src + 'html/*.html'], ['html']);

    // NOTE: ONLY FOR HTML MODULES
    gulp.watch([src + 'html/htmlModules/*.html'], ['html']);

    gulp.watch([src + 'assets/sass/*.sass'], ['sass']);
    gulp.watch(['./src/assets/js/*.js'], ['js']);
    gulp.watch(['./src/assets/js/singleUse/*.js'], ['js_singleUse']);

});

// ######################################
// FILE WATCH
gulp.task('default', ['cls', 'sass', 'js', 'html', 'watch', 'js_singleUse']);
