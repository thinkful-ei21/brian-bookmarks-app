'use strict';
///test functions for rendering
/////////
function addItemTobooklist(itemName){
  bookstore.push({title:itemName});
  bookstore.push({url:itemurl});
}





function deleteBookmark(){

   $(".remove").on('click', function(){
    $(".js-Item-index-element").remove().closest();
   console.log("hi");
  });

 }

 function handleNewSubmit(event) {
   $('#list').submit(function(event) {
     event.preventDefault();
     console.log("`handleNewSubmit` ran");
     let newtitle = $(".title-input").val();
     let newurl = $('.link-input').val();
     console.log(newtitle);
     $(".link-input").val('');
     $(".title-input").val('');
     addItemTobooklist(newtitle);
     postBookmark(newtitle);
     renderBookmarklist();
   });
  }


 let bookstore = [
   {title:"more",
    url: "https://www.google.com/"}
 ];

//passing bookstore in as paramater, no side effects
function generateBookmarkString(store){
    const items = store.map((item, index) =>
    generateitemTemplate(item, index));
    console.log("generatedbookmarkstring");
    return items.join("");
}


 function generateitemTemplate(item, itemindex) {
   console.log("shopping list generated")
   return  `<li class= 'js-Item-index-element'
                data-item-index= '${itemindex}'>
               <div class ="booklist-controls">
               <h3>'${item.title}'</h3>

               <h4>'${item.url}'<h4>
               <button class= "view">view</button>
               <button class= "remove">remove</button>
               </div>
         </li>`

 }

/////////API CALLS////////
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brian/bookmarks'

function postBookmark(title,url,callback){
  $.post(BASE_URL,
    {
      title,
      url
    },
    callback
  )
}

function getBookmarks(callback){
  $.getJSON(BASE_URL,callback);
}



function renderBookmarklist(){
console.log("render booklist")
const bookmarksItemString = generateBookmarkString(bookstore);
  $('.listtwo').html(bookmarksItemString);
}
//////////////entry point////

function main(){
  getBookmarks((results) => {
    bookstore = results
    renderBookmarklist();
  });


  handleNewSubmit();
  deleteBookmark();
  handleNewSubmit();
}

main();

/////////////
