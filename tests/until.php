<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Strawberry JS Development - v1.3</title>
        <!--StrawberryJS Source Code-->
        <script type="text/javascript"><?php require '../src/app.php'?></script>
    </head>
    <body>
        <!--
            You can use this template for Quick Testing!
        -->
        <div xscope="repeatTest">
            <div xrepeat="users as user">
                <button xclick="clickMe('{{user.firstName}}')">Click Me</button>
            </div>
        </div>

        <script type="text/javascript">
            strawberry.create('app');
            strawberry.debugger();
            app.scope('repeatTest',($scope)=>{
                $scope.users = {
                    '1':{
                        'firstName':'Kenjie'
                    },
                    '2':{
                        'firstName':'Vince'
                    }
                }
                $scope.numOfPost = {
                    'total':'3'
                };

                $scope.clickMe=function(num){
                    console.log(num);
                }
            });
        </script>
    </body>
</html>
