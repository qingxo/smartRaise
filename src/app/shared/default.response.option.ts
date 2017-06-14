import { Headers, Http, BaseResponseOptions, ResponseOptions} from '@angular/http';

class DefaultResponseOptions extends BaseResponseOptions {

  // headers:Headers = new Headers({network: 'github'});
}

export const responseOptionsProvider = { provide: ResponseOptions, useClass: DefaultResponseOptions };
