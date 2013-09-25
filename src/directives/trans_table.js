TT.directive('ttTransTable', [ '$filter', '$parse', function( $filter, $parse ) {

  var isArr = angular.isArray,
      isStr = angular.isString,
      forEach = angular.forEach,
      toLower = function( str ) { return isStr(str) ? str.toLowerCase( ) : str; };

  return {
    restrict: 'EA',
    templateUrl: '/tt/trans_table.html',
    scope: { rows: '=', columns: '=', sort: '=' },
    transclude: true,
    compile: function( telement, _, transclude ) {
      return (function( $scope, element, attrs ) {
     
        var tbody = element.find('tbody'),
            sort = $scope.sort || { };

        function transcludeRow( row ) {
          var $rowScope = $scope.$parent.$new( );
          $rowScope.data = row;
          transclude($rowScope, function( items ) {
            element.append( items );
          });
        };

        function updateRows( ) {
          var rows = isArr( $scope.rows ) ? $scope.rows : [ ],
              row, i = 0, rc = rows.length,
              accessor = $parse(sort.rel);

          // handle ordering
          rows = $filter('orderBy')(rows,accessor,sort.dir); 
          
          // clear old
          tbody.html('');

          for( i; i < rc; i++ ) {
            row = rows[i];
            transcludeRow( row );
          }

        };

        $scope.changeSort = function( column ) {
          sort.dir = sort.rel === (column.rel||column) ? !sort.dir : true;
          sort.rel = column.rel || column;
          updateRows( );
        };        

        $scope.$watch('rows', updateRows);

      });
    }
  };

}]);
