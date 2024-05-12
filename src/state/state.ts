const KEY_FOR_SAVE_TO_LOCALSTORAGE = 'eCommerceApp';

export default class State {
  private fields: Map<string, string>;

  constructor() {
    this.fields = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  setField(name: string, value: string): void {
    this.fields.set(name, value);
  }

  getField(name: string): string {
    return this.fields.get(name) ?? '';
  }

  saveState(): void {
    const fieldsObject: Record<string, string> = Object.fromEntries(this.fields.entries());
    localStorage.setItem(KEY_FOR_SAVE_TO_LOCALSTORAGE, JSON.stringify(fieldsObject));
  }

  loadState(): Map<string, string> {
    const storageItem = localStorage.getItem(KEY_FOR_SAVE_TO_LOCALSTORAGE);
    if (storageItem) {
      const fieldObject: Record<string, string> = JSON.parse(storageItem);
      return new Map(Object.entries(fieldObject));
    }
    return new Map();
  }
}
