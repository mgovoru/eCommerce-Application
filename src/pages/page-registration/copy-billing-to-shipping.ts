let inputEventHandler: () => void;

export function copyBillingToShipping() {
  const billingCity = document.getElementById('form-city') as HTMLInputElement;
  const shippingCity = document.getElementById('ship-city') as HTMLInputElement;
  if (billingCity && shippingCity) {
    inputEventHandler = () => {
      shippingCity.value = billingCity.value;
    };
    shippingCity.value = billingCity.value;
    billingCity.addEventListener('input', inputEventHandler);
  }

  const billingStreet = document.getElementById('form-street') as HTMLInputElement;
  const shippingStreet = document.getElementById('ship-street') as HTMLInputElement;
  if (billingStreet && shippingStreet) {
    inputEventHandler = () => {
      shippingStreet.value = billingStreet.value;
    };
    shippingStreet.value = billingStreet.value;
    billingStreet.addEventListener('input', inputEventHandler);
  }

  const billingPostal = document.getElementById('form-postal') as HTMLInputElement;
  const shippingPostal = document.getElementById('ship-postal') as HTMLInputElement;
  if (billingPostal && shippingPostal) {
    inputEventHandler = () => {
      shippingPostal.value = billingPostal.value;
    };
    shippingPostal.value = billingPostal.value;
    billingPostal.addEventListener('input', inputEventHandler);
  }
}

export function stopCopy() {
  const billingCity = document.getElementById('form-city') as HTMLInputElement;
  const shippingCity = document.getElementById('ship-city') as HTMLInputElement;
  if (billingCity && shippingCity) {
    billingCity.removeEventListener('input', inputEventHandler);
  }

  const billingStreet = document.getElementById('form-street') as HTMLInputElement;
  const shippingStreet = document.getElementById('ship-street') as HTMLInputElement;
  if (billingStreet && shippingStreet) {
    billingStreet.removeEventListener('input', inputEventHandler);
  }

  const billingPostal = document.getElementById('form-postal') as HTMLInputElement;
  const shippingPostal = document.getElementById('ship-postal') as HTMLInputElement;
  if (billingPostal && shippingPostal) {
    billingPostal.removeEventListener('input', inputEventHandler);
  }
}
