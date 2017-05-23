
import { Page, Template } from './Page';
import Layout from './Layout';
export { Page, Template } from './Page';

export class CurrentPage extends Page {
  body : () => string;

  constructor(title : string, url : string, layout : Layout, template : Template, date ?: string) {
    super(title, url, layout, template, date);
  }
}

export default CurrentPage;

