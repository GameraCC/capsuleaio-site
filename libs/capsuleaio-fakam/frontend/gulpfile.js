'use strict'

const gulp = require("gulp"),
      uglify = require('gulp-uglify-es').default,
      babel = require('gulp-babel'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      javascriptObfuscator = require('gulp-javascript-obfuscator'),
      obfuscatorOptions = {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        shuffleStringArray: true,
        simplify: true,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
    }

gulp.task('polyfill', () => {
    const cacheBust = Math.random().toString(36).slice(2)
    return gulp
        .src(['../node_modules/babel-polyfill/dist/polyfill.min.js', './build/fakam.obfuscated.no_polyfill.js'])
        .pipe(concat(`fakam.${cacheBust}.js`))
        .pipe(gulp.dest('../../../capsuleaio-site/public/'))
})

gulp.task('obfuscate', () => {
    return gulp
        .src('./src/app.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(rename('fakam.obfuscated.no_polyfill.js'))
        .pipe(javascriptObfuscator(obfuscatorOptions))
        .pipe(gulp.dest('./build/'))
})

gulp.task('build', gulp.series('obfuscate', 'polyfill'))

gulp.task('default', gulp.task('build'))
