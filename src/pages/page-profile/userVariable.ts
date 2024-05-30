interface UserDataInterface {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  currentPassword: string | undefined;
  newFirstNameInIput: string | undefined;
  newLastNameInIput: string | undefined;
  newDateOfBirth: string | undefined;
  newEmail: string;
  newPassword: string | undefined;
  newCountry: string | undefined;
  newPostalCode: string | undefined;
  newCity: string | undefined;
  newStreet: string | undefined;
}

export const userVariable: UserDataInterface = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  currentPassword: '',
  newFirstNameInIput: '',
  newLastNameInIput: '',
  newDateOfBirth: '',
  newEmail: '',
  newPassword: '',
  newPostalCode: '',
  newCity: '',
  newCountry: '',
  newStreet: '',
};
