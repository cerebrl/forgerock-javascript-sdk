import { CallbackType } from '../auth/enums';
import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import TextOutputCallback from '../fr-auth/callbacks/text-output-callback';
import FRStep from '../fr-auth/fr-step';

abstract class FRQRCode {
  public static isQRCodeStep(step: FRStep) {
    const hiddenValueCb = step.getCallbacksOfType(CallbackType.HiddenValueCallback);

    // QR Codes step should have at least one HiddenValueCallback
    if (hiddenValueCb.length === 0) {
      return false;
    }
    return !!this.getQRCodeURICb(hiddenValueCb);
  }

  public static getQRCodeData(step: FRStep) {
    const hiddenValueCb = step.getCallbacksOfType(CallbackType.HiddenValueCallback);

    // QR Codes step should have at least one HiddenValueCallback
    if (hiddenValueCb.length === 0) {
      throw new Error(
        'QR Code step must contain a HiddenValueCallback. Use `FRQRCode.isQRCodeStep` to guard.',
      );
    }
    const qrCodeURICb = this.getQRCodeURICb(hiddenValueCb) as HiddenValueCallback | null;
    const outputValue = qrCodeURICb ? qrCodeURICb.getOutputValue('value') : '';
    const qrCodeUse =
      typeof outputValue === 'string' && outputValue.includes('otpauth://') ? 'otp' : 'push';

    const messageCbs = step.getCallbacksOfType(CallbackType.TextOutputCallback);
    const displayMessageCb = messageCbs.find((cb) => {
      const textOutputCallback = cb as TextOutputCallback;
      return textOutputCallback.getMessageType() !== '4';
    }) as TextOutputCallback | null;

    return {
      message: displayMessageCb ? displayMessageCb.getMessage() : '',
      use: qrCodeUse,
      uri: outputValue,
    };
  }

  private static getQRCodeURICb(hiddenValueCbs: HiddenValueCallback[]) {
    // Look for a HiddenValueCallback with an OTP URI
    return hiddenValueCbs.find((cb) => {
      const outputValue = cb.getOutputValue('value');

      if (typeof outputValue === 'string') {
        return outputValue?.includes('otpauth://') || outputValue?.includes('pushauth://');
      }
      return false;
    });
  }
}

export default FRQRCode;
