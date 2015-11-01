angular.module('starter')
.controller('BrowseAnyCtrl', function($scope, geolocation, $window) {
  $scope.coords = {}
  $scope.coordsChosen = {}

  $scope.back = function(){
    $window.history.back();
  }

  $scope.getCoords = function(){
    var result = {}
    result.coords = {lat: $scope.coordsChosen.lat, long: $scope.coordsChosen.lng} || $scope.coords
    return result
  }
  
  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
  });

   $scope.$watch('coords', function(newValue, oldValue) {
     if (newValue){
       $scope.map = {
         zoom : 15,
         center : {
           lng: $scope.coords.long,
           lat: $scope.coords.lat
         }
       };
     }
   })
   $scope.marker = undefined

   $scope.ryanbullshit = function($event) {
    $scope.coordsChosen = this.mapObject.xa($event.layerX, $event.layerY);
    var old_marker = $scope.marker
    if (old_marker){
      this.mapObject.removeObject(old_marker)
    }
    $scope.marker = new H.map.Marker({lat:$scope.coordsChosen.lat, lng:$scope.coordsChosen.lng});
    this.mapObject.addObject($scope.marker);
   }
});