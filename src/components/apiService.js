const KEY = '21815283-4d687d50500392275cab155f7';
const BASIC_URL = 'https://pixabay.com/api/';

export default class PicturesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchPictures(){
        const queryUrl = `${BASIC_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

        return fetch(queryUrl)
        .then(r => { 
            this.incrementPage();
            return r.json()})
        .catch(error => {
            console.log('This is error:', error)
        });
    }
    
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
      }
    
      get query() {
        return this.searchQuery;
      }
    
      set query(newQuery) {
        this.searchQuery = newQuery;
      }
    
}