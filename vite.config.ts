import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			src: resolve('src/'),
			'@': resolve('src/'),
		},
	},
	server: {
	  port: 3030,
	},
	build: {
		target: 'es2015', 
		polyfillDynamicImport: true, 
		outDir: 'dist', 
		assetsDir: '.', 
		sourcemap: true, /* Esta opción habilita la generación de mapas de origen para depurar el 
		código en el navegador. Los mapas de origen te permiten ver el código fuente original en 
		lugar del código compilado en el navegador, lo que facilita la depuración.*/
		minify: true, /* Esta opción habilita la minificación del código de salida para 
		reducir su tamaño y mejorar el rendimiento de tu aplicación */
		brotliSize: true, /* Esta opción habilita la compresión Brotli para reducir aún más el 
		tamaño del código de salida.*/
	},
})
