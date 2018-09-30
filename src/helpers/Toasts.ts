import { Toast } from 'native-base';

export const showSuccessToast = (message: string) => {
  Toast.show({
    text: message,
    textStyle: { textAlign: 'center' },
    position: 'bottom',
    type: 'success',
  });
};

export const showFailureToast = (message: string) => {
  Toast.show({
    text: message,
    textStyle: { textAlign: 'center' },
    position: 'bottom',
    type: 'danger',
  });
};
