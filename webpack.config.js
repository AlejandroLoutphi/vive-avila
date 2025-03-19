const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    // Entry point of your application
    entry: './src/index.js',
    // Output configuration
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    // Module rules
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    // Plugins
    plugins: [
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
};
