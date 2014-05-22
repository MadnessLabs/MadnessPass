function MadnessPass($scope){
	if(localStorage.getItem("MadnessVault")){
		$scope.cards = $.parseJSON(localStorage.getItem("MadnessVault"));
	}else{
		$scope.cards = [];
	}

	$("body").fadeIn();

	$scope.title    = "";
	$scope.link     = "";
	$scope.username = "";
	$scope.password = "";

	$scope.toggleForm = function(el){
		$("form").slideToggle("fast", function(){
			if($('.plus i').hasClass("fa-plus-circle")){
				$('.plus i').removeClass("fa-plus-circle").addClass("fa-minus-circle");
			}else{
				$('.plus i').removeClass("fa-minus-circle").addClass("fa-plus-circle");
			}	
		});
	};

	$scope.add = function(){
		$scope.cards.push({"title":$scope.title, "link":$scope.link, "username":$scope.username, "password":$scope.password});

		$scope.title    = "";
		$scope.link     = "";
		$scope.username = "";
		$scope.password = "";

		$scope.save();

		$scope.toggleForm();
	};

	$scope.open = function(event){
		event.preventDefault();

		var win = window.open(event.target.href);
    	win.focus();
	};

	$scope.save = function(){
		localStorage.setItem("MadnessVault",JSON.stringify($scope.cards));
	}

	$scope.remove = function(event, index){
		var del = confirm("Are you sure? This cannot be recovered!");
		if(del){
			$scope.cards.splice(index, 1 );
			$scope.save();
		}
	};
}