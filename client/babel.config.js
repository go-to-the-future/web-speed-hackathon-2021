module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        // modules: 'commonjs',
        useBuiltIns: "usage",
        targets:  "> 2%"
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
