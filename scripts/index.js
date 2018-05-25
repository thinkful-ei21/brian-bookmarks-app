'use strict';
///test functions for rendering
/////////
function addItemTobooklist(itemName,itemurl,itemID){
  bookstore.push(

    {
      title:itemName,
      url:itemurl,
      isExpanded:false,
      id:itemID
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
   {
     title:"more",
    url: "https://www.google.com/",
    id: '',
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

               <input type="checkbox" class= "view">view</button>
               <button class= "remove">remove</button>
               </div>
         </li>`

 }

 function generateBookmarkExpandedView(item, itemindex) {
   console.log("shopping list generated")
   return  `<li class= 'js-Item-index-expand'
                data-item-index= '${itemindex}'>

               <h1>'${item.title}'</h1>
               <h1>${item.url}</h1>

               <input type="checkbox" class= "view">view</button>
               <button class= "remove">remove</button>
           </li>`

 }

 function setupChangeView(){
   $(".listrender").on('change','.view', (event) => {
    const btn = $(event.currentTarget);
    const idx = btn.closest('li').data('item-index')
    bookstore[idx].isExpanded = true;
     console.log(idx);
     renderBookmarklist()
   });
 }
//STORE.bookmarks[idx].isExpanded = false; then render()

 function generateBookmarkView(item, itemindex){
   if (item.isExpanded){
     return generateBookmarkExpandedView(item, itemindex);
   } else {
     return generateBookmarkCondensedView(item, itemindex);
   }
 }

 function deleteBookmark(){

    $(".listrender").on('click','.remove', function(event){
        console.log('delete')

     const btn = $(event.currentTarget);
     let index = btn.closest('li').data('item-index');
     const idx = bookstore[index].id;
     const BASE_URLID = `https://thinkful-list-api.herokuapp.com/brian/bookmarks/${idx}`
     //bookstore.splice(`${idx}`,1);
     $(".js-Item-index-condense").remove().closest();
     $.ajax({
       url: BASE_URLID,
       type: 'delete'
        })
      });

      renderBookmarklist()
 };

  //}
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
  setupChangeView();
}

main();

/////////////
