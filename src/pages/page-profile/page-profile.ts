import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './page-profile.scss';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-profile'],
};

export default class ProfilePageView extends View {
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
    containerNew.addNameClass('page-profile');
    const container = containerNew.getElement();
    this.viewElementCreator.append(container);
  }
}
