interface UserDataInterface {
  firstName: string | undefined;
  lastName: string | undefined;
  newFirstNameInIput: string | undefined;
  newLastNameInIput: string | undefined;
}

export const userVariable: UserDataInterface = {
  firstName: '',
  lastName: '',
  newFirstNameInIput: '',
  newLastNameInIput: '',
};
