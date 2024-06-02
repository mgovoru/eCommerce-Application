import Modal from '../../components/modal/modal';
import { ProductDetail, Variant } from '../../app/type';
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

  modal: Modal;

  constructor(router: Router, state: State, server: Server, productDetails: ProductDetail) {
    super(mainParams);
    this.router = router;
    this.state = state;
    this.server = server;
    this.productDetails = productDetails;
    this.container = null;
    this.blockTitle = null;
    this.modal = new Modal();
    this.configureView();
  }

  configureView() {
    const { name, description, masterVariant, variants } = this.productDetails.masterData.current;

    const productName = name.en;
    const productDescription = description?.en || 'No description available';
    const productImage = masterVariant.images ? masterVariant.images[0].url : 'No image available';
    const productPrice = masterVariant.prices
      ? (masterVariant.prices[0].value.centAmount / 100).toFixed(2)
      : 'Price is not available';
    const discountPrice =
      masterVariant.prices && masterVariant.prices[0].discounted
        ? (masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)
        : null;

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
    productImageElement.onclick = () => this.openModal([productImage, ...this.collectVariantImages(variants)]);

    const productDescriptionElement = document.createElement('p');
    productDescriptionElement.className = 'product-description';
    productDescriptionElement.textContent = `Description: ${productDescription}`;

    const productPriceElement = document.createElement('p');
    if (discountPrice) {
      productPriceElement.innerHTML = `Price: <span class="regular-price">${productPrice}</span> `;

      const discountedPriceElement = document.createElement('span');
      discountedPriceElement.className = 'discounted-price';
      discountedPriceElement.textContent = ` ${discountPrice}`;
      productPriceElement.appendChild(discountedPriceElement);
    } else {
      productPriceElement.textContent = `Price: ${productPrice}`;
    }

    const productImgWrapper = document.createElement('div');
    productImgWrapper.className = 'product-img-wrapper';
    productImgWrapper.appendChild(productImageElement);

    const productDescWrapper = document.createElement('div');
    productDescWrapper.className = 'product-desc-wrapper';
    productDescWrapper.appendChild(productDescriptionElement);
    productDescWrapper.appendChild(productPriceElement);

    const productWrapper = document.createElement('div');
    productWrapper.className = 'product-wrapper';
    productWrapper.appendChild(productImgWrapper);
    productWrapper.appendChild(productDescWrapper);

    this.container.appendChild(this.blockTitle);
    this.container.appendChild(productWrapper);

    this.viewElementCreator.append(returnBtn);
    this.viewElementCreator.append(this.container);
  }

  collectVariantImages(variants: Variant[]): string[] {
    const variantImages: string[] = [];
    variants.forEach((variant) => {
      if (variant.images) {
        variantImages.push(...variant.images.map((image) => image.url));
      }
    });
    return variantImages;
  }

  openModal(images: string[]) {
    this.modal.open(images);
  }
}
