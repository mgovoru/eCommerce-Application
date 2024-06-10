import './about-page.scss';
import { View } from '../../app/view';
import { ContainerView } from '../../components/container/container';
import State from '../../state/state';
import { ElementCreator } from '../../app/base';
import imageSrc from '../../assets/rs_school_js.svg';

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
    this.logoAndText(container);
    this.teamMemberUnitContainer(container);
    this.effectiveTeamCollaboration(container);
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
      'https://avatars.githubusercontent.com/u/98209094?v=4',
      'Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text.'
    );
    this.teamMemberUnit(
      cont,
      'Maria Klyass',
      'https://github.com/mariaklyass',
      'https://avatars.githubusercontent.com/u/110608602?v=4',
      'Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text. Just a text.'
    );
    this.teamMemberUnit(
      cont,
      'Sergey Melnechuk',
      'https://github.com/lex010',
      'https://avatars.githubusercontent.com/u/127429514?v=4',
      'I am 31 years old, and this is my first experience working in a team in this field. I started getting interested in programming just over a year ago. In this project, I worked on the registration page, login page, and the "About Us" page.'
    );
  }

  teamMemberUnit(
    container: ElementCreator,
    memberName: string,
    gitOfMember: string,
    fotoOfMember: string,
    textAboutMember: string
  ) {
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

    const fotoLink = new ElementCreator({
      tag: 'a',
      classNames: ['member-unit_foto-link'],
    });
    fotoLink.getNode().setAttribute('href', gitOfMember);
    fotoLink.getNode().setAttribute('target', '_blanck');

    const foto = new ElementCreator({
      tag: 'img',
      classNames: ['page-about__member-unit_foto'],
    });
    foto.getNode().setAttribute('alt', `${memberName} foto`);
    foto.getNode().setAttribute('src', fotoOfMember);

    const aboutMember = new ElementCreator({
      tag: 'div',
      textContent: textAboutMember,
      classNames: ['page-about__member-unit_text-about-member'],
    });

    container.addInnerElement(cont);
    cont.addInnerElement(name);
    cont.addInnerElement(fotoLink);
    fotoLink.addInnerElement(foto);
    cont.addInnerElement(aboutMember);
  }

  effectiveTeamCollaboration(container: HTMLElement) {
    const cont = new ElementCreator({
      tag: 'div',
      classNames: ['page-about__cont-team-coll'],
    });
    const title = new ElementCreator({
      tag: 'div',
      textContent: 'Effective Team Collaboration',
      classNames: ['page-about__title-team-coll'],
    });
    const text = new ElementCreator({
      tag: 'div',
      textContent: `Our team collaborated effectively through consistent communication and clear division of tasks. We held regular meetings to discuss progress, address challenges, and align our goals. Each team member was assigned specific roles based on their strengths, ensuring that everyone contributed their expertise to the project. We utilized project management tools to track our tasks and deadlines, which kept us organized and on schedule. By fostering an environment of open feedback and support, we were able to overcome obstacles quickly and efficiently. This collaborative approach enabled us to complete the project successfully and deliver high-quality results.`,
      classNames: ['page-about__text-team-coll'],
    });
    container.appendChild(cont.getNode());
    cont.addInnerElement(title);
    cont.addInnerElement(text);
  }

  logoAndText(container: HTMLElement) {
    const cont = new ElementCreator({
      tag: 'div',
      classNames: ['page-about__logo-cont'],
    });
    const text = new ElementCreator({
      tag: 'div',
      textContent: 'This project was developed by our team during our training at:',
      classNames: ['page-about__logo-text'],
    });
    const linkForLogo = new ElementCreator({
      tag: 'a',
      classNames: ['page-about__a-logo'],
    });
    linkForLogo.getNode().setAttribute('href', 'https://rs.school/');
    linkForLogo.getNode().setAttribute('target', '_blanck');
    const logo = new ElementCreator({
      tag: 'img',
      classNames: ['page-about__logo'],
    });
    logo.getNode().setAttribute('alt', `RSschool logo`);
    logo.getNode().setAttribute('src', imageSrc);

    container.appendChild(cont.getNode());
    cont.addInnerElement(text);
    cont.addInnerElement(linkForLogo);
    linkForLogo.addInnerElement(logo);
  }
}
