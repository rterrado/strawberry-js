$patch:(patchName=null,templateSrc=null)=>{
    if (patchName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }
    if (this.$scope.$patchables.hasOwnProperty(patchName)) {

        let e = this.$scope.$app;

        // Finds all patchable element
        let allPatchableElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xpatch="'+patchName+'"');

        // Looping through all patchable elements, registers, the hides it
        for (var i = 0; i < allPatchableElements.length; i++) {


            let patchableElement = allPatchableElements[i];
            let template = templateSrc ?? this.$scope.$patchables[patchName];

            patchableElement.innerHTML = '';
            window[e].$scopes[this.$scope.$name].$services.$append(this.$scope,patchableElement,template);

        }

    }
    return;
}
