module.exports = {
    presets: ['@babel/preset-react'],
    compact: false, // Disable compact mode for all files
    overrides: [
        {
            test: /node_modules[\\/]firebase[\\/]/,
            compact: true, // Enable compact mode for Firebase files
        },
    ],
};
