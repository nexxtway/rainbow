const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const extractSass = new ExtractTextPlugin({
    filename : 'styles/rainbow.css'
});

module.exports = {
    entry: ['./src/index.js', './src/main.scss'],
    output: {
        filename: 'scripts/main.js',
        path: path.resolve('styleguide')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: extractSass.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        extractSass,
        new WebpackShellPlugin({
            onBuildStart:['npm run styleguide']
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "styleguide"),
        compress: true,
        port: 9000,
        hot: true
    }
};
