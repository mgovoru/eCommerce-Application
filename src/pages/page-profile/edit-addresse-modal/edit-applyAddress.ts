import { userVariable } from '../userVariable';
import { patterns, error } from '../../page-registration/on-input-function';

function checkThisInput(pattern: RegExp, inpVal: string, errElem: HTMLElement, errMessage: string) {
  const err = errElem;
  if (pattern.test(inpVal)) {
    err.textContent = '';
  } else {
    err.textContent = errMessage;
  }
}

export function applyAddressButton(callback: () => void) {
  const countrySelect = document.getElementById('id-coutry-modal__pp') as HTMLInputElement | null;
  const countrySelectValue = countrySelect?.value;

  const postalInput = document.getElementById('id-postal-modal__pp') as HTMLInputElement | null;
  const postalInputValue = postalInput?.value;
  const erPost = postalInput?.nextElementSibling as HTMLElement;

  const cityInput = document.getElementById('id-city-modal__pp') as HTMLInputElement | null;
  const cityInputValue = cityInput?.value;
  const erCity = cityInput?.nextElementSibling as HTMLElement;

  const streetInput = document.getElementById('id-street-modal__pp') as HTMLInputElement | null;
  const streetInputValue = streetInput?.value;
  const erStreet = streetInput?.nextElementSibling as HTMLElement;

  const patternPostal = Object.values(patterns[8])[0];
  const errorPostal = Object.values(error[8])[0];
  const patternCity = Object.values(patterns[7])[0];
  const errorCity = Object.values(error[7])[0];
  const patternStreet = Object.values(patterns[6])[0];
  const errorStreet = Object.values(error[6])[0];

  checkThisInput(patternPostal, postalInputValue || '', erPost, errorPostal);
  checkThisInput(patternCity, cityInputValue || '', erCity, errorCity);
  checkThisInput(patternStreet, streetInputValue || '', erStreet, errorStreet);
  // сверяю введенное в поле ввода с патерном
  if (
    patternPostal.test(postalInputValue || '') &&
    patternCity.test(cityInputValue || '') &&
    patternStreet.test(streetInputValue || '')
  ) {
    userVariable.newCountry = countrySelectValue;
    userVariable.newPostalCode = postalInputValue;
    userVariable.newCity = cityInputValue;
    userVariable.newStreet = streetInputValue;
    callback();
  }
}
