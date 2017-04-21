import { SmartRaisePage } from './app.po';

describe('smart-raise App', () => {
  let page: SmartRaisePage;

  beforeEach(() => {
    page = new SmartRaisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
