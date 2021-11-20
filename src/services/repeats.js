$repeats(scopeObj,scopeElement){

    let getReferenceName=(expression)=>{
        if (expression.includes('until')) {
            return '$$index';
        }
        return expression.split('as')[0].trim();
    }
    let getAliasName=(expression)=>{
        if (expression.includes('until')) {
            return expression.split('until')[1].trim();
        }
        return expression.split('as')[1].trim();
    }

    // Finds all elements with repeatable elements
    let repeatElements = strawberry.$$core.$getElementsFrom(scopeElement,'xrepeat');

    // Loop through repeatable elements
    for (var i = 0; i < repeatElements.length; i++) {

        let repeatElement = repeatElements[i];

        if (!this.$isLocked(repeatElement)) {

            // Takes in all content of repeatable element
            let htmlTemplate = repeatElement.innerHTML;

            repeatElement.innerHTML = '';

            let expression = strawberry.$$core.$getXValue(repeatElement,'xrepeat');

            let referenceObjName = getReferenceName(expression);

            if (referenceObjName==='$$index') {

                // This creates a new object that we can loop through
                scopeObj.$$index = new Object;

                let repeatables = getAliasName(expression);

                for (var i = 0; i < scopeObj[repeatables]; i++) {
                    scopeObj.$$index['props'+i] = new Object;
                }

            }

            if (scopeObj[referenceObjName]!==undefined) {

                let i = 0;

                for (const [key, value] of Object.entries(scopeObj[referenceObjName])) {
                    let tempObj = {};
                    let aliasObjName = getAliasName(expression);
                    tempObj[aliasObjName] = value;
                    tempObj.$parent = scopeObj;
                    tempObj.$index = i;
                    tempObj.$parent.$child = tempObj;
                    this.$append(tempObj,repeatElement,htmlTemplate,'events');
                    i++;
                }



            }
            else {
                if (strawberry.debug) {
                    console.warn('strawberry.js: Unable to repeat '+expression+', cannot resolve $scope.'+referenceObjName);
                }
            }

        }

    }


}
