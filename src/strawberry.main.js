/*
==========================================
Strawberry JS
Created by Ken Terrado, 2021
==========================================
*/

var strawberry = window.strawberry = {};

// Debugging option, allows Strawberry.js to print errors during execution
strawberry.debug = false;
strawberry.debugger=()=>{
    strawberry.debug = true;
    return strawberry;
}

strawberry.$factory = {};
strawberry.$service = {};

// Core methods of Strawberry.js
strawberry.$$core = {
    $getScope:(scopeName)=>{
        return document.querySelectorAll('[xscope="'+scopeName+'"]');
    },
    $getAllScopes:()=>{
        return document.querySelectorAll('[xscope]');
    },
    $getElementsFrom:(scopeElement,attr)=>{
        return scopeElement.querySelectorAll('['+attr+']');
    },
    $getElementsFromScope:(scopeName,attr)=>{
        return document.querySelector('[xscope="'+scopeName+'"]').querySelectorAll('['+attr+']');
    },
    $getXValue:(element,attr)=>{
        return element.getAttribute(attr);
    },
    $resolver: new Resolver
}

// Creates a new Strawberry instance
strawberry.create = (e,fn) => {
    strawberry.$app = e;
    window[e] = {
        $app:e,
        $scopes:{},
        $services: {},
        // Saves an object to the strawberry object
        factory:(objName,func)=>{

            if (func instanceof Function) {
                let injector = new Injector(func);
                let args = injector.scope(strawberry.$factory).resolve();
                strawberry.$factory[objName] = func(...args);
                return strawberry;
            }

            strawberry.$factory[objName] = func();
            return strawberry;

        },
        service:(serviceName,func)=>{
            if (!func instanceof Function) {
                return;
            }
            strawberry.$service[serviceName] = func;
            return strawberry;
        },
        scope:(scopeName,func)=>{
            try {

                // Registers a new scope
                window[e].$scopes[scopeName] = new Scope(e,scopeName);
                if (!(func instanceof Function)) {
                    throw 'strawberry.js: Invalid $scope creation: '+scopeName+', requires callback function.'
                }
                let injector = new Injector(func);
                let args = injector.scope(window[e].$scopes[scopeName]).resolve();

                // Calls the callback function required when creating a scope
                func(...args);

            } catch (e) {
                console.error(e);
            }
        }
    }
    if (fn!==undefined) {
        if (fn instanceof Function) {
            fn(window[e]);
        }
    }
    return strawberry;
}

// Boot Strawberry.js
DomReady.ready(()=>{

    let app = window[strawberry.$app];

    // Looping through all scope elements in the document object
    let scopeElements = strawberry.$$core.$getAllScopes();

    for (var i = 0; i < scopeElements.length; i++) {

        // Retrieving the scope element and the scope name
        let scopeElement = scopeElements[i];
        let scopeName = strawberry.$$core.$getXValue(scopeElement,'xscope');

        // Making sure that the scope element has corresponding scope object
        if (!app.$scopes.hasOwnProperty(scopeName)) continue;

        // Retreiving scope object
        let scopeObj = app.$scopes[scopeName];

        // Calls the render method of the scope services
        app.$scopes[scopeName].$services.$render(scopeObj,scopeElement);

    }

});
