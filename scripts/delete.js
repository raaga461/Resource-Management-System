var myService = angular.module('delModule', []);

myService.factory('delEmp',['$firebaseArray','$firebaseObject', function($firebaseArray,$firebaseObject){
    
    var self = this
	var editRef = firebase.database().ref().child('Resources');
   this.records = $firebaseArray(editRef);
  var sam = $firebaseObject(editRef);
  editRef.once("value",function(data){
    var x =data.val();
    keys = Object.keys(x);
    var empl;
    keys.forEach(function(key){

      empl = x[key];
      console.log(empl);
      empData.push(empl,key);

     });

        $scope.empData = empData;

   }); 
  this.empRecord = {
  	all : records,
  	get : function(key){
  		return records.$getRecord(key);
  	}
  };
  return empRecord;
}]);
