$switch:(switchName=null)=>{
    if (switchName===null) {
        return {
            init:($scope,service)=>{
                this.$scope = $scope;
                return service;
            }
        }
    }
    let e = this.$scope.$app;
    return {
        when:(whenName)=>{
            window[e].$services.$switchers().$on(this.$scope,switchName,whenName);
        },
        default:()=>{
            window[e].$services.$switchers().$on(this.$scope,switchName,'$default');
        }
    }

}
