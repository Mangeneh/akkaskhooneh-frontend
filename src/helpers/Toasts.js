import { Toast } from 'native-base';

export function showSuccessToast(message) {
  Toast.show({
    text: message,
    textStyle: { textAlign: 'center' },
    position: 'bottom',
    type: 'success',
  });
}

export function showFailureToast(message) {
  Toast.show({
    text: message,
    textStyle: { textAlign: 'center' },
    position: 'bottom',
    type: 'danger',
  });
}
