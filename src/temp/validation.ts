export class RegistrationValidation {
  constructor() {}
  validMail(str: string): boolean {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // (буквы или цифры или ._%+-) + (@) + (буквы или цифры или .-) + (.) + (мин. 2 буквы)
    return emailValid.test(str);
  }
  validPassword(str: string): boolean {
    const passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    // минимум 1 маленькая буква, 1 большая, 1 цифра. минимум 8 символов. Принимает Англ буквы, цифры, спецсимволы.
    return passValid.test(str);
  }
  validFirstAndLastName(str: string): boolean {
    const firstLastNameValid = /^[a-zA-Z]+$/;
    // Как минимум 1 буква англ алфавита
    return firstLastNameValid.test(str);
  }
  validBirthDate(str: string): boolean {
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;
    // формат dd.mm.yyyy
    if (!dateFormatRegex.test(str)) {
      console.log('Не верный формат даты');
      return false;
    }
    const parts = str.split('.');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const birthDate = new Date(year, month, day);
    console.log(birthDate);
    const currentDate = new Date();
    let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      ageDifference -= 1;
    }
    return ageDifference >= 13;
  }
  validStrit(str: string): boolean {
    const regex = /^[0-9a-zA-Z-]+$/;
    // минимум 1 символ. допустимые англ буквы, чилса и -
    return regex.test(str);
  }
  validCity(str: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    // минимум 1 символ. допустимы только англ буквы
    return regex.test(str);
  }
}
