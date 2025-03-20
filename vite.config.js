import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import babel from '@rollup/plugin-babel';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				clientsClaim: true,
				skipWaiting: true,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']
			},
		}),
		babel({
			babelHelpers: 'bundled',
			extensions: ['.js', '.jsx', '.ts', '.tsx']
		})
	],
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.js$/,
	},
	css: {
		preprocessorOptions: {
			css: {
				additionalData: `@import "./src/styles/global.css";`
			}
		}
	},
	build: {
		rollupOptions: {
			input: './src/index.js',
			output: {
				dir: 'dist',
				format: 'es'
			}
		}
	}
});
