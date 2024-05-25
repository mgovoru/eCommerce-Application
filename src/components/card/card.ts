import { CardInfo } from '../../app/type';
import { View } from '../../app/view';
import './card.scss';

const containerParams = {
  tag: 'div',
  textContent: '',
};

export class CardView extends View {
  constructor() {
    super(containerParams);
  }

  render(cardInfo: CardInfo): string {
    return `
			<div class="cards__item">
			<div class="cards__element">
				<div class="cards__image -ibg">
					<img src="${cardInfo.src[0]?.url}" alt = "фото"
		class="cards__img">
			</div>
			<div class="cards__content">
				<div class="cards__text">
					<h3 class="cards__title">${cardInfo?.title}</h3>
						<h4 class="cards__sub-title">${cardInfo?.description}</h4>
							</div>
							<div class="cards__price">${cardInfo.price[0]?.value?.centAmount}</div>
			</div>
			</div>
			</div>`;
  }
}
