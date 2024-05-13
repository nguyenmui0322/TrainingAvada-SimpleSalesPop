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
    this.notifications = notifications;
    this.settings = settings;

    // Your display logic here
    await delay(this.settings.firstDelay);
    for (let i = 0; i < Math.min(this.settings.maxPopsDisplay, this.notifications.length); i++) {
      this.insertContainer();
      this.display({notification: this.notifications[i], position: this.settings.position});
      await delay(this.settings.displayDuration);
      this.fadeOut();
      await delay(this.settings.popsInterval);
    }
    // Sample display first one
    // await this.display({notification: notifications[0]});
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
