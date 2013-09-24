TT.controller('TableController', [ '$scope', function( $scope ) {

  $scope.items = [{
    name: 'Laptop',
    price: 1275,
    quantity: 2
  },{
    name: 'Movie Ticket',
    price: 12,
    quantity: 10
  },{ 
    name: 'Headphones',
    price: 100,
    quantity: 20
  }];

  $scope.columns = [ 'name', 'price', 'quantity' ];
  
  $scope.sort = { rel: '', dir: false };

}]);
