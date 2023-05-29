import { buildCssLoader } from './loaders/buildCssLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import type { RuleSetRule } from 'webpack'
import type { BuildOptions } from './types/config'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
	const { isDev } = options

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	}

	const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
	const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

	const cssLoader = buildCssLoader(isDev)

	const fileLoader = {
		test: /\.(|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	}

	return [fileLoader, svgLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader]
}
