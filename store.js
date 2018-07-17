'use strict';
///// while this is a "store" this is essentially what a bookmark should be
const store = (function() {

  const addtoStore = function(item) {
    this.items.push(Object.assign(item, {expanded: false}));
  };

  // const addingBookmark = function(bookmark) {
  //   this.bookmarkItems.unshift(bookmark);
  // };
  // const deleteBookmark = function(id){
  //   this.bookmarkItems = this.bookmarkItems.filter(item => item.id !== id);
  // };

  const findByIDandDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };



//////proper way to deal with expanded state in store?




  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };



  function filterByRating(val) {
    this.items = this.items.filter( item => {
      return item.rating >= val;
    });
  }

  return {
    items: [],
    adding: false,
    error: null,
    //expanded:false,
    addtoStore,
    findById,
    findByIDandDelete, 
    filterByRating
  };
  
}());