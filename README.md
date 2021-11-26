# strawberry-js
A lightweight Javascript library that provides an organized way to manipulate data within the DOM.

### Beta Version
Beta Version 1.3.2 is released! \
https://cdn.jsdelivr.net/gh/rterrado/strawberry-js/dist/strawberry.beta.v1.3.2.js \
https://cdn.jsdelivr.net/gh/rterrado/strawberry-js/dist/strawberry.beta.v1.3.2.min.js

### How To Use This Repository For Testings
1. All tests must be done inside the tests directory
2. You can duplicate the example.php for a new test
3. The small PHP script found in the example.php spits out all the Javascript content of the src directory.
3. Source code is in the src directory, any changes to the StrawberryJS main code base must be done from there
4. Documentation website is on docs directory. Please install Node.js and Express server.
5. All releases are found in the dist directory.

## API 
### Creating application instance
To start up a new project, use the `create` method of our strawberry object, with the name of the application the argument
```
strawberry.create('app');
```
### Scopes
#### Demo: https://js.do/strawberryjs/scopes 
Scope allows you to bind an object to elements and components in your application. It defines the context at which it's properties are bind into and the execution context of its method. 
```
strawberry.create('app');
app.scope('profile',()=>{});
```
To bind this scope to an element in your DOM, use the `xscope` attribute with the name of the scope created as its value
```
<section xscope="profile"></section>
```
#### Scope properties and methods 
To assign properties and methods to the scope object, we need to inject the scope object (referenced as `$scope`) itself to the callback function of the scope method
```
app.scope('profile',($scope)=>{
  $scope.firstName = 'Kenjie';
  $scope.lastName=()=>{
    return 'Terrado';
  }
  $scope.displayMessage=(message)=>{
    return message;
  }
});
```
And then you can use the declared properties and methods in its corresponding element using a placehoder
```
<section xscope="profile">
  {{displayMessage('Hello World!')}}           // Hello World! 
  I'm {{firstName}} {{lastName()}}             // Kenjie Terrado
  I have {{1+1}} hands!                        // I have 2 hands!
</section>
```

### Factories
#### Demo: https://js.do/strawberryjs/factories
Factory lets you create an object that can be used in different scopes in your application.
```
strawberry.create('app');
app.factory('user',()=>{
  return {
    firstName: Kenjie, 
    lastName: Terrado
  }
});
```
To use the object, it has to be injected to the scope by adding it as one of the arguments: 
```
app.scope('profile',($scope, user)=>{
  $scope.firstName = user.firstName;
  $scope.lastName = user.lastName;
});
```

### Services 
#### If Statements (`xif`) - https://js.do/strawberryjs/xif  
```
<div xif="profile.name=='Kenjie'"> This shows up if $scope.profile.name is Kenjie. </div>
<div xif="test==false"> This shows up if $scope.test is false. </div>
<div xif="userId is null"> This shows up if $scope.userId is null. </div>
<div xif="userId is not null"> This shows up if $scope.userId is NOT null. </div>
```

### Contributions
Widely-open for collaborators! Please send me an email: terradokenjie@gmail.com
