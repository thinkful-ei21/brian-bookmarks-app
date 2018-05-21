'use strict';
$(document).ready(function() {
  //startTitle()
  //startTitle(stuffItem.create())
  deleteBookmark();
  handleNewSubmit();
  //handlebooklist()
})


///test functions for rendering
/////////
function addItemTobooklist(itemName){
  bookstore.push({name:itemName});
}



//(".listrender").html(`<form id="test-list">
//   <input class = 'testinput'></input>
//   <button class ='submit'>submit</button>
//
// </form>`)

function deleteBookmark(){

   $(".remove").on('click', function(){
    $(".booklist-controls").remove().closest();
   console.log("hi");
  });

 }

 function handleNewSubmit(event) {
   $('#list').submit(function(event) {
     event.preventDefault();
     console.log("`handleNewSubmit` ran");
     let newinput = $(".testinput").val();
     console.log(newinput);
     $(".testinput").val('');
     addItemTobooklist(newinput);
     postBookmarks(newinput);
     renderBookmarklist();
   });
  }


    // console.log("hi how")
     //cb(newinput)
     //$(".testinput").val()
   // $(".listtwo").append(
     //   `<li>
     //            <div class ="booklist-controls">
     //            <h3>${item.name}</h3>
     //           <h4>description<h4>
     //           <h4>link<h4>
     //           <button class= "view">view</button>
     //           <button class= "remove">remove</button>
     //           </div>
     //    </li>`
     // )
     //return newinput

 const bookstore = [
   {name:"more", }
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
               <h3>'${item.name}'</h3>

               <h4>'${item.description}'<h4>
               <h4>'${item.link}'<h4>
               <button class= "view">view</button>
               <button class= "remove">remove</button>
               </div>
         </li>`

 }

/////////API CALLS////////
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brian/bookmarks'

const postBookmarks = function(searchTerm, callback){
  $.postJSON(BASE_URL,
    { name:searchTerm,

    })
}



function renderBookmarklist(){
console.log("render booklist")
const bookmarksItemString = generateBookmarkString(bookstore);
  $('.listtwo').html(bookmarksItemString);
}

function handlebooklist(){
  renderBookmarklist();
  generateitemTemplate();
  handleNewSubmit();
}

$(handlebooklist());

/////////////
