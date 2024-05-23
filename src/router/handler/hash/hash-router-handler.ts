import HistoryRouterHandler from '../history-router-handler';

export default class HashRouterHandler extends HistoryRouterHandler {
  constructor(callbackRouter: (params: { path: string; resource: string }) => void) {
    super(callbackRouter);

    this.params = {
      nameEvent: 'hashchange',
      locationField: 'hash',
    };

    window.addEventListener(this.params.nameEvent as keyof WindowEventMap, this.handler);
  }

  // setHistory(url: string) {
  //   window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
  // }
  setHistory(url: string) {
    window.location.hash = url;
  }
}
