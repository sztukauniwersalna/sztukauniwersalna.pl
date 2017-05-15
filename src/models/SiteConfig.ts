
import Layout from './Layout';
import Page from './Page';
import Category from './Category';
import Collection from './Collection';
import MenuEntry from './MenuEntry';

interface HashTable<T> {
  [key: string]: T;
}

export default class SiteConfig {
  title : string;
  baseUrl : string;
  timezone : string;
  layouts : HashTable<Layout> = {};
  collections : HashTable<Collection> = {};
  categories : HashTable<Category> = {};
  pages : HashTable<Page> = {};
  menu : MenuEntry[];

  private urls : HashTable<any> = {};

  addLayout(layout : Layout) {
    if (this.layouts[layout.name] != undefined) {
      throw new Error(`layout of name ${layout.name} is already added to the config`);
    }
    this.layouts[layout.name] = layout;
  }
  getLayoutOfName(layoutName : string, requiredBy : string) {
    const layout = this.layouts[layoutName];
    if (layout == undefined) {
      throw new Error(`couldn't find layout of name ${layoutName} required by ${requiredBy}`);
    }
    return layout;
  }

  addCategory(category : Category) {
    this.addUrl(category.url, category);
    this.categories[category.url] = category;
  }

  addPage(page : Page) {
    this.addUrl(page.url, page);
    this.pages[page.url] = page;
  }

  private addUrl(url : string, entity : any) {
    const previous = this.urls[url];
    if (previous != undefined) {
      throw new Error(`detected two entities with the same url (${url}): ${previous} and ${entity}`);
    }
    this.urls[url] = entity;
  }
}

