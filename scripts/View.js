var data = angular.fromJson(employeeData);
var myApp=angular.module('nodeProject',['ngRoute','firebase','delModule'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Employee/:employeeId/fname/:employeeFname',{
        templateUrl: 'addEmployee.html',
        controller: 'EmpCtrl',
        controllerAs: 'employee'
    }) 
      .when('/Employee/:employeeId/fname/:employeeFname/role/:employeeRole',{
        templateUrl: 'viewEmployee.html',
        controller: 'EmpCtrl2',
        controllerAs: 'employee2'
      })
      .when('/Employee/:emlpoyeeId/fname/:employeeFname/role/:employeeRole/addr/:empAddr',{
        templateUrl:'editEmployee.html',
        controller:'editCtrl',
        controllerAs:'editEmployee'
      });
      
     /* .when('/Employee/:employeeId',{
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
    console.log(keys);
    var empl;
    keys.forEach(function(key){

      empl = x[key];
      console.log(empl);
      empDetails.push(empl,key);

     });

        $scope.empDetails = empDetails;

   });

    
}])
.controller('editCtrl',['$scope', '$routeParams', '$firebaseArray','$firebaseObject', function($scope, $routeParams, $firebaseArray, $firebase) {
  var keyz;
  var empData=[];
  var empRecord;
 this.name = 'editCtrl';
  this.params = $routeParams;
   var editRef = firebase.database().ref().child('Resources');
   this.employez = $firebaseArray(editRef);
   this.records = $firebaseArray(editRef);
  //var sam = $firebaseObject(editRef);
  editRef.once("value",function(data){
    var x =data.val();
    keys = Object.keys(x);
    var empl;
    keys.forEach(function(key){

      empl = x[key];
      console.log(empl);
      console.log(empl);
      empData.push(empl,key);

     });

        $scope.empData = empData;

   });
  $scope.deleteEmployee = function(){
    console.log('In delete function');
   
     this.empRecord = {
    all : records,
    each : function(key){
      return records.$getRecord(key);
    }
    
     };

 console.log(empRecord);
  return empRecord;

  console.log(empRecord);
  this.records = empRecord.all;
  var remove = this.records.$getRecord(key);
  console.log(remove);
  console.log('After Remove');
    $scope.records.$remove(remove);
 
}





    $scope.showEmp = function(){
      console.log("in showEmp");
      $scope.editFormShow = true;
      $scope.addFormShow = false;
      Id = $scope.id;
      Name = $scope.name;
      Role = $scope.role;
      Address = $scope.address;
      City = $scope.city;
      State = $scope.state;
      Zip = $scope.zip;
      };
      console.log("middle");
    $scope.editFormSubmit = function(){
      console.log('hello in editFormSubmit');
        var Id =$scope.id;
        var record = $scope.$getRecord(id);
        //$scope.record.$save(){
        record.Id = $scope.id;
        record.Name = $scope.name;
        record.Role = $scope.role;
        record.Address = $scope.address;
        record.City = $scope.city;
        record.State = $scope.state;
        record.Zip = $scope.zip;
      //};
      $scope.employez.$save(record);
      };
    var records = $firebaseArray(editRef);
   
   
  /*$scope.delEmployee = function(key) {
     //this.empRecord = delEmp.empRecord;
    console.log("IN delete");
    this.records = empRecord.all;
    var remove = this.records.$getRecord(key);
    this.records.$remove(remove);
    };*/
        
      //self.sam.$remove(); 
  /*function newPopup(){
   window.open("","","width=200,height=100");
  };*/


  
}]);

