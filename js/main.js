var cart = {}; // моя корзина


$('document').ready(function(){
  loadGoods();
  Filter();
  Modal();
});

function loadGoods(){
  /*загружаю товар*/

  $.getJSON('js/goods.json', function (data) {
      // console.log(data)
      var out = '';
      for (var key in data){
			out += '<div class="product-box__item ' +data[key]['type']+ ' ">';
			out += '<h3 class="product-box__title">' +data[key]['name']+'</h3>';
			out += '<div class="product-box__img">';
			out += '<img class="img-fluid" src="' +data[key].img+ '">';
			out += '</div>';
			out += '<div class="product-box__meta">';
			out += '<p class="product-box__price">' +data[key]['price']+ 'грн.</p>';
			out += '<div class="qty">';    
			out += '<input class="qty__item" type="number"> Кол';
			out += '</div>';
			out += '<button class="product-box__btn" data-price="'+data[key]['price']+'"" data-id="'+ key +'">Добавить</button>';
			out += '</div>';
			out += '</div>';
      }
      $('#list').html(out);
      $('.product-box__btn').on('click', addToCart);
  });
}

var totalPrice = 0,
	totalAmount = 0;


function addToCart(){
	var btnId = $(this).attr('data-id'),
		thisPrice = $(this).attr('data-price')
		priceSpan = document.getElementById('js-price'),
		amountSpan = $('#js-amount'),
		inp = this.previousSibling.childNodes[0];
		if (inp.value >= 2) {
			totalPrice = (thisPrice * inp.value) + totalPrice;
			totalAmount = totalAmount + parseInt(inp.value);
			priceSpan.innerText = totalPrice;
			amountSpan.text(totalAmount);
		} else if (inp.value < 0) {
			alert("Ошибка");
		} else {
			totalPrice = (thisPrice * 1) + totalPrice;
			totalAmount++;
			priceSpan.innerText = totalPrice;
			amountSpan.text(totalAmount);
		}
}

function Price(id) {
	$.getJSON('js/goods.json', function (data) {

		for (var key in data) {
			if (key == id) {
				var price = data[key]['price'];
				console.log(price);
				return price;	
			}
		}
	});
};

function Filter() {
	var filter_select_el = document.getElementById('filter');
	var items_el = document.getElementById('list');

	filter_select_el.onchange = function() {
	    console.log(this.value);
	 var items = items_el.getElementsByClassName('product-box__item');
	 for (var i=0; i<items.length; i++) {
	     if (items[i].classList.contains(this.value)) {
	       items[i].style.display = 'block';
	   } else {
	       items[i].style.display = 'none';
	   }
	 }
	};
}


function Modal(){
var btnCheck = $('#js-btn-check'),
	modal = $('#js-modal'),
	close = $('#js-close');

	btnCheck.click( function(){
		modal.css('display','block');
	});
	close.click( function(){
		modal.css('display','none');
	});
};

function sendOrder(){
	var modalInputsList = document.querySelectorAll('.modal-input'),
		modal = document.getElementById('js-modal'),
		modalInputsArray = Array.prototype.slice.call(modalInputsList);

	if ((modalInputsArray[0].value == '') || (modalInputsArray[1].value == '')) {
		alert('Error');
		//проверка на пустоту
	} else if ((modalInputsArray[0].value.replace(/\s/g,'') == '') || (modalInputsArray[1].value.replace(/\s/g,'') == '')) {
		alert('Error');
		//проверка на пробелы
	} else {
		var priceSpan = document.getElementById('js-price'),
			amountSpan = document.getElementById('js-amount');
		alert('Благодарим за покупку');
		modal.style.display = 'none';
		priceSpan.innerText = 'XXX';
		amountSpan.innerText = 'XXX';
	}
}
