import ElementCreator from './element-creator';
export default class View {
  constructor(params = { tag: 'section', classNames: [] }) {
    this.viewElementCreator = this.createView(params);
  }

  getHtmlElement() {
    return this.viewElementCreator.getElement();
  }

  createView(params) {
    const elementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: '',
      callback: null,
    };
    this.viewElementCreator = new ElementCreator(elementParams);

    return this.viewElementCreator;
  }
}
