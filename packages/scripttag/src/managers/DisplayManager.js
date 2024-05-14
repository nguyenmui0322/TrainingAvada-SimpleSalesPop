import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import delay from '../helpers/delay';
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    if (this.isShowPopupUrls(settings)) {
      this.notifications = notifications;
      this.settings = settings;
      await delay(this.settings.firstDelay);
      const toDisplayNotis = this.notifications.slice(0, this.settings.maxPopsDisplay);

      for (const notification of toDisplayNotis) {
        this.insertContainer();
        this.display({notification, position: this.settings.position});
        await delay(this.settings.displayDuration);
        this.fadeOut();
        await delay(this.settings.popsInterval);
      }
    }
  }

  isShowPopupUrls(settings) {
    const {includedUrls, excludedUrls, allowShow} = settings;
    const currentUrl = window.location.href;

    const includedUrlsList = includedUrls.split('\n').map(url => url.trim());
    const excludedUrlsList = excludedUrls.split('\n').map(url => url.trim());

    if (allowShow === 'all' && !excludedUrlsList.includes(currentUrl)) {
      return true;
    }
    if (allowShow === 'specific' && includedUrlsList.includes(currentUrl)) {
      return true;
    }
    return false;
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification, position}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} position={position} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
