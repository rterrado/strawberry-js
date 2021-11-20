strawberry.create('docs');

docs.factory('components',()=>{
    return {
        loader:'/components/loader.htm',
        header:'/components/header.htm',
        sidebar:'/components/sidebar.htm'
    }
});

docs.factory('requester',()=>{
    return {
        getPreferedTheme:()=>{
            return 'Light';
        }
    }
});

docs.scope('externals',($scope,requester,components)=>{

    // Initializes components
    $scope.components = components;

    // Initializes theme color
    $scope.theme = requester.getPreferedTheme();
    setTimeout(()=>{
        document.querySelector('body').id = $scope.theme;
    },100);

    // Selects theme
    $scope.selectTheme=()=>{
        document.querySelector('body').id = $scope.theme;
    }

    // Switches off the Loader
    setTimeout(()=>{
        document.querySelector('#loader').innerHTML = '';
    },1000);

});


docs.scope('articles',($scope,$http,$patch,components)=>{
    $scope.components = components;
    $http.get('/api/articles.json',(response)=>{
        $scope.articles = JSON.parse(response);
        $patch('articleList');
    });
});
