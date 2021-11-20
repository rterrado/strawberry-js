$paginators(scopeObj,scopeElement){

    // Finds all elements with Paginate conditionals
    let allPaginationElements = scopeElement.querySelectorAll('[xpaginate]');

    // Looping through conditional elements
    for (var i = 0; i < allPaginationElements.length; i++) {

        let paginationElement = allPaginationElements[i];

        let paginationName = strawberry.$$core.$getXValue(paginationElement,'xpaginate');

        // Saves the paginated element template

        scopeObj.$pagination[paginationName] = {
            $template: paginationElement.innerHTML
        }

        paginationElement.innerHTML = '';

    }

}
