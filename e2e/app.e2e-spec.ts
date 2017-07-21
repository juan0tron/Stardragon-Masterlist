import { StardragonMasterlistPage } from './app.po';

describe('stardragon-masterlist App', () => {
  let page: StardragonMasterlistPage;

  beforeEach(() => {
    page = new StardragonMasterlistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
