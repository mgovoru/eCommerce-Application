import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './catalog.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-catalog', 'catalog'],
};

export default class CatalogView extends View {
  state: State;

  router: Router;

  server: Server;

  constructor(router: Router, state: State, server: Server) {
    super(mainParams);
    this.state = state;
    this.router = router;
    this.server = server;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-catalog');
    const container = containerNew.getElement();
    this.viewElementCreator.append(container);
  }
}
