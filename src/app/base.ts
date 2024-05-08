import { Params } from './type';

export class ElementCreator {
  protected node: HTMLElement;

  constructor(p: Params) {
    const node = document.createElement(p.tag ?? 'div');
    this.node = node;
    if (p.textContent) {
      this.setTextContent(p.textContent);
    }
    if (p.classNames) {
      this.setCssClasses(p.classNames);
    }
    if (p.callback) {
      this.setCallback(p.callback);
    }
  }

  setCssClasses(cssClasses: Array<string> = []) {
    cssClasses.forEach((cssClass) => this.node.classList.add(cssClass));
  }

  setTextContent(text = '') {
    this.node.textContent = text;
  }

  setCallback(callback: (event: Event) => void): void {
    this.node.addEventListener('click', callback);
  }

  public append(child: ElementCreator | HTMLElement): void {
    if (child instanceof ElementCreator) {
      this.node.append(child.getNode());
    } else this.node.append(child);
  }

  public getNode() {
    return this.node;
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public setValue(value: string) {
    if (this.node instanceof HTMLInputElement) {
      this.node.value = value;
    }
  }

  addInnerElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      this.node.append(element.getNode());
    } else {
      this.node.append(element);
    }
  }

  setType(type: string) {
    (this.getNode() as HTMLInputElement).type = type;
  }
}
