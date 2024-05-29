interface UserDataInterface {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  newFirstNameInIput: string | undefined;
  newLastNameInIput: string | undefined;
  newDateOfBirth: string | undefined;
}

export const userVariable: UserDataInterface = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  newFirstNameInIput: '',
  newLastNameInIput: '',
  newDateOfBirth: '',
};
