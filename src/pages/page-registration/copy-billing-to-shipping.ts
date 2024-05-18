import { onIputCheck, idShipping, patternsShipping, errorShipping } from './on-input-function';

function checkShippingField() {
  for (let i = 0; i < 3; i += 1) {
    const idInMassiv = Object.values(idShipping[i])[0];
    const patternInMassiv = Object.values(patternsShipping[i])[0];
    const errorInMassiv = Object.values(errorShipping[i])[0];
    onIputCheck(idInMassiv, patternInMassiv, errorInMassiv);
  }
}

const inputEventHandlers: { [key: string]: () => void } = {};

function startCopy(billingAddrId: string, shippingAddrId: string) {
  const billingAddr = document.getElementById(billingAddrId) as HTMLInputElement;
  const shippingAddr = document.getElementById(shippingAddrId) as HTMLInputElement;
  shippingAddr.disabled = true; // отключаю поля

  if (billingAddr && shippingAddr) {
    const inputEventHandler = () => {
      shippingAddr.value = billingAddr.value;
      checkShippingField();
    };
    inputEventHandlers[billingAddrId] = inputEventHandler;
    shippingAddr.value = billingAddr.value;
    billingAddr.addEventListener('input', inputEventHandler);
  }
  checkShippingField();
}

function disabledFalse(idElement: string) {
  const element = document.getElementById(idElement) as HTMLInputElement;
  element.disabled = false;
}

export function copyBillingToShipping() {
  startCopy('form-city', 'ship-city');
  startCopy('form-street', 'ship-street');
  startCopy('form-postal', 'ship-postal');

  const billingCountry = document.getElementById('form-country') as HTMLInputElement;
  const shippingCountry = document.getElementById('ship-country') as HTMLInputElement;
  shippingCountry.disabled = true; // отключаю поля
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
  disabledFalse('ship-country'); // включаю поля
  disabledFalse('ship-city');
  disabledFalse('ship-street');
  disabledFalse('ship-postal');
}
