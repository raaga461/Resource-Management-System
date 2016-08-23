var data = angular.fromJson(employeeData);
var myApp=angular.module('nodeProject',['ngRoute','firebase'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Employee/:employeeId/fname/:employeeFname',{
        templateUrl: 'employee.html',
        controller: 'EmpCtrl',
        controllerAs: 'employee'
    }) 
      .when('/Employee/:employeeId/fname/:employeeFname/role/:employeeRole',{
        templateUrl: 'employee2.html',
        controller: 'EmpCtrl2',
        controllerAs: 'employee2'
      })
      .when('/Employee/:emlpoyeeId/fname/:employeeFname/role/:employeeRole/addr/:empAddr',{
        templateUrl:'editEmployee.html',
        controller:'editCtrl',
        controllerAs:'editEmployee'
      });
      /*
      .when('/Employee/:employeeId',{
        templateUrl:'deleteEmp.html',
        controller:'delCtrl',
        controllerAs:'deleteEmployee'
      });*/
     $locationProvider.html5Mode(true);
}])
.run(function(){
  var config = {
    apiKey: "AIzaSyCJp1jW_kXY1Ml2ZCabPUjbPNQEJlA9-xQ",
    authDomain: "resource-management-system.firebaseapp.com",
    databaseURL: "https://resource-management-system.firebaseio.com",
    storageBucket: "resource-management-system.appspot.com",
  };
  firebase.initializeApp(config);
});
myApp.controller('aController', function($scope) {
  $scope.employees = data;
})
.controller('MainCtrl', ['$route', '$routeParams', '$location',
  function MainCtrl($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}])
.controller('EmpCtrl', ['$scope','$routeParams','$firebaseArray','$firebaseObject', function EmpCtrl($scope,$routeParams,$firebaseArray,$firebaseObject) {
  var self = this;
  self.name = 'EmpCtrl';
   self.params = $routeParams;
   //$scope.id='5';
   //$scope.name= 'aa';
  $scope.data = {
  role: 'Developer' },
  $scope.us ={
    state: 'AL'
  }
   
  // $scope.address = 'plainsboe';*/
   var fireRef =  firebase.database().ref().child('Resources');
   self.employeez = $firebaseArray(fireRef);
   //const ref = fireRef.child('object');
   //this.object = $firebaseObject(ref);
   var sam = $firebaseObject(fireRef);
   //console.log(sam);
   self.addEmployee = function() {
      self.employeez.$add({
      Id: $scope.id, Name:$scope.name, Role:$scope.data.role, Address:$scope.address, City:$scope.city, State: $scope.us.state, Zip:$scope.zip
      }); 
  };
  }])
.controller('EmpCtrl2',['$scope', '$routeParams', '$firebaseArray','$firebaseObject', function($scope, $routeParams,$firebaseArray,$firebaseObject) {
  var keys;
  var empDetails=[];
  this.name = 'EmpCtrl2';
  this.params = $routeParams;
  var fireRef1 = firebase.database().ref().child('Resources');
  this.employeez = $firebaseArray(fireRef1);
  fireRef1.once("value",function(data){
    var x =data.val();
    keys = Object.keys(x);
    var empl;
    keys.forEach(function(key){

      empl = x[key];
      empDetails.push(empl);

     });

        $scope.empDetails = empDetails;

   });

    //$scope.sampData  = [{"Id": "1","Name":"Abc"}];
    //var emp ={};
    /*console.log(empDetails);
        var empDetails = Object.keys(x);
        for((Object.keys(x)) in x){
          if(!x.hasOwnProperty(Object.keys(x))) continue;
          var k = x[Object.keys(x)];
          for (var prop in k){
          if(!k.hasOwnProperty(prop)) continue;
        console.log(prop + "=" +obj[prop]);
        }
      }*/
        //console.log(empDetails.leng)
       // for(var i= 0; i<empDetails.le)
    /*
      var empRole = x[key].Role;
      //console.log(empRole);
      //dataa.push(empRole);
        //console.log(dataa);
      var empAddr = x[key].Address;
      //console.log(empAddr)
      //dataa.push(empAddr);
        //console.log(dataa);
      var empCity = x[key].City;
      //console.log(empCity);
      //dataa.push(empCity);
        //console.log(dataa);
      var empState = x[key].State;
     // console.log(empState);
      //dataa.push(empState);
        //console.log(dataa);
      var empZip = x[key].Zip;
      //console.log(empZip);
      //dataa.push(empZip);
    }); */
   //console.log(dataa);

    //console.log(x);*/
}])
.controller('editCtrl',['$scope', '$routeParams', '$firebaseArray','$firebaseObject', function($scope, $routeParams,$firebaseArray,$firebaseObject) {
  var keyz;
  var empData=[];
 this.name = 'editCtrl';
  this.params = $routeParams;
   var editRef = firebase.database().ref().child('Resources');
  this.employez = $firebaseArray(editRef);
 editRef.once("value",function(data){
    var x =data.val();
    keys = Object.keys(x);
    var emp;
    keys.forEach(function(key){

      emp = x[key];
      empData.pop(emp);
    });
       $scope.empData = empData;
       console.log("hello");
      this.delEmployee = function(){
        console.log("hello2");
      this.employez.$remove({Id: $scope.id, Name:$scope.name, Role:$scope.data.role, Address:$scope.address, City:$scope.city, State: $scope.us.state, Zip:$scope.zip});
      console.log("hello2");
    };
//});
  /*function newPopup(){
   window.open("","","width=200,height=100");
  };*/

}]);
/*
.controller('delCtrl', ['$scope','$routeParams','$firebaseArray','$firebaseObject', function delCtrl($scope,$routeParams,$firebaseArray,$firebaseObject) {
  var self = this;
  self.name = 'delCtrl';
   self.params = $routeParams;
   console.log("Hello");
   var fredRef =  firebase.database().ref().child('Resources');
   self.employez = $firebaseArray(fredRef);
   console.log(employez);
   //const ref = fireRef.child('object');
   //this.object = $firebaseObject(ref);
   var sam = $firebaseObject(fredRef);
  self.delEmployee = function(fredRef) {
      self.employez.$remove(fredRef); 
  };
  }]);*/  