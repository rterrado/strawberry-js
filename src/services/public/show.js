$show:(hidableName=null)=>{
    if (hidableName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }

    // Check if the name of the hidden element is registered
    if (this.$scope.$hidden.hasOwnProperty(hidableName)) {

        let allHidableElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xhide="'+hidableName+'"');

        // Loop through all the hidden elements
        for (var i = 0; i < allHidableElements.length; i++) {

            allHidableElements[i].innerHTML = this.$scope.$hidden[hidableName];

        }

        let allShowElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xshow="'+hidableName+'"');

        // Loop through all the hidden elements
        for (var i = 0; i < allShowElements.length; i++) {

            allShowElements[i].innerHTML = this.$scope.$hidden[hidableName];

        }

    }




}
