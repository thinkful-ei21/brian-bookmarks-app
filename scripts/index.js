'use strict';
$(document).ready(function() {
  startTitle()
  //startTitle(stuffItem.create())
  deleteBookmark()
})

///test functions for rendering
/////////
const bookstore = [
  {name: " "}
];



$(".listrender").html(`<form id="test-list">
  <input class = 'testinput'></input>
  <button class ='submit'>submit</button>

</form>`)

function deleteBookmark(){

   $(".remove").on('click', function(){
    $(".booklist-controls").remove().closest();
   console.log("hi");
  });

 }

 function startTitle(cb) {
   $("#test-list").submit(function(event) {
     event.preventDefault();
     //console.log("hello")

     let newinput = $(".testinput").val()

    // console.log("hi how")
     //cb(newinput)
     $(".testinput").val()

     $(".listtwo").append(
       `<li>
                <div class ="booklist-controls">
                <h3>${newinput}</h3>
               <h4>description<h4>
               <h4>link<h4>
               <button class= "view">view</button>
               <button class= "remove">remove</button>
               </div>
        </li>`
     )
     //return newinput
   })
 }

 //
 // function stuffMaker(newinput) {
 //   return $(".listtwo").html(
 //     `<li>
 //              <div class ="booklist-controls">
 //              <h3>${newinput}</h3>
 //             <h4>description<h4>
 //             <h4>link<h4>
 //             <button class= "view">view</button>
 //             <button class= "remove">remove</button>
 //             </div>
 //             </li>`
 //   )
 //   console.log("ran")
 // }

/////////////

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brian/bookmarks'





 const store = {
   bookmarks: []
 };







 const decorateResponse = function(response) {
   return response.items.map(function(item) {
     return {

       title: item.title

     };
   });
 };

 const postBookmark = function(sendTerm, callback) {
  $.postJSON(BASE_URL,
     {
       name: sendTerm,

     },
     callback
   );
 };







 const generateBookmarkItemHtml = function(books) {
console.log(video);
   return `<li>${title}</li>`

 };


 const addbookmarksToStore = function(bookmarks) {
   store.bookmarks = bookmarks;
   console.log(store.bookmarks);
 };

///is this right??
 const render = function() {
   console.log(store.bookmarks);
   let bookmarksHtmlArrays = store.bookmarks.map(function(books) {
     return generateBookmarkItemHtml(books);
   });
   console.log(bookmarksHtmlArrays);
   const bookmarkHtmlString = bookmarksHtmlArrays.join('');
   console.log(bookmarkHtmlString);
   $('.results').html(bookmarkHtmlString);
 };




///handle function for submiting and rendering
 const handleFormSubmit = function() {
   $('form').submit(function(event) {
     event.preventDefault();
     const makeBookmark = $('.setBookName').val();

     $(event.currentTarget).parent().find('.setBookName').val('');
     postBookmark(sendTerm, function(response) {
       console.log(response);
       let decoratedResponse = decorateResponse(response);
       console.log(decoratedResponse);
       addVideosToStore(decoratedResponse);
       render();
     });
   });
 };

 $(function () {
   handleFormSubmit();
 });
