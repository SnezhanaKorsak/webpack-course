import path from 'path';

import { buildWebpack } from './config/webpack/build-webpack';

import { BuildPaths, BuildMode, BuildPlatform } from './config/types/';


type EnvVariables = {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
};

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }
    
    const config = buildWebpack({
        port: env.port || 3000,
        paths,
        mode: env.mode || 'development',
        analyzer: env.analyzer,
        platform: env.platform || 'desktop',
    });

    return config;
};
