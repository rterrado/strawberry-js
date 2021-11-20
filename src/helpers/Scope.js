class Scope {
    constructor(appName,scopeName){
        this.$app = appName;
        this.$name = scopeName;
        this.$hidden = {};
        this.$togglers = {};
        this.$switchers = {};
        this.$patchables = {};
        this.$renderables = {};
        this.$pagination = {};
        this.$templates = {};
        this.$services = new Services(scopeName);
    }
}
