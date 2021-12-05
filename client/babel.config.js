module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        // modules: 'commonjs',
        useBuiltIns: "usage",
        targets:  "> 10%"
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
