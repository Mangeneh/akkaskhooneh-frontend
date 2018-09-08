import { StyleSheet } from 'react-native';
import { Colors, PageModes } from '../config';

export const ButtonStyle = StyleSheet.create({
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

export function chooseStyle(mode) {
  const {
    LOADING, ERROR, DISABLED, SUCCESS,
  } = PageModes;
  switch (mode) {
    case LOADING:
      return ButtonStyle.loadingStyle;
    case ERROR:
      return ButtonStyle.errorStyle;
    case DISABLED:
      return ButtonStyle.disabledStyle;
    case SUCCESS:
      return ButtonStyle.successStyle;
    default:
      return ButtonStyle.normalStyle;
  }
}
