
import Layout from './Layout';
import Category from './Category';

export default class Page {
  title : string;
  url : string;
  body : string;
  layout : Layout;
  date ?: string;
  categories : Category[] = [];

  constructor(title : string, url : string, body : string, layout : Layout, date ?: string) {
    this.title = title;
    this.url = url;
    this.body = body;
    this.layout = layout;
    this.date = date;
  }
}

