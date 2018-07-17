/*global api bookmarkList store */
'use strict';


$(document).ready(function() {
  
  api.getBookmarks(items => {
    items.forEach(item => {
      store.addtoStore(item);
    ////console.log items
    });
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
});


// $(document).ready(function() {
//   startTitle(stuffMaker);
//   //startTitle(stuffItem.create())
//   deleteBookmark();
// });

// /test functions for rendering
// ///////
// function startTitle(cb) {
//     $(".submit").click(function() {
//       console.log("hello")
 
//       let newinput = $(".testinput").val()
 
//       console.log("hi how")
//       cb(newinput)
 
//       return newinput
//     })
//   }

