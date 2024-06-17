import Modal from '../../components/modal/modal';
import { ProductDetail, Variant } from '../../app/type';
import { View } from '../../app/view';
import Router from '../../router/router';
import { Server } from '../../server/server';
import State from '../../state/state';
import './detailed-product.scss';
import { ElementCreator } from '../../app/base';

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

  buttonAdd: HTMLElement | null;

  buttonRem: HTMLElement | null;

  buttons: HTMLElement | null;

  productDescWrap: HTMLElement | null;

  constructor(router: Router, state: State, server: Server, productDetails: ProductDetail) {
    super(mainParams);
    this.router = router;
    this.state = state;
    this.server = server;
    this.productDetails = productDetails;
    this.container = null;
    this.blockTitle = null;
    this.buttonAdd = null;
    this.buttonRem = null;
    this.buttons = null;
    this.productDescWrap = null;
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
    returnBtn.addEventListener('click', () => {
      window.history.back();
    });

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

    const attributesContainer = document.createElement('div');
    attributesContainer.className = 'product-attributes';
    masterVariant.attributes?.forEach((attr) => {
      const attributeTag = document.createElement('span');
      attributeTag.className = 'product-attribute-tag';
      attributeTag.textContent = `${attr.name}: ${attr.value.label}`;
      attributesContainer.appendChild(attributeTag);
    });

    const productImgWrapper = document.createElement('div');
    productImgWrapper.className = 'product-img-wrapper';
    productImgWrapper.appendChild(productImageElement);

    const productDescWrapper = document.createElement('div');
    productDescWrapper.className = 'product-desc-wrapper';
    productDescWrapper.appendChild(productDescriptionElement);
    productDescWrapper.appendChild(productPriceElement);
    productDescWrapper.appendChild(attributesContainer);

    const productWrapper = document.createElement('div');
    productWrapper.className = 'product-wrapper';
    productWrapper.appendChild(productImgWrapper);
    productWrapper.appendChild(productDescWrapper);
    this.productDescWrap = productDescWrapper;

    this.createButtonAddinProduct();

    this.container.appendChild(this.blockTitle);
    this.container.appendChild(productWrapper);

    this.viewElementCreator.append(returnBtn);
    this.viewElementCreator.append(this.container);
    this.checkInCart();
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

  createButtonAddinProduct() {
    this.buttons = new ElementCreator({
      tag: 'div',
      classNames: ['product__buttons'],
    }).getNode();
    this.buttonAdd = new ElementCreator({
      tag: 'button',
      classNames: ['product__button', 'add-cart'],
      callback: async (e: Event) => {
        if (!(e.target as HTMLElement).classList.contains('in-cart')) {
          (e.target as HTMLElement).classList.remove('add-cart');
          (e.target as HTMLElement).classList.add('in-cart');
          await this.checkForAddProduct();
          this.buttonRemoveinProduct();
        }
      },
    }).getNode();
    this.buttons?.append(this.buttonAdd);
    (this.productDescWrap as HTMLElement).appendChild(this.buttons);
  }

  buttonRemoveinProduct() {
    this.buttonRem = new ElementCreator({
      tag: 'button',
      classNames: ['product__button', 'remove-cart'],
      callback: async () => {
        this.checkForRemoveProduct();
        this.buttonAdd?.classList.remove('in-cart');
        this.buttonAdd?.classList.add('add-cart');
        this.buttonRem?.remove();
      },
    }).getNode();
    this.buttons?.append(this.buttonRem);
  }

  async checkForAddProduct() {
    if (await this.server.workApi.checkLoginUser()) {
      if (!(await this.server.workApi.checkActiveCartLoginUser())) {
        await this.server.workApi.createCartLogUser();
        await this.server.workApi.addProductToCartLogUser(
          this.server.cartLogin,
          this.productDetails.id,
          this.server.versionCartLogin
        );
        await this.server.workApi.checkExitCartLogUser();
      } else {
        await this.server.workApi.addProductToCartLogUser(
          this.server.cartLogin,
          this.productDetails.id,
          this.server.versionCartLogin
        );
        await this.server.workApi.checkExitCartLogUser();
      }
    } else if (!this.server.cartAnonimus) {
      await this.server.workApi.createCartNoLogUser();
      await this.server.workApi.addProductToCartNoLogUser(this.server.cartAnonimus, this.productDetails.id);
      await this.server.workApi.getCartId(this.server.cartAnonimus);
    } else {
      await this.server.workApi.addProductToCartNoLogUser(this.server.cartAnonimus, this.productDetails.id);
      await this.server.workApi.getCartId(this.server.cartAnonimus);
    }
  }

  async checkForRemoveProduct() {
    if (await this.server.workApi.checkLoginUser()) {
      const idAddItem = await this.server.workApi?.checkExitProductinCartLog(this.productDetails.id);
      if (idAddItem) {
        await this.server.workApi.removeFromCartLogUser(this.server.cartLogin, idAddItem, this.server.versionCartLogin);
        await this.server.workApi.checkExitCartLogUser();
      }
    } else {
      const idAddItem = await this.server.workApi?.checkExitProductinCartNoLog(
        this.server.cartAnonimus,
        this.productDetails.id
      );
      if (idAddItem) {
        await this.server.workApi.removeFromCartNoLogUser(this.server.cartAnonimus, idAddItem);
        await this.server.workApi.getCartId(this.server.cartAnonimus);
      }
    }
  }

  async checkInCart() {
    if (await this.server.workApi.checkLoginUser()) {
      const idAddItem = await this.server.workApi?.checkExitProductinCartLog(this.productDetails.id);
      if (idAddItem) {
        this.buttonAdd?.classList.add('in-cart');
        this.buttonRemoveinProduct();
      }
    } else {
      const idAddItem = await this.server.workApi?.checkExitProductinCartNoLog(
        this.server.cartAnonimus,
        this.productDetails.id
      );
      if (idAddItem) {
        this.buttonAdd?.classList.add('in-cart');
        this.buttonRemoveinProduct();
      }
    }
  }
}
