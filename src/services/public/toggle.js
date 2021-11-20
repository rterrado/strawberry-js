$toggle:(hidableName=null)=>{
    if (hidableName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }

    let e = this.$scope.$app;

    let hideService = window[e].$scopes[this.$scope.$name].$services.$public()['$hide'];
    let $hide = hideService().init(this.$scope,hideService);

    let showService = window[e].$scopes[this.$scope.$name].$services.$public()['$show'];
    let $show = showService().init(this.$scope,showService);

    let getElement=(hidableName,evaluator)=>{
        return document.querySelector('[xscope="'+this.$scope.$name+'"]').querySelector('['+evaluator+'="'+hidableName+'"]');
    }

    let isHideOrShow=(hidableName)=>{
        let elemRef = getElement(hidableName,'xhide');
        if (elemRef===null) {
            elemRef = getElement(hidableName,'xshow');
            if (elemRef===null)return null;
            return 'xshow';
        }
        return 'xhide';
    }



    let evaluation = isHideOrShow(hidableName);

    // Check if the name of the hidden element is registered
    if (this.$scope.$togglers.hasOwnProperty(hidableName)) {

        if (this.$scope.$togglers[hidableName]) {
            // Element is currently being SHOWN
            this.$scope.$togglers[hidableName] = false;
            $hide(hidableName);

        }
        else {
            // Element is current being HIDDEN
            this.$scope.$togglers[hidableName] = true;
            $show(hidableName);
        }

    }
    else {
        // Register
        if (evaluation==='xshow') {
            this.$scope.$togglers[hidableName] = false;
            $hide(hidableName);
        }
        else {
            this.$scope.$togglers[hidableName] = true;
            $show(hidableName);
        }
    }








}
