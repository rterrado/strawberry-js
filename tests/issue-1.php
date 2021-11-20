<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Strawberry JS Development - v1.3</title>
        <!--StrawberryJS Source Code-->
        <script type="text/javascript"><?php require '../src/app.php'?></script>
    </head>
    <body>
        <div xscope="first">
            <div xpatch="firstPatch">
                {{firstName}} {{lastName}}
            </div>
        </div>
        <div xscope="second">
            <div xpatch="secondPatch">
                {{firstName}} {{lastName}}
            </div>
        </div>
        <script type="text/javascript">
            strawberry.create('app');
            app.factory('requester',()=>{
                return {
                    lastName: 'Terrado'
                }
            });
            app.scope('first',($scope,requester,$patch,$http,$render)=>{
                $http.get('/tests/some.json',(response)=>{
                    $scope.firstName = 'Ryan';
                    $scope.lastName = 'Jardinico';
                    $patch('firstPatch');
                });
            });
            app.scope('second',($scope,requester,$patch,$http,$render)=>{
                $http.get('/tests/some.json',(response)=>{
                    $scope.firstName = 'Kenjie';
                    $scope.lastName = 'Terrado';
                    $patch('secondPatch');
                });
            });
        </script>
    </body>
</html>
