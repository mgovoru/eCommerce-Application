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

  const billingCountry = document.getElementById('form-country') as HTMLInputElement;
  const shippingCountry = document.getElementById('ship-country') as HTMLInputElement;
  function updateShipCountry() {
    shippingCountry.value = billingCountry.value;
    billingCountry.onchange = updateShipCountry;
  }
  updateShipCountry();
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

  const billingCountry = document.getElementById('form-country') as HTMLInputElement;
  billingCountry.onchange = null;
}
