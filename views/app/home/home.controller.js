(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$q','getCartDetailsService'];
  /* @ngInject */
  function HomeController($q, getCartDetailsService) {
    var vm = this;
    vm.language;
    activate();
    vm.cartData;

    function activate() {
      var promises = [getCartDetails()];
      return $q.all(promises).then(function(){
        // write code for completion of all the ajax calls.
        console.log(vm.cartData);
      });
    }

    function getCartDetails() {
      return getCartDetailsService.getCartDetails().then(function(data) {
        vm.cartData = data;
      });
    }

    vm.addItemQuantity = function(item) {
      item.quantity++;
      saveChanges();
    }

    vm.removeItemQuantity = function(item) {
      if(item.quantity>0){
        item.quantity--;
        saveChanges();
      }
    }

    vm.removeItem = function(item) {
      var index = vm.cartData.cartDetails.indexOf(item);
      if(index > -1) {
        vm.cartData.cartDetails.splice(index ,1);
        saveChanges();
      }
    }

    function saveChanges() {
      var obj={};
      vm.cartData.cartDetails.forEach(function(item) {
        obj['id'] = item.id;
        obj['quantity'] = item.quantity;
      });
      localStorage.setItem('cartDetails',JSON.stringify(obj));
      console.log(JSON.parse(localStorage.getItem('cartDetails')));
    }

    vm.fbShare = function() {
      FB.ui({
					  method: 'feed',
					  link: 'https://imvikaspancholi.firebaseapp.com',
					  name: 'Yay, I donated!',
					  message: 'Check out this link, guys!'
					}, function(response){console.log(response)});
    }
  }
  
})();