///IIF FOR BOOKLIST
'use strict';

const bookmarkList = (function() {


////const BASE_URL = 'http://thinkful-list-api.herokuapp.com/brian/bookmarks';

  ////GENERATE STRINGS https://courses.thinkful.com/web-dev-001v1/assignment/3.2.3
  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function generateBookmarkElement(item) {
    if(item.expanded === true){
      console.log(`${item.id}`);
      return `
    <li class="expand-bookmark-view js-expand-updatedbookmark-view" data-updateditem-id="${item.id}">
      <h2>${item.title}</h2>
      <p class="expanded-stars js-expanded-stars">${item.rating}</p>
      <p class="long-desc js-long-desc">${item.desc}</p>
      <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">${item.url}</a>
      <div>
          <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">
          <button class="visit-site-button js-visit-site-button" type="submit">go to the site</button></a>
      </div>
      
      <form id="js-new-update-bookmark">

        <label for="add-bookmark-title"></label>
        <input class="add-bookmark-title js-add-updatedbookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title">
        <label for="add-bookmark-desc"></label>
        <textarea class="add-bookmark-desc js-add-updatedbookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="description for links" rows="2" cols="40"></textarea>
        
        <label for="add-bookmark-link"></label>
        <input class="add-bookmark-link js-add-updatedbookmark-link" id="add-bookmark-link" name="url" type="text"placeholder="http://please-put.com">
        <div id="add-star-rating js-add-star-rating">
          <div class="rate-radio-button js-rate-updatedradio-buttons">
            <Legend>STARS</Legend>
            <input type="radio" id="5-stars"
              name="rate" value="5">
            <label for="4-stars">5</label>
            <input type="radio" id="4-stars"
              name="rate" value="4">
            <label for="4-stars">4</label>
            <input type="radio" id="3-stars"
              name="rate" value="3">
            <label for="3-stars">3</label>
            <input type="radio" id="2-stars"
              name="rate" value="2">
            <label for="2-stars">2</label>
            <input type="radio" id="1-star"
              name="rate" value="1">
            <label for="1-star">1</label>
          </div>
        </div>
        
        <button class="js-delete-bookmark" >delete</button>
      <div id="js-update-bookmark">
        <button class="update-bookmark-button js-update-bookmark-button" type="submit">update</button>
      </div>
    </li>`;

    } else{
      ////CONDENSED VERSION
  
      return `
      <li class="bookmark-list-items js-bookmark-list-items" data-item-id="${item.id}">
      <h3 class="list-title js-list-title">${item.title}</h3>
      <a class="list-link js-list-link" href="${item.url}" target="_blank">${item.url}</a>
      <section class="star-rating js-star-rating">
        <p class="star-number js-star-number">${item.rating}</p>
      </section>
      <button class="js-delete-bookmark" >delete</button>
      <button class="js-expandbutton-bookmark">expand</button>
    </li>`;
    }
  }


  

  // function generateExpandedView(item){
    
  //} 

  /////standard form for creating bookmarks
  function generateCreateBookmarkView()  {
    console.log('Generate createbookmark view');
    return `
      <li class="create-bookmark-view js-create-bookmark-view">
      <h2>Start creating your bookmark today and see how it can change your browsing experience Bookmark</h2>
      <form id="js-add-bookmark">

        <label for="add-bookmark-title"></label>
        <input class="add-bookmark-title js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title">
        <label for="add-bookmark-desc"></label>
        <textarea class="add-bookmark-desc js-add-bookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="description for links" rows="2" cols="40"></textarea>
        
        <label for="add-bookmark-link"></label>
        <input class="add-bookmark-link js-add-bookmark-link" id="add-bookmark-link" name="url" type="text"placeholder="http://please-put.com">
        <div id="add-star-rating js-add-star-rating">
          <div class="rate-radio-button js-rate-radio-buttons">
            <Legend>STARS</Legend>
            <input type="radio" id="5-stars"
              name="rate" value="5">
            <label for="4-stars">5</label>
            <input type="radio" id="4-stars"
              name="rate" value="5">
            <label for="4-stars">4</label>
            <input type="radio" id="3-stars"
              name="rate" value="3">
            <label for="3-stars">3</label>
            <input type="radio" id="2-stars"
              name="rate" value="2">
            <label for="2-stars">2</label>
            <input type="radio" id="1-star"
              name="rate" value="1">
            <label for="1-star">1</label>
          </div>
        </div>
        <div>
          <button class="add-button-submit js-add-button-submit" type="submit">ADD</button>
        </div>
      </form>
    </li>`;
  
  }

  ///HANDLE FUNCTIONS 
  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }


  function handleAddBookmarkClicked() {
    $('#js-add-bookmark').on('submit', (function(event) {
      event.preventDefault();
      const title = event.currentTarget.title.value;
      const url = event.currentTarget.url.value;
      const desc = event.currentTarget.desc.value;
      const rate = event.currentTarget.rate.value;

      api.createBookmark(title, url, desc, rate, function(response) {
        store.addtoStore(response);
        store.adding = false;
        render();
      });
    }));
  }


  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-expandbutton-bookmark', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      //store.items.find(x => === id)
      const item = store.items.find(x => x.id ===id);
      item.expanded = true;
      console.log(item.expanded);
      render();
    });
  }


  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('delete');
      api.deleteBookmarks(id, () => {
        store.findByIDandDelete(id);
        render();
      });
    });
  }
  //////FINISH
  function handleUpdateClicked(){
    $('.js-bookmark-list').on('click','.js-update-bookmark-button', event =>{
      event.preventDefault();
      console.log('update clicked');
      const title = $('.js-add-updatedbookmark-title').val();
      console.log(`${title}`);
      const url = $('.js-add-updatedbookmark-link').val();
      const desc = $('.js-add-updatedbookmark-desc').val();
      const rate = $('input[name=rate]:checked').val();
      console.log(`${url}`);
      console.log(`${desc}`);
      console.log(`${rate}`);

      const updateData = ({title, url, desc, rating:rate});   
      const id = $('.js-expand-updatedbookmark-view').data('updateditem-id');
      console.log(id);
      api.updateBookmark(id, updateData, () => {
        store.expanded = false;
        store.findByIDandDelete(id);
        store.addtoStore(updateData);
        render();
      });
    });
  
  }




  function handleFilterByRatingClicked() {
    $('.js-header-select').on('change', function(event) {
      event.preventDefault();
      const val = $(event.currentTarget).val();
      console.log(val);
      store.filterByRating(parseInt(val[0]));
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-list-items')
      .data('item-id');
  }


  function render() {
    $('.js-bookmark-list').empty();
   
    if(store.adding) {
      const bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').append(bookmarkForm);
    }

    if(store.expanded) {
      const expandView = generateExpandedView();
      $('.js-bookmark-list').append(expandView);
    }

    handleAddBookmarkClicked();









    //get current items
    let items = store.items;
    //console.log(items);

    // create element string
    const bookmarkString = generateBookmarkString(items);

    //insert html into DOM
    $('.js-bookmark-list').append(bookmarkString);

  }

  function bindEventListeners() {
    handleExpandViewClicked();
    handleDeleteBookmarkClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
    handleUpdateClicked();
  }

  return {
    bindEventListeners,
    render
  };

}());


