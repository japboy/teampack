const preset = {
  env: {
    es5: {
      presets: [
        [
          require('@vue/babel-preset-app').default,
          {
            targets: {
              Chrome: '41',
              Explorer: '11',
            },
          },
        ]
      ],
    },
  },
  env: {
    es2015: {
      presets: [
        [
          require('@vue/babel-preset-app').default,
          {
            targets: '> 5% in JP',
          },
        ]
      ],
    },
  },
};

module.exports = preset;
