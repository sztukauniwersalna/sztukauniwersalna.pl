
import Page from './Page';
import Layout from './Layout';

export default class Category {
  title : string;
  url : string;
  layout : Layout;
  pages : Page[] = [];

  constructor(title : string, url : string, layout : Layout) {
    this.title = title;
    this.url = url;
    this.layout = layout;
  }
}

