import { StyleSheet } from 'react-native';
import { Colors, PageModes } from '../config';

export const buttonStyle = StyleSheet.create({
  normalStyle: {
    alignSelf: 'center',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 16,
    width: 300,
    height: 50,
    backgroundColor: Colors.ACCENT,
    borderRadius: 10,
  },
  loadingStyle: {
    alignSelf: 'center',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 16,
    width: 300,
    height: 50,
    backgroundColor: Colors.ACCENT,
    borderRadius: 10,
  },
  errorStyle: {
    alignSelf: 'center',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 15,
    width: 300,
    height: 50,
    backgroundColor: Colors.ERROR,
    borderRadius: 10,
  },
  disabledStyle: {
    alignSelf: 'center',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 16,
    width: 300,
    height: 50,
    backgroundColor: Colors.DISABLED,
    borderRadius: 10,
  },
  successStyle: {
    alignSelf: 'center',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 16,
    width: 300,
    height: 50,
    backgroundColor: Colors.SUCCESS,
    borderRadius: 10,
  },
});

export const chooseStyle = (mode: PageModes) => {
  const {
    LOADING, ERROR, DISABLED, SUCCESS,
  } = PageModes;
  switch (mode) {
    case LOADING:
      return buttonStyle.loadingStyle;
    case ERROR:
      return buttonStyle.errorStyle;
    case DISABLED:
      return buttonStyle.disabledStyle;
    case SUCCESS:
      return buttonStyle.successStyle;
    default:
      return buttonStyle.normalStyle;
  }
};
