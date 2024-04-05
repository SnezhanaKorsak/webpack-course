import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ModuleOptions } from 'webpack';
import { BuildOptions } from '../types/';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { mode } = options;
    const isDev = mode === 'development';

    /** Для работы с модулями */
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                //название для классов в dev и prod сборках
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:5]',
            },
        },
    };

    /** Для настроек sass  */
    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    };

     /** Для интеграции TypeScript */
    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
    };

    /** Настройки для работы с изображениями */
    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    /** Настройки для работы с иконками */
    const svgLoader = {
        test: /\.svg$/i,
        use: [
            { 
                loader: '@svgr/webpack', 
                options: { icon: true } 
            }
        ],
    };
    
    return [
        assetsLoader, 
        svgLoader,
        cssLoader, 
        tsLoader,
    ];
}