'use strict';

const api = (function() {
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brian';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  
  const createBookmark = function(title, url, desc, rating, callback, onError) {
    const newItem = JSON.stringify(
      {
        title: title,
        url: url,
        desc: desc,
        rating: rating
      });

    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callback,
      error: onError,
    });
  };



  /////update coming
  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  const deleteBookmarks = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmarks,
  };
}());