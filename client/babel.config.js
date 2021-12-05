module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        // modules: 'commonjs',
        useBuiltIns: "entry",
      },
    ],
    [
      '@babel/preset-react',
      {
        development: true,
      },
    ],
  ],
};
