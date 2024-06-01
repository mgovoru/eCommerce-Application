import { userVariable } from '../userVariable';

export function deleteClassFromAllAddressContainers(classThis: string) {
  const AllAddresContainers = document.querySelectorAll('.page-profile__user-main__container');
  AllAddresContainers.forEach((e) => {
    // если функция вызываеться в момент загрузки страницы то она может обработать не все элементы
    e.classList.remove(classThis);
  });
}

export function changeBackgroundAdresses() {
  if (userVariable.isDefaultBilling) {
    deleteClassFromAllAddressContainers('pp__default-billing-addresse-status');
    deleteClassFromAllAddressContainers('pp__default-shipping-and-billing-status');
  }
  if (userVariable.isDefaultShipping) {
    deleteClassFromAllAddressContainers('pp__default-shipping-addresse-status');
    deleteClassFromAllAddressContainers('pp__default-shipping-and-billing-status');
  }
  // ниже кажеться лишняя проверка
  if (userVariable.isDefaultShipping && userVariable.isDefaultBilling) {
    deleteClassFromAllAddressContainers('pp__default-shipping-and-billing-status');
  }
}
