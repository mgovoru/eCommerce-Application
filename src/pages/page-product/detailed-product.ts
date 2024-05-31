import { ProductDetail } from '../../app/type';
import { View } from '../../app/view';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './detailed-product.scss';

const mainParams = {
  tag: 'div',
  textContent: '',
  classNames: ['detailed-product'],
};

export default class DetailedProductView extends View {
  router: Router;

  state: State;

  server: Server;

  productDetails: ProductDetail;

  container: HTMLElement | null;

  blockTitle: HTMLElement | null;

  item: HTMLElement | null;

  constructor(router: Router, state: State, server: Server, productDetails: ProductDetail) {
    super(mainParams);
    this.router = router;
    this.state = state;
    this.server = server;
    this.productDetails = productDetails;
    this.container = null;
    this.blockTitle = null;
    this.item = null;
    this.configureView();
  }

  configureView() {
    const { name, description, masterVariant, variants } = this.productDetails.masterData.current;
    console.log(variants);
    // console.log(variants[0].images[0].url);

    const productName = name.en;
    const productDescription = description?.en || 'No description available';
    const productImage = masterVariant.images ? masterVariant.images[0].url : 'No image available';
    const productPrice = masterVariant.prices
      ? (masterVariant.prices[0].value.centAmount / 100).toFixed(2)
      : 'Price is not available';
    // const variantsImages = x;

    this.container = document.createElement('div');
    this.container.className = 'product-container';

    this.blockTitle = document.createElement('h1');
    this.blockTitle.className = 'product-title';
    this.blockTitle.textContent = productName;

    const returnBtn = document.createElement('button');
    returnBtn.className = 'return-btn';
    returnBtn.textContent = '← Go back';

    const productImageElement = document.createElement('img');
    productImageElement.className = 'product-image';
    productImageElement.src = productImage;

    const productDescriptionElement = document.createElement('p');
    productDescriptionElement.className = 'product-description';
    productDescriptionElement.textContent = `Description: ${productDescription}`;

    const productPriceElement = document.createElement('p');
    productPriceElement.className = 'product-price';
    productPriceElement.textContent = `Price: ${productPrice}`;

    const buyBtn = document.createElement('button');
    buyBtn.className = 'buy-btn';
    buyBtn.textContent = 'Buy';

    const productImgWrapper = document.createElement('div');
    productImgWrapper.className = 'product-img-wrapper';
    productImgWrapper.appendChild(productImageElement);
    const productDescWrapper = document.createElement('div');
    productDescWrapper.className = 'product-desc-wrapper';
    productDescWrapper.appendChild(productDescriptionElement);
    productDescWrapper.appendChild(productPriceElement);
    productDescWrapper.appendChild(buyBtn);

    const productWrapper = document.createElement('div');
    productWrapper.className = 'product-wrapper';
    productWrapper.appendChild(productImgWrapper);
    productWrapper.appendChild(productDescWrapper);

    this.container.appendChild(this.blockTitle);
    this.container.appendChild(productWrapper);

    this.viewElementCreator.append(returnBtn);
    this.viewElementCreator.append(this.container);
  }
}
