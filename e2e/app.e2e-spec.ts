import { GhpagesPage } from './app.po';

describe('ghpages App', function() {
  let page: GhpagesPage;

  beforeEach(() => {
    page = new GhpagesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
