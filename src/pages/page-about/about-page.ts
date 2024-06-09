import './about-page.scss';
import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import { ElementCreator } from '../../app/base';

const mainParams = {
  tag: 'section',
  textContent: '',
  classNames: ['page-about'],
};

export default class AboutPageView extends View {
  state: State;

  constructor(state: State) {
    super(mainParams);
    this.state = state;
    this.configureView();
  }

  configureView() {
    const containerNew = new ContainerView();
    containerNew.addNameClass('page-about');
    const container = containerNew.getElement();
    this.viewElementCreator.append(container);
    this.title(container);
    this.teamMemberUnitContainer(container);
  }

  title(container: HTMLElement) {
    const title = new ElementCreator({
      tag: 'div',
      textContent: 'About Us',
      classNames: ['page-about__title'],
    });
    container.appendChild(title.getNode());
  }

  teamMemberUnitContainer(container: HTMLElement) {
    const cont = new ElementCreator({
      tag: 'div',
      classNames: ['page-about__member-unit-container'],
    });
    container.appendChild(cont.getNode());
    this.teamMemberUnit(
      cont,
      'Maria Govorukhina',
      'https://github.com/mgovoru',
      'https://avatars.githubusercontent.com/u/98209094?v=4'
    );
    this.teamMemberUnit(
      cont,
      'Maria Klyass',
      'https://github.com/mariaklyass',
      'https://avatars.githubusercontent.com/u/110608602?v=4'
    );
    this.teamMemberUnit(
      cont,
      'Sergey Melnechuk',
      'https://github.com/lex010',
      'https://avatars.githubusercontent.com/u/127429514?v=4'
    );
  }

  teamMemberUnit(container: ElementCreator, memberName: string, gitOfMember: string, fotoOfMember: string) {
    const cont = new ElementCreator({
      tag: 'div',
      classNames: ['page-about__member-unit'],
    });
    const name = new ElementCreator({
      tag: 'a',
      textContent: memberName,
      classNames: ['page-about__member-unit_name'],
    });
    name.getNode().setAttribute('href', gitOfMember);
    name.getNode().setAttribute('target', '_blanck');

    const foto = new ElementCreator({
      tag: 'img',
      classNames: ['page-about__member-unit_foto'],
    });
    foto.getNode().setAttribute('alt', `${memberName} foto`);
    foto.getNode().setAttribute('src', fotoOfMember);
    // foto.getNode().setAttribute('src', 'https://avatars.githubusercontent.com/u/98209094?v=4');

    container.addInnerElement(cont);
    cont.addInnerElement(name);
    cont.addInnerElement(foto);
  }
}
