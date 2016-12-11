(function(){
   'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    angular.$inject = ['$scope'];

    function LunchCheckController($scope){
        $scope.lunchMenu="";
        $scope.totalItems=0;
        $scope.statusMessage="";
        $scope.statusClass="";

        $scope.checkMenu = function(){
            var totalItems = countMenuItems($scope.lunchMenu);
            var statusMessage = getStatusMessage(totalItems);

            $scope.totalItems = totalItems;
            $scope.statusMessage = statusMessage;
            $scope.statusClass = totalItems ? 'menu-has-items' : 'menu-no-items';
        };

        // Count the number of menu items
        function countMenuItems(lunchMenu){
            if ( lunchMenu == "" ){
                return 0;
            }

            var lunchItems = splitStringOnComma(lunchMenu, true);
            return lunchItems.length;
        }

        // Return the status message
        function getStatusMessage(totalItems){
            if ( totalItems > 3 ) {
                return 'Too much!';
            }
            else if ( totalItems ){
                return 'Enjoy!';
            }

            return 'Enter some data';
        }

        // Used for counting menu items and cleaning them
        function splitStringOnComma(string, clean){
            var items = string.split(/\s*,\s*/);
            var cleaned = [];

            console.log(items);

            if ( clean ){
                for ( var i = 0; i < items.length; i++){
                    if ( items[i]) {
                        cleaned.push(items[i]);
                    }
                }
                console.log(cleaned);
                return cleaned;
            }

            return items;
        }
    }
})();