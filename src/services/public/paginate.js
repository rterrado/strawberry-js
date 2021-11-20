$paginate:(paginateName=null)=>{
    if (paginateName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }

    let e = this.$scope.$app;
    return {
        page:(pageNum,isAppend=null)=>{

            if (typeof this.$scope.$pagination[paginateName]!=='undefined'){

                let allPaginationElements = strawberry.$$core.$getElementsFromScope(this.$scope.$name,'xpaginate="'+paginateName+'"');

                for (var i = 0; i < allPaginationElements.length; i++) {

                    let paginationElement = allPaginationElements[i];

                    // Allows you to append the next page to the previous page in the bottom
                    if (isAppend!=='append') {
                        paginationElement.innerHTML = '';
                    }

                    let template = this.$scope.$pagination[paginateName].$template;

                    window[e].$scopes[this.$scope.$name].$services.$append(this.$scope,paginationElement,template);

                }

            }
        }
    }
}
