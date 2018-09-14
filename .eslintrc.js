module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'react-native'
  ],
  'ecmaFeatures': {
    'jsx': true
  },
  'env': {
    'react-native/react-native': true
  },
  'rules': {
    'no-use-before-define': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 1,
    'max-len': 1,
    'no-underscore-dangle': 1,
    'linebreak-style': 0,
    // React Native
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    // React
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 0,
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'render',
        'everything-else'
      ]
    }],
  },
};
