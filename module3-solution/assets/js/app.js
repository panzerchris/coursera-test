(function(){
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    // This is the custom directive for search results
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    // Our controller for the search box
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var vm = this;

        vm.searchTerm = '';
        vm.hasRun = false;
        vm.found = [];

        vm.search = function(){
            if ( vm.searchTerm !== '' ){
                var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);
                promise.then(function(foundItems){
                    vm.found = foundItems;
                    vm.hasRun = true;
                });
            }
            else {
                vm.hasRun = true;
            }

        };

        vm.removeItem = function(index){
            console.log("removeItem:", index);
            vm.found.splice(index, 1);
        };
    }

    // The service that handles the search box
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
        var service = this;

        service.getMatchedMenuItems = function(searchTerm){
            console.log("getMatchedMenuItems: ", searchTerm);

            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(result){
                var foundItems = [], i = 0, max_i = result.data['menu_items'].length, lcSearchTerm = searchTerm.toLowerCase();

                for ( i = 0; i < max_i; i++){

                    var description = result.data['menu_items'][i]['description'].toLowerCase();

                    if ( description.indexOf(lcSearchTerm) !== -1 ){
                        foundItems.push(result.data['menu_items'][i]);
                    }
                }

                return foundItems;
            });
        }
    }
})();