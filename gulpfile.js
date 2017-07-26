var gulp = require('gulp')
var postcss = require('gulp-postcss')
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
	var processors=[]
	//Esto lo que hace es leer todos los archivo css que esten en src que es donde estaran los archivos de desarrollo
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('.dist/css'))//Funcion que hace que el los archivos ya procesados los deje en la carpeta del proyecto de produccion
		.pipe(browserSync.stream())
})
//Tarea para vigilar los cambios
gulp.task('watch',function(){
	gulp.watch('./src/*.css',['css'])//Lo que hace esto es que esta vigilando todos los archivos de la carpeta src y cada vez que tengan un cambio le pase la tarea css
})
