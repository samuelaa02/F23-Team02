class catalogItem extends HTMLElement{
  static observedAttributes = ["img","name","desc"];


  constructor(){
      super();
  }


  connectedCallback() {
      let imgUrl;
      if (this.hasAttribute("img")) {
          imgUrl = this.getAttribute("img");
      } else {
          imgUrl = "../imgs/img-404.png";
      }


      let itemName;
      if (this.hasAttribute("name")) {
          itemName = this.getAttribute("name");
      } else {
          itemName = "N/A";
      }


      let itemDesc;
      if (this.hasAttribute("desc")) {
          itemDesc = this.getAttribute("desc");
      } else {
          itemDesc = "Product description goes here...";
      }


      this.innerHTML = `
      <div style="display:flex; flex-direction: row; justify-content: left; align-items: center">
          <img class="catalog-img" src="${imgUrl}" width="256" height="256">
          <div>
              <h3>${itemName}</h3>
              <p>${itemDesc}</p>
          </div>
      </div>
      `;


    }
 
    disconnectedCallback() {
      console.log("Custom element removed from page.");
    }
 
    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }
 
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute ${name} has changed.`);
    }
}


customElements.define("catalog-item", catalogItem);


(function musicDB() {
  this.init = function () {
      this.search();
  }


  this.search = function () {
      var form = document.querySelector("#form");


      form.addEventListener("submit", function (e) {
          e.preventDefault();
          var value = document.querySelector("#input_search").value;
          form.reset();


          getData(value.split(" ").join("+"));
      })


  }


  this.getData = function (artist) {
      var http = new XMLHttpRequest();
      var url = "https://itunes.apple.com/search?term=" + artist + "&entity=album&limit=10";
      var method = "GET";


      var container = document.querySelector("#album_list_container");
      container.innerHTML = "";


      http.open(method, url);
      http.onreadystatechange = function () {
          if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
              showArtist(JSON.parse(http.response));


          } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {


          }
      }


      http.send();
  };


  this.showArtist = function (obj) {
      var container = document.querySelector("#album_list_container");
      var template = "";


      if (obj.results.length > 0) {
          document.querySelector('#not_match').style.display = 'none';


          for (var i = 0; i < obj.results.length; i++) {
              var albumArt = obj.results[i].artworkUrl100;
              var album = obj.results[i].collectionName;
              var artist = obj.results[i].artistName;
              var price = Math.round(obj.results[i].collectionPrice * 100)


              template += '<div class="col-sm-3 album_item" id="album_item">';
              template += '<div class="item_thmb" id="album_art"><img src=' + albumArt + '></div>';
              template += '<div id="song_info">';
              template += '<div class="item_title"> <p style="font-weight: bold; display: inline-block;">Album: </p>' + album + '</div>';
              template += '<div class="artist_name"> <p style="font-weight: bold; display: inline-block;">Artist: </p>' + artist + '</p></div>';
              template += '<div class="item_price"> <p style="font-weight: bold; display: inline-block;">Price: </p>' + price + ' points </div>';
              template += '</div>';
              template += '<button id="buy" onclick="addToCart(this, \'' + obj.results[i].artworkUrl100 + '\', \'' + obj.results[i].collectionName + '\', \'' + obj.results[i].artistName + '\', \'' + Math.round(obj.results[i].collectionPrice * 100) + '\')" target="_blank">Add To Cart</button>';
              template += '</div>';
          }


          container.innerHTML = '';
          container.insertAdjacentHTML('afterbegin', template);


      } else {
          document.querySelector("#not_match").style.display = "block";
          setTimeout(function () {
              document.querySelector("#not_match").style.display = "none";
          }, 2000);


      }




  };




  this.init();


})();


// start of modal js


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


openModalButtons.forEach(button => {
button.addEventListener('click', () => {
  const modal = document.querySelector(button.dataset.modalTarget)
  openModal(modal)
})
})


overlay.addEventListener('click', () => {
const modals = document.querySelectorAll('.modal.active')
modals.forEach(modal => {
  closeModal(modal)
})
})


closeModalButtons.forEach(button => {
button.addEventListener('click', () => {
  const modal = button.closest('.modal')
  closeModal(modal)
})
})


function openModal(modal) {
if (modal == null) return
modal.classList.add('active')
overlay.classList.add('active')
}


function closeModal(modal) {
if (modal == null) return
modal.classList.remove('active')
overlay.classList.remove('active')
}



/* Add To Cart */
var cart = [];

function addToCart(btn, albumArt, album, artist, price) {
    btn.innerHTML = "Added!";

    // Reset the button text
    setTimeout(() => {
        btn.innerHTML = "Add to Cart";
    }, 2000); // Reset to "Add to Cart" after 2 seconds

    var existingItem = cart.find(item => item.album === album);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            button: btn,
            art: albumArt,
            album: album,
            artist: artist,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    var cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        var cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        var albumInfoDiv = document.createElement('div');
        albumInfoDiv.classList.add('album-info');

        var imgElement = document.createElement('img');
        imgElement.src = item.art;
        imgElement.alt = item.name + ' Image';
        albumInfoDiv.appendChild(imgElement);

        var infoDiv = document.createElement('div');
        infoDiv.classList.add('info-container');

        var albumTitleSpan = document.createElement('span');
        albumTitleSpan.classList.add('album-title');
        albumTitleSpan.innerText = `Album: ${item.album} \n`;
        infoDiv.appendChild(albumTitleSpan);

        var artistSpan = document.createElement('span');
        artistSpan.classList.add('artist');
        artistSpan.innerText = `Artist: ${item.artist} \n`;
        infoDiv.appendChild(artistSpan);

        var priceSpan = document.createElement('span');
        priceSpan.classList.add('item-price');
        priceSpan.innerText = `Price: ${item.price} points\n`;
        infoDiv.appendChild(priceSpan);

        var quantitySpan = document.createElement('span');
        quantitySpan.innerText = `Quantity: ${item.quantity}`;
        infoDiv.appendChild(quantitySpan);

        albumInfoDiv.appendChild(infoDiv);

        var removeButton = document.createElement('button');
        removeButton.innerText = 'Remove from Cart';
        removeButton.onclick = function () {
            removeItemFromCart(item);
        };

        cartItemDiv.appendChild(albumInfoDiv);
        cartItemDiv.appendChild(removeButton);
        cartContainer.appendChild(cartItemDiv);
    });

    var totalPoints = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('totalPoints').innerText = totalPoints;
}

function removeItemFromCart(item) {
    // Find the index of the item in the cart
    var index = cart.findIndex(cartItem => cartItem === item);

    if (index !== -1) {
        // Remove the item from the cart array
        cart.splice(index, 1);
        // Update the cart display
        updateCart();
    }
}

// Function to sort items by name A to Z
function sortByNameAZ() {
const catalogItems = document.querySelectorAll('.album_item');
const sortedItems = Array.from(catalogItems).sort((a, b) => {
    const nameA = a.querySelector('.item_title').textContent;
    const nameB = b.querySelector('.item_title').textContent;
    return nameA.localeCompare(nameB);
});
displaySortedItems(sortedItems);
}


// Function to sort items by name Z to A
function sortByNameZA() {
const catalogItems = document.querySelectorAll('.album_item');
const sortedItems = Array.from(catalogItems).sort((a, b) => {
    const nameA = a.querySelector('.item_title').textContent;
    const nameB = b.querySelector('.item_title').textContent;
    return nameB.localeCompare(nameA);
});
displaySortedItems(sortedItems);
}


// Function to sort items by price, lowest to highest
function sortByPriceLowToHigh() {
const catalogItems = document.querySelectorAll('.album_item');
const sortedItems = Array.from(catalogItems).sort((a, b) => {
  const priceA = parseFloat(getPriceValue(a.querySelector('.item_price').textContent));
  const priceB = parseFloat(getPriceValue(b.querySelector('.item_price').textContent));
  return priceA - priceB;
});
displaySortedItems(sortedItems);
}


// Function to sort items by price, highest to lowest
function sortByPriceHighToLow() {
const catalogItems = document.querySelectorAll('.album_item');
const sortedItems = Array.from(catalogItems).sort((a, b) => {
  const priceA = parseFloat(getPriceValue(a.querySelector('.item_price').textContent));
  const priceB = parseFloat(getPriceValue(b.querySelector('.item_price').textContent));
  return priceB - priceA;
});
displaySortedItems(sortedItems);
}


// Helper function to extract numeric values from price strings
function getPriceValue(priceString) {
const match = priceString.match(/(\d+(\.\d+)?) points/);
return match ? parseFloat(match[1]) : 0;
}




// Function to display sorted items
function displaySortedItems(sortedItems) {
const container = document.querySelector("#album_list_container");
container.innerHTML = '';


sortedItems.forEach((item) => {
    container.appendChild(item);
});
}


function sortItems() {
const selectedValue = document.getElementById('sort-dropdown').value;


switch (selectedValue) {
    case 'name-az':
        sortByNameAZ();
        break;
    case 'name-za':
        sortByNameZA();
        break;
    case 'price-low-high':
        sortByPriceLowToHigh();
        break;
    case 'price-high-low':
        sortByPriceHighToLow();
        break;
    default:
        // Handle other cases if needed
        break;
}
}


// Event listener for the dropdown menu
document.getElementById('sort-dropdown').addEventListener('change', function () {
sortItems();
});


sortItems();


async function purchase(){
    var amount = document.getElementById('totalPoints').innerText
    var reason = "Catalog Purchase";
    var user = getCookie("accountID");
    if(amount && reason){
        var queryParams = "?amount="+amount+"&reason="+reason+"&awardType="+"Remove"+"&token="+user;
        const res = await fetch('https://u76zsrtgq8.execute-api.us-east-1.amazonaws.com/team02-testing/awardPoints'+queryParams);
        const data = await res.json();
        console.log(data);
        if(data.status === "Success"){
            var modalContent = document.getElementById('cart');
            var modal = document.getElementById('modal');
            modal.innerHTML = '<p>Purchase successful!</p>';
            modal.style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
        else{
            var modal = document.getElementById('modal');
            modal.innerHTML = '<p>Insufficient Points!</p>';
            modal.style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
    }

}