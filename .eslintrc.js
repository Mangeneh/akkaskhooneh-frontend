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
  },
};
