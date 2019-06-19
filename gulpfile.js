const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync');

gulp.task('develop', function(done){
    const stream = nodemon({ 
        script: 'server.js',
        ext: 'html liquid js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ],
        // tasks: ['watch'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'gamformation:*'
        },
        done: done
    });
    let started = false;

    stream.on('start', function(){
        console.log('tit');
        if(!started){
            started = true;
            browserSynStar();
        };
        watch(done);
        console.log('for tat');
    })
        .on('restart', function(){
            console.log('Restarted!');
        })
        .on('crash', function(){
            console.error('Application has crashed!\n');
            stream.emit('restart', 10);
        });
});

gulp.task('message', function(done){
    console.log('Task initiated');
    done();
});

// gulp.task('browser-sync', function(){
//     browserSync.init({
//         proxy: "http://localhost:3000",
//         port: 3001,
//         open: false,
//         notify: false,
//         logConnections: false,
//         reloadDelay: 1000,
//     });
// });

function browserSynStar(){
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 3001,
        open: false,
        notify: false,
        logConnections: false,
        reloadDelay: 1000,
    });
};

// gulp.task('watch', gulp.parallel(gulp.series('browser-sync', function(){
//     gulp.watch('src/scss/*.scss', gulp.series('sass'));
//     gulp.watch('src/partials/*.liquid', gulp.series('copyFiles', browserSync.reload))
//         .on('change', browserSync.reload);
//     gulp.watch('src/views/*.liquid', gulp.series('copyFiles', browserSync.reload))
//         .on('change', browserSync.reload);
//     })));
    
function watch(done){
    // browserSynStar();
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/partials/*.liquid', gulp.series('copyFiles', browserSync.reload))
        .on('change', browserSync.reload);
    gulp.watch('src/views/*.liquid', gulp.series('copyFiles', browserSync.reload))
        .on('change', browserSync.reload);
    done();
};

gulp.task('copyFiles', function(done){
    gulp.src('src/views/*.liquid')
        .pipe(gulp.dest('dist/views'));
    gulp.src('src/partials/*.liquid')
        .pipe(gulp.dest('dist/partials'));
    gulp.src('reset-css')
        .pipe(gulp.dest('dist/css'));
    done();
});

gulp.task('sass', function(done){
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('runThrough', function(done){
    gulp.series('message', 'copyFiles', 'sass');
    done();
});

gulp.task('default', gulp.parallel('develop'));