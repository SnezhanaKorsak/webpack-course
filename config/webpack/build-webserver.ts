import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from '../types/';

export function buildDevServer(options: BuildOptions): WebpackDevServerConfiguration {
    const { port } = options;

    return {
        port: port || 3000,
        open: true,
        historyApiFallback: true,
    };
};