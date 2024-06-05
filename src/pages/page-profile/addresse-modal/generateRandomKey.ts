export function generateRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const lengthKey = 16;
  let result = '';

  const array = new Uint32Array(lengthKey);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < lengthKey; i += 1) {
    result += characters.charAt(array[i] % charactersLength);
  }

  return result;
}
