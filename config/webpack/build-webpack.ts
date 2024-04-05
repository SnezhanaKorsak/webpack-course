import { buildLoaders } from './build-loaders';
import { buildDevServer } from './build-webserver';
import { buildPlugins } from './build-plugins';
import { buildResolves } from './build-resolves';

import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from '../types/';

type Configuration = WebpackConfiguration & {devServer?: WebpackDevServerConfiguration};

export function buildWebpack(options: BuildOptions): Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        /** Режим разработки */
        mode: mode || 'development',
        /** Путь до входного файла */
        entry: paths.entry,
         /** Настройки для loaders */
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolves(options),
         /** Определяет, будут ли создаваться source maps и каким образом */
        devtool: isDev ? 'inline-source-map' : false,
        /** Настройки для сервера */
        devServer: isDev ? buildDevServer(options) : undefined,
        /** Директория, в которую помещаются скомпилированные вебпаком файлы */
        output: {
            path: paths.output,
            filename: '[name].[contenthash:8].js',
            clean: true,
        },
         /**  Настройки для плагинов */
        plugins: buildPlugins(options),
    };
};
