var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssnext = require('postcss-cssnext')
//var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var lost = require('lost')
var atImport = require('postcss-import')
var csswring = require('csswring')
var browserSync = require('browser-sync').create()//Para inicializar

//Inicializar Servidor de web
gulp.task('serve', function(){
	browserSync.init({
		server:{
			baseDir:'./dist'//Ruta raiz del sitio
		}
	})
})
//Tarea que procesa los archivos de css
gulp.task('css',function(){
	//Esto es lo que se ejecutara antes de enviar al destino el archivo css
	var processors=[
		/*autoprefixer({
			browsers:['>5%','ie 8']//lo que hace esto es colocar los prefijos para los navegadores que se usen mas del 5%, ademas da soporte a internet explorer 8+
		}),*///Este es para los prefijos
		atImport(),//Para importar archivos css
		mixins(),//Este es para que maneje mixins que son como funciones que pueden tener parametros, esto lo que hace es que si tengo varios estilos muy parecidos que solo cambian los valores de algunas propiedades entonces lo que hago es un mixin
		cssnested, //Este es para que maneje una sintaxis como la de los preprocesadores en el caso de anidar estilos sin tener que escribir varias veces el mismo selector
		lost(),//Este se maneja para manejar grillas de una forma mas facil pues este crea los calculos segun las grillas que nosotros deseamos(recordar que el standar es que una pantalla se divida en 12 grillas)
		cssnext({browsers:['>5%','ie 8']}),//Para usar css del futuro, con lo que por ejemplo, ya no haria falta los prefijos
		csswring(),//Es para minifica el css

	]
	//Esto lo que hace es leer todos los archivo css que esten en src que es donde estaran los archivos de desarrollo
	return gulp.src('./src/invie.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dist/css'))//Funcion que hace que el los archivos ya procesados los deje en la carpeta del proyecto de produccion
		.pipe(browserSync.stream())
})
//Tarea para vigilar los cambios
gulp.task('watch',function(){
	gulp.watch('./src/*.css',['css'])//Lo que hace esto es que esta vigilando todos los archivos css de la carpeta src y cada vez que tengan un cambio le pase la tarea css
	gulp.watch('./dist/*.html').on('change', browserSync.reload)//Lo que hace esto es que esta vigilando todos los archivos html de la carpeta y cada vez que tengan un cambio recargue el navegador
})
//Tarea por defecto que se ejecuta
gulp.task('default',['watch','serve'])