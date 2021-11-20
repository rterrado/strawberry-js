$hide:(hidableName=null)=>{
    if (hidableName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }

    let allShowableElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xshow="'+hidableName+'"');

    for (var i = 0; i < allShowableElements.length; i++) {

        let template = allShowableElements[i].innerHTML;

        allShowableElements[i].innerHTML = '';

        // Check if the name of the hidden element is NOT registered
        if (!this.$scope.$hidden.hasOwnProperty(hidableName)) {

            this.$scope.$hidden[hidableName] = template;

        }

    }

    let allHideElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xhide="'+hidableName+'"');

    for (var i = 0; i < allHideElements.length; i++) {

        let template = allHideElements[i].innerHTML;

        allHideElements[i].innerHTML = '';

        // Check if the name of the hidden element is NOT registered
        if (!this.$scope.$hidden.hasOwnProperty(hidableName)) {

            this.$scope.$hidden[hidableName] = template;

        }

    }

}
