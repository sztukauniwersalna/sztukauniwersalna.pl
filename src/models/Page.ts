
import Layout from './Layout';
import Category from './Category';
import PageConfig from './PageConfig';

export type Template = (config: PageConfig) => string;

export class Page {
  title : string;
  url : string;
  layout : Layout;
  template : Template;
  date ?: string;
  categories : Category[] = [];

  constructor(title : string, url : string, layout : Layout, template : Template, date ?: string) {
    this.title = title;
    this.url = url;
    this.layout = layout;
    this.template = template;
    this.date = date;
  }
}

export default Page;

