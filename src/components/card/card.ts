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
    let discount = '';
    let styleline = '';
    let stylecolor = '';
    const price = String(cardInfo.price[0]?.value?.centAmount).slice(0, 2);
    if (cardInfo.price[0].discounted?.value.centAmount) {
      discount = String(cardInfo.price[0].discounted?.value.centAmount).slice(0, 2);
      styleline = 'text-decoration:line-through';
      stylecolor = 'color:red';
    }

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
							<div class="cards__price"><span style=${styleline}>${price}</span><span span style=${stylecolor}>${discount}</span>${cardInfo.price[0]?.value?.currencyCode}</div>
			</div>
			</div>
			</div>`;
  }
}
