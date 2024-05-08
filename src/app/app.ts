import { FooterView } from '../components/footer/footer';
import { HeaderView } from '../components/header/header';
import { MainView } from '../components/main/main';

export class App {
  header: HeaderView | null;

  footer: FooterView | null;

  main: MainView | null;

  constructor() {
    this.header = null;
    this.main = null;
    this.footer = null;
  }

  createView() {
    this.header = new HeaderView();
    this.main = new MainView();
    this.footer = new FooterView();
    document.body.append(this.header.getElement());
    document.body.append(this.main.getElement());
    document.body.append(this.footer.getElement());
  }
}
