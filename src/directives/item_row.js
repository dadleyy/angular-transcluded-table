TT.directive('ttItemRow', [ function( ) {

  return {
    restrict: 'EA',
    replace: false,
    templateUrl: '/tt/item_row.html',
    scope: { item: '=' },
    compile: function( tElement ) {
      return (function( ) {
        console.log('hi');
      });
    }
  };

}]);
