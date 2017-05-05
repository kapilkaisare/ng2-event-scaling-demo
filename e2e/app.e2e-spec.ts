import { Ng2EventScalingDemoPage } from './app.po';

describe('ng2-event-scaling-demo App', () => {
  let page: Ng2EventScalingDemoPage;

  beforeEach(() => {
    page = new Ng2EventScalingDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
