const gulp = require("gulp");
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");
const nodemon = require('gulp-nodemon');

const SERVER_DIR_NAME = 'ibds';

// Compiles .ts scripts
gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(SERVER_DIR_NAME + "/dist"));
});

// Starts server
gulp.task("start", function() {
    nodemon({
        script: SERVER_DIR_NAME + '/dist/index.js',
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    });
});

// Watch .ts
gulp.task("watch",  gulp.series('default', function() {
    gulp.watch(SERVER_DIR_NAME + '/src/**/*.ts', function() {
        return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest(SERVER_DIR_NAME + "/dist"));
    });
}));
