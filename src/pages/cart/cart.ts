import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import { Server } from '../../server/server';
import State from '../../state/state';
import './cart.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-cart'],
};

export default class CartView extends View {
  state: State;

  server: Server;

  constructor(server: Server, state: State) {
    super(mainParams);
    this.state = state;
    this.server = server;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-cart');
    const container = containerNew.getElement();
    const textBlock = this.drawElement({ tag: 'div', classNames: ['page-cart__text'] }, container);
    textBlock.textContent = 'page-cart';
    this.viewElementCreator.append(container);
    this.fetchCartItems();
  }

  async fetchCartItems() {
    try {
      if (!this.server.workApi?.userApi) {
        throw new Error('userApi is not initialized.');
      }

      const response = await this.server.workApi.userApi.apiRoot()?.me().activeCart().get().execute();
      return response?.body;
    } catch (err) {
      console.error('Error fetching cart items:', err);
      return null;
    }
  }
}
