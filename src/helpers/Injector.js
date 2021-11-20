class Injector {
    constructor(funcString){
        this.funcString = funcString.toString();
    }
    scope(scopeObj){
        this.scopeObj = scopeObj;
        return this;
    }
    resolve(){

        // Set regex to match
        let funcExpression = /(?<=\().+?(?=\))/g;
        let matchedFunc = this.funcString.match(funcExpression);

        // If the function argument is empty, just return empty array
        if (matchedFunc===null) {
            return [];
        }

        // Match all regex in the innerHTML string of the element
        let argumentExpression = matchedFunc[0];
        let allArguments = argumentExpression.split(',');
        let argObj = new Array;

        for (var i = 0; i < allArguments.length; i++) {
            let arg = allArguments[i].trim();

            if (arg==='$scope') {
                argObj.push(this.scopeObj);
                continue;
            }
            if (arg.charAt(0)==='$') {

                let service = window[strawberry.$app].$services.$public()[arg];

                if (typeof service==='function') {
                    argObj.push(service().init(this.scopeObj,service));
                    continue;
                }
                argObj.push(()=>{
                    console.error('strawberry.js: Injector cannot resolve '+arg+' as a function');
                });
                continue;
            }
            if (strawberry.$factory.hasOwnProperty(arg)) {
                argObj.push(strawberry.$factory[arg]);
                continue;
            }
            console.error('strawberry.js: Injector cannot resolve "'+arg+'" as an object');
        }
        return argObj;

    }
}
