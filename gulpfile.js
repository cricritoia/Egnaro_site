const { src, dest, watch, parallel } = require ( 'gulp');

// css
const sass = require ('gulp-sass') (require ('sass'));
const plumber = require ('gulp-plumber');
const cssnano = require ('cssnano');
const autoprefixer = require ('autoprefixer');
const postcss = require ('gulp-postcss');
const sourcemaps = require ('gulp-sourcemaps');

//imágenes
const cache = require ('gulp-cache');
const imagemin = require ('gulp-imagemin');
const webp = require ( 'gulp-webp');
const avif = require ('gulp-avif');

function css ( done ) {
    src ("src/scss/**/*.scss") // identifica el archivo
    .pipe (sourcemaps.init())
    .pipe (plumber()) // permite que el workflow no se detenga por errores
    .pipe (sass())  // lo compila
    .pipe (postcss([autoprefixer(), cssnano()]))
    .pipe (sourcemaps.write('.'))
    .pipe (dest('build/img'))  // lo almacena en el disco duro
    done()  // callback que avisa a gulp que llegamos al final
}

function imagenes (done) {
    const opciones = {
        optimizationLevel: 3
    };
    src ('src/img**/*.{png,jpg}')
    .pipe (cache (imagemin (opciones) ) )
    .pipe (dest ('build/img'))
    done();
}

function versionWebp (done) {
    const opciones = {
        quality : 50
    };
    src('src/img**/*.{png,jpg}')
    .pipe (webp(opciones))
    .pipe ( dest ('build/img'))
    done();
}

function versionAvif (done) {
    const opciones = {
        quality : 50
    };
    src('src/img**/*.{png, jpg}')
    .pipe (avif (opciones))
    .pipe ( dest ('build/img'))
    done();
}

function dev ( done ) {    
    watch ("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, dev);
