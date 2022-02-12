<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Strawberry JS Development - v1.3</title>
        <!--StrawberryJS Source Code-->
        <script type="text/javascript"><?php require '../src/app.php'?></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    </head>
    <body>
        <!--
            You can use this template for Quick Testing!
        -->

        <div xscope="test">
            <button xclick="changeName()" class="button is-primary">Change Name</button>
            <div xcomponent="components.profile.card.src" class="card"></div>
        </div>

        <script type="text/javascript">
            strawberry.create('app');
            strawberry.debugger();

            app.factory('user',()=>{
                return {
                    firstName: 'Kenjie'
                }
            });

            app.service('component',($component,user)=>{
                class Component {
                    constructor(src,name) {
                        this.src = src;
                        this.name = name;
                    }
                    update(){
                        $component(this.name).update();
                    }
                }
                return {
                    get:(componentName)=>{
                        return $component(componentName).get();
                    },
                    bind:(componentSrc,componentName)=>{
                        return new Component(componentSrc,componentName+'.src');
                    }
                }
            });

            app.scope('test',function($scope,component){
                $scope.components = {
                    profile: {
                        card: component.bind('/tests/external.htm','components.profile.card')
                    }
                }

                $scope.firstName = 'Kenjie';
                $scope.changeName=(button)=>{
                    button.addClass('is-loading');
                    setTimeout(()=>{
                        $scope.firstName = 'Ken';
                        $scope.components.profile.card.update();
                        button.removeClass('is-loading');
                    },1000);
                }
            });
        </script>
    </body>
</html>
