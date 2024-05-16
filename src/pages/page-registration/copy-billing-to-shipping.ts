const inputEventHandlers: { [key: string]: () => void } = {};

function startCopy(billingAddrId: string, shippingAddrId: string) {
  const billingAddr = document.getElementById(billingAddrId) as HTMLInputElement;
  const shippingAddr = document.getElementById(shippingAddrId) as HTMLInputElement;

  if (billingAddr && shippingAddr) {
    const inputEventHandler = () => {
      shippingAddr.value = billingAddr.value;
    };
    inputEventHandlers[billingAddrId] = inputEventHandler;
    shippingAddr.value = billingAddr.value;
    billingAddr.addEventListener('input', inputEventHandler);
  }
}

export function copyBillingToShipping() {
  startCopy('form-city', 'ship-city');
  startCopy('form-street', 'ship-street');
  startCopy('form-postal', 'ship-postal');
}

export function stopCopy() {
  const billingAddrIds = Object.keys(inputEventHandlers);
  billingAddrIds.forEach((billingAddrId) => {
    const billingAddr = document.getElementById(billingAddrId) as HTMLInputElement;
    const inputEventHandler = inputEventHandlers[billingAddrId];
    if (billingAddr && inputEventHandler) {
      billingAddr.removeEventListener('input', inputEventHandler);
    }
  });
}
