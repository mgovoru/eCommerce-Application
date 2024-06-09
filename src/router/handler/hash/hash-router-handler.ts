import HistoryRouterHandler from '../history-router-handler';

export default class HashRouterHandler extends HistoryRouterHandler {
  private isInitialized = false;

  constructor(callbackRouter: (params: { path: string; resource: string }) => void) {
    super(callbackRouter);

    this.params = {
      nameEvent: 'hashchange',
      locationField: 'hash',
    };

    if (!this.isInitialized) {
      window.addEventListener(this.params.nameEvent as keyof WindowEventMap, this.handler);
      this.isInitialized = true;
    }
  }

  setHistory(url: string) {
    window.location.hash = url;
  }
}
