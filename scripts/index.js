'use strict';
///test functions for rendering
/////////
function addItemTobooklist(itemName,itemurl){
  bookstore.push(

    {
      title:itemName,
      url:itemurl,
      isExpanded:false
    }

  );
  //bookstore.push({url:itemurl});
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

     postBookmark(newtitle,newurl, function(item){
       console.log(item);
       addItemTobooklist(newtitle,newurl);
       renderBookmarklist();
     });

   });
  }


 let bookstore = [
   {title:"more",
    url: "https://www.google.com/",
    isExpanded:false
   }
 ];

//passing bookstore in as paramater, no side effects
function generateBookmarkString(store){
    const items = store.map(generateBookmarkView);
    console.log("generatedbookmarkstring");
    return items.join("");
}





 function generateBookmarkCondensedView(item, itemindex) {
   console.log("shopping list generated")
   return  `<li class= 'js-Item-index-condense'
                data-item-index= '${itemindex}'>
               <div class ="booklist-controls">
               <h3>'${item.title}'</h3>
               <h3>${item.url}</h3>

               <button class= "view">view</button>
               <button class= "remove">remove</button>
               </div>
         </li>`

 }

 function generateBookmarkExpandedView(item, itemindex) {
   console.log("shopping list generated")
   return  `<li class= 'js-Item-index-expand'
                data-item-index= '${itemindex}'>
               <h1>stuff</h1>
         </li>`

 }

 function bookview(){
   $(".view").on('click', generateBookmarkView(bookstore => {
     item.isExpanded = true
     console.log("bookview");
   }))
 }

 function generateBookmarkView(item, itemindex){
   if (item.isExpanded){
     return generateBookmarkExpandedView(item, itemindex);
   } else {
     return generateBookmarkCondensedView(item, itemindex);
   }
 }

 function deleteBookmark(){
    $(".listrender").on('click', function(){
      $('.remove').on('click', function(){
        console.log('delete')
     $(".js-Item-index-condense").remove().closest();

   });
 });

  }
//JSON.stringify
/////////API CALLS////////
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brian/bookmarks'

function postBookmark(title,url,callback){
  console.log(`${title} ${url}`)
  $.ajax({
      url: BASE_URL,
      data: JSON.stringify({
        title:title,
        url:url,
      }),
      contentType: 'application/json; charset=utf-8',
      dataType: "json",
      success: callback,
      type: 'post'

    });
}

function getBookmarks(callback){
  $.getJSON(BASE_URL,callback);
}



function renderBookmarklist(){
console.log("render booklist")
const bookmarksItemString = generateBookmarkString(bookstore);
  $('.listrender').html(bookmarksItemString);
}
//////////////entry point////

function main(){
  getBookmarks((results) => {
    bookstore = results
    renderBookmarklist();
  });


  handleNewSubmit();
  deleteBookmark();
  bookview();
}

main();

/////////////
