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
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'render',
        'everything-else'
      ]
    }],
    // React Native
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 1,
    // React
    'react/destructuring-assignment': 1,
  },
};
