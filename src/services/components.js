/**
 * @function $components
 * Fetches external components and appends it to the x-component attribute
 */
$components(scopeObj,scopeElement){

    let componentElements = strawberry.$$core.$getElementsFrom(scopeElement,'xcomponent');

    // Looping through all component elements in a certain render element
    for (var i = 0; i < componentElements.length; i++) {

        let componentElement = componentElements[i];
        let componentReference = strawberry.$$core.$getXValue(componentElement,'xcomponent');

        if (componentElement.innerHTML.trim()!=='') {
            // Saves component element to the template
            scopeObj.$templates[componentReference] = componentElement.innerHTML;
        }
        else {

            // Resolve the component reference value
            let path = strawberry.$$core.$resolver.expression(scopeObj,componentReference);

            if (typeof path === 'string') {

                this.$public().$http().init(scopeObj).get(path,(response)=>{

                    // Appends and locks the element
                    let tempElement = document.createElement('div');

                    // Adding the template as innerHTML to the element
                    tempElement.innerHTML = response;

                    // Saves the response as a template
                    scopeObj.$templates[componentReference] = response;

                    // Renders the contents of the element
                    this.$render(scopeObj,tempElement);

                    let allComponentElements = strawberry.$$core.$getElementsFrom(scopeElement,'xcomponent="'+componentReference+'"');

                    for (var i = 0; i < allComponentElements.length; i++) {

                        let thisComponentElement = allComponentElements[i];

                        // Apends the elemens
                        while (tempElement.childNodes.length > 0) {
                            thisComponentElement.appendChild(tempElement.childNodes[0]);
                        }

                        this.$lock(componentElement);

                    }
                });
            }
            else {
                if (strawberry.debug) {
                    console.warn('strawberry.js: Unable to resolve component path: $scope.'+componentReference+', typeof string required');
                }
            }
        }

    }
}
