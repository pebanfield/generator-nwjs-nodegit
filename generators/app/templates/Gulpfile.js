var NwBuilder = require('node-webkit-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var mocha = require('gulp-mocha');

gulp.task('nw', function () {

    var nw = new NwBuilder({
        version: '0.11.0',
        files: './nwapp/**',
        macIcns: './icons/icon.icns',
        macPlist: {mac_bundle_id: 'myPkg'},
        platforms: ['win32', 'win64', 'osx32', 'osx64']
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('test', ['runGyp'], function () {
  return gulp.src('./nwapp/test/parser-spec.js')
    .pipe(mocha());
});

gulp.task('runGyp', function(cb) {
  shell.task([
    'nw-gyp rebuild --target=0.12.2',
    'npm install'
  ]);
  cb();
});

gulp.task('default', ['runGyp','test', 'nw']);
