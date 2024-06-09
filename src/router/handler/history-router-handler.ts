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
  private isNavigating: boolean = false;

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
    if (this.isNavigating) return;
    this.isNavigating = true;

    if (typeof url === 'string') {
      this.setHistory(url);
    }

    const urlString = (window.location[this.params.locationField] as string).slice(1);

    const result: RequestParams = {
      path: '',
      resource: '',
    };
    const path = urlString.split('/');
    if (path.length <= 2) {
      [result.path = '', result.resource = ''] = path;
    } else if (path.length === 3) {
      [result.path = '', result.resource = ''] = [`${path[0]}/${path[1]}`, path[2]];
    }
    this.callback(result);

    setTimeout(() => {
      this.isNavigating = false;
    }, 0);
  }

  disable() {
    window.removeEventListener(this.params.nameEvent, this.handler);
  }

  setHistory(url: string) {
    window.history.pushState(null, '', url);
  }
}
