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
            <div xcomponent="myComponent"></div>
            <button xclick="changeName()" class="button is-primary">Change Name</button>
            <br>
            <br>
            <div xcomponent="modalCard" class="card">
                <button xclick="hideCard()" class="button is-primary">Hide this card</button>
            </div>
            <br>
            <div xcomponent="notification" class="card">
                <div class="notification is-danger">
                    <button xclick="hideNotification()" class="delete"></button>
                    Primar lorem ipsum dolor sit amet, consectetur
                    adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
                </div>
            </div>
            <br>
            <div xcomponent="components.profile.card.url" class="card">
            </div>
        </div>

        <script type="text/javascript">
            strawberry.create('app');
            strawberry.debugger();

            app.scope('test',function($scope,$component){


                class Component {
                    constructor(src,struct){
                        console.log(this.constructor.name);
                        this.url = src;
                        this.struct = struct;
                    }
                    update(){
                        $component(this.struct).update();
                    }
                }


                $scope.components = {
                    profile: {
                        card: new Component('/tests/external.htm','components.profile.card.url')
                    }
                }


                $scope.myComponent = '/tests/external.htm';
                $scope.firstName = 'Kenjie';
                $scope.changeName=(button)=>{
                    button.addClass('is-loading');
                    setTimeout(()=>{
                        $scope.firstName = 'Ken';
                        $component('myComponent').update();
                        button.removeClass('is-loading');
                        $($component('notification').get()).fadeIn();
                        $scope.components.profile.card.update();
                    },1000);
                }
                $scope.hideCard=()=>{
                    let component = $($component('modalCard').get());
                    component.fadeOut();
                }
                $scope.hideNotification=()=>{
                    let component = $component('notification').get();
                    $(component).fadeOut();
                }
            });
        </script>
    </body>
</html>
