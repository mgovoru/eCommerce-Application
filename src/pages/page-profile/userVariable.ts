interface UserDataInterface {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  newFirstNameInIput: string | undefined;
  newLastNameInIput: string | undefined;
  newDateOfBirth: string | undefined;
  newEmail: string;
}

export const userVariable: UserDataInterface = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  newFirstNameInIput: '',
  newLastNameInIput: '',
  newDateOfBirth: '',
  newEmail: '',
};
