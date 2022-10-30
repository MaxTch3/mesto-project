export default class Section {
  constructor({items, renderer}, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }

  render() {
    this.items.forEach((item) => {
      this.renderer(item);
    })
  }

  addItem(item) {
    this.selector.prepend(item);
  }
}
