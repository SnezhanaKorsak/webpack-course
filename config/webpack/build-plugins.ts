import webpack, { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { Configuration } from 'webpack';
import { BuildOptions } from '../types/';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const { mode, paths, analyzer, platform } = options;
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    let plugins: Configuration['plugins'] = [
        /** Сгенерирует  HTML5-файл, содержащий все пакеты webpack в теле, используя теги скрипта */
        new HtmlWebpackPlugin({ template: paths.html }),
        /** Заменяет переменные в коде другими значениями или выражениями во время компиляции.  */
        new DefinePlugin({
            PLATFORM: JSON.stringify(platform),
        }),
    ];

    if(isDev) {
        plugins = [
            ...plugins,
            /** Предоставляет способ настройки того, как будет отображаться прогресс во время компиляции */
            new webpack.ProgressPlugin(),
            /** Выносит проверку типов в оидельный процесс и не нагружает сборку */
            new ForkTsCheckerWebpackPlugin()
        ]
    };

    if(isProd) {
        plugins = [
            ...plugins, 
            /**  Извлекает CSS в отдельные файлы */
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
        }),
    ]
    };

    if(analyzer) {
        plugins = [
            ...plugins,
            /**  Визуализирует размер выходных файлов webpack с помощью интерактивной масштабируемой древовидной карты */
            new BundleAnalyzerPlugin(),
        ]
    };

    return plugins;
};
