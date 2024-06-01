import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './modal.scss';

export default class Modal {
  modalElement: HTMLElement;

  modalContent: HTMLElement;

  swiperWrapper: HTMLElement;

  constructor() {
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal';

    this.modalContent = document.createElement('div');
    this.modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => this.close();

    this.swiperWrapper = document.createElement('div');
    this.swiperWrapper.className = 'swiper';

    const swiperWrapperInner = document.createElement('div');
    swiperWrapperInner.className = 'swiper-wrapper';

    const swiperButtonNext = document.createElement('div');
    swiperButtonNext.className = 'swiper-button-next';

    const swiperButtonPrev = document.createElement('div');
    swiperButtonPrev.className = 'swiper-button-prev';

    const swiperPagination = document.createElement('div');
    swiperPagination.className = 'swiper-pagination';

    this.swiperWrapper.appendChild(swiperWrapperInner);
    this.swiperWrapper.appendChild(swiperButtonNext);
    this.swiperWrapper.appendChild(swiperButtonPrev);
    this.swiperWrapper.appendChild(swiperPagination);

    this.modalContent.appendChild(closeBtn);
    this.modalContent.appendChild(this.swiperWrapper);
    this.modalElement.appendChild(this.modalContent);

    document.body.appendChild(this.modalElement);

    this.modalElement.onclick = (event) => {
      if (event.target === this.modalElement) {
        this.close();
      }
    };
  }

  open(images: string[]) {
    const swiperWrapperInner = this.swiperWrapper.querySelector('.swiper-wrapper');
    if (swiperWrapperInner) {
      swiperWrapperInner.innerHTML = '';
      images.forEach((url) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const image = document.createElement('img');
        image.src = url;
        image.className = 'modal-image';
        slide.appendChild(image);
        swiperWrapperInner.appendChild(slide);
      });
    }

    this.modalElement.style.display = 'block';

    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  close() {
    this.modalElement.style.display = 'none';
    const swiperWrapperInner = this.swiperWrapper.querySelector('.swiper-wrapper');
    if (swiperWrapperInner) {
      swiperWrapperInner.innerHTML = '';
    }
  }
}
