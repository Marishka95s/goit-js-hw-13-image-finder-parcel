export default class LoadMoreBtn {
    constructor({ hidden = false }) {
      this.refs = this.getRefs();
  
      hidden && this.hide();
    }
  
    getRefs() {
      const refs = {};
      refs.button = document.querySelector('.loadmore__button');
      refs.label = refs.button.querySelector('.label');
      refs.spinner = refs.button.querySelector('.spinner-border');
  
      return refs;
    }
  
    enable() {
      this.refs.button.disabled = false;
      this.refs.label.textContent = 'Load more';
      this.refs.spinner.classList.add('is-hidden');
    }
  
    disable() {
      this.refs.button.disabled = true;
      this.refs.label.textContent = 'Loading...';
      this.refs.spinner.classList.remove('is-hidden');
    }
  
    show() {
      this.refs.button.classList.remove('is-hidden');
    }
  
    hide() {
      this.refs.button.classList.add('is-hidden');
    }
  }