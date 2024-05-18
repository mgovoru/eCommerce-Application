type RequestParams = {
  path: string;
  resource: string;
};
type RouterHandlerParam = {
  nameEvent: string;
  locationField: keyof Location;
};

export default class HistoryRouterHandler {
  protected params: RouterHandlerParam;

  private callback: (params: RequestParams) => void;

  protected handler: EventListener;

  constructor(callback: (params: RequestParams) => void) {
    this.params = {
      nameEvent: 'popstate',
      locationField: 'pathname',
    };
    this.callback = callback;
    this.handler = this.navigate.bind(this) as EventListener;

    window.addEventListener(this.params.nameEvent, this.handler);
  }

  navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') {
      this.setHistory(url);
    }

    const urlString = (window.location[this.params.locationField] as string).slice(1);

    const result: RequestParams = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    [result.path = '', result.resource = ''] = path;

    this.callback(result);
  }

  disable() {
    window.removeEventListener(this.params.nameEvent, this.handler);
  }

  setHistory(url: string) {
    // window.history.pushState(null, '', `/${url}`);
    window.history.pushState(null, '', url);
  }
}
