(function(){
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService){
        var vm = this;

        vm.items = ShoppingListCheckOffService.getToBuyItems();

        vm.purchase = function(itemIndex){
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService){
        var vm = this;

        vm.items = ShoppingListCheckOffService.getBoughtItems();
    }


    function ShoppingListCheckOffService(){
        var service = this;

        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            {  name: "crisps", quantity: 5 },
            {  name: "sandwiches", quantity: 2 },
            {  name: "pizzas", quantity: 7 },
            {  name: "car", quantity: 1 },
            {  name: "pens", quantity: 3 }
        ];

        var boughtItems = [];

        service.buyItem = function(itemIndex){
            var item = toBuyItems.splice(itemIndex, 1);
            boughtItems.push(item[0]);
        };

        service.getToBuyItems = function(){
            return toBuyItems;
        };

        service.getBoughtItems = function(){
            return boughtItems;
        }
    }
})();