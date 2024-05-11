import View from '../view';
// import './not-found.css';

const CssClasses = {
  ERROR: 'not-found',
};
const TEXT_LOGIN = 'HERE IS OUR LOGIN PAGE';

export default class LoginView extends View {
  constructor() {
    /**
     * @type {import('../../view').ViewParams}
     */
    const params = {
      tag: 'section',
      classNames: [CssClasses.ERROR],
    };
    super(params);
    this.configureView();
  }

  configureView() {
    this.viewElementCreator.setTextContent(TEXT_LOGIN);
  }
}