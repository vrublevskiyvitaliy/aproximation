angular
    .module('Labs')
    .controller('Lab4Controller', ['$scope', 'SqrtMethod',Lab4Controller]);

function Lab4Controller($scope)
{
	$scope.n;
	var a = -1.5;
	var b = 1.5;
	
	var getMatrixCForXI = function(k, a, b) 
	{
		var matrix = [];
		for (var i = 0; i < k; i++) {
			var row = [];
			for(var j = 0; j < k ; j++) {
				var sell = Math.pow(a, i+j+1) - Math.pow(b,i+j+1);
				sell /= (i+j+1);
				row.push(sell);
			}
			matrix.push(row);
		}
		return matrix;
	}
	
	var getFunction = function()
	{
		return 'log(cos(x), 2)';
	}
	
	var getFunctionXIWithMain = function(i)
	{
		return '(x^' + i + ')*' + getFunction();
	}
	
	var getFunctionXI = function(i)
	{
		return '(x^' + i + ')';
	}
	
	
	var getFreeCoefForXI = function(k, a, b) 
	{
		var intervals = 100;
		var freeCoef = [];
		for (var i = 0; i < k; i++) {
			var fx = 'f(x)=' + getFunctionXIWithMain(i);
			fx = math.eval(fx);
			var sell = calculateIntegral(fx, a, b, intervals);
			freeCoef.push(sell);
		}
		return freeCoef;
	}
	
	var calculateIntegral = function(f, a, b, n) 
	{
		var sum = 0;
		var h = (b - a) / n;
		for (var i = 0; i < n;i ++) {
			sum += (f(a + i*h) + f(a+(i+1)*h))*(h/2);
		}
		sum = Math.abs(sum);
		return sum;
	}
	
	$scope.process = function()
	{
		if($scope.n == undefined || $scope.n <= 0)
		{
			$scope.invalid_input = true;
			return;
		}		
		
		generateXI($scope.n);
		$scope.processed = true;
	}
	
	var generateXI = function(k) {
		var matrix = getMatrixCForXI(k, a, b);
		var free = getFreeCoefForXI(k, a, b);
		var sqrt = SqrtMethod();
		sqrt.init(matrix, free);
		var ans = sqrt.getAns();
		var cond = sqrt.getCond();
		
		
		var f = '' + ans[0];
		for (var i = 1;i<k;i++) {
			f += ' + ' + getFunctionXI(i) + '*' + ans[i];
		}
		var delta = calculateDeltaXI(f, getFunction(), a, b);
		
		var f = 'f(x) = ' + f;
		
		$scope.func1 = f;
		$scope.cond = cond;
		$scope.deltaXI = delta;		
	}
	
	var calculateDeltaXI = function(f1, f2, a, b) {
		var f = 'f(x)=('+ f1 + ' - ' + f2 + ' ) ^2 ';
		var fx = math.eval(f);
		var intervals = 100;
		var delta = calculateIntegral(fx, a, b, intervals);
		delta = math.sqrt(delta);
		return delta;
	}
	
}
