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
}

export function stopCopy() {
  const billingCity = document.getElementById('form-city') as HTMLInputElement;
  const shippingCity = document.getElementById('ship-city') as HTMLInputElement;
  if (billingCity && shippingCity) {
    billingCity.removeEventListener('input', inputEventHandler);
  }
}
