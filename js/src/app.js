$(window).on("resize", function(){
	if($(document).width() >= 775 && $(".search").is(":hidden")){
		$(".search").slideDown();
	}
});

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
		$(".new-card").slideToggle("fast", function(){
			if($('.plus i').hasClass("fa-plus-circle")){
				$('.plus i').removeClass("fa-plus-circle").addClass("fa-minus-circle");
			}else{
				$('.plus i').removeClass("fa-minus-circle").addClass("fa-plus-circle");
			}	
		});
	};

	$scope.toggleSearch = function(){
		$(".search").slideToggle();
	};

	$scope.add = function(){
		if($scope.title.length > 0 && $scope.password.length > 0){

			if($scope.link.length == 0){
				$scope.link = "#";
			}

			$scope.cards.push({"title":$scope.title, "link":$scope.link, "username":$scope.username, "password":$scope.password});

			$scope.title    = "";
			$scope.link     = "";
			$scope.username = "";
			$scope.password = "";

			$scope.save();

			$scope.toggleForm();
			$(".new-card input[required]").removeClass("bg-warning");
		}else{
			alert("Please fill out Yellow Fields");
			$(".new-card input[required]").addClass("bg-warning");
		}
	};

	$scope.open = function(event){
		event.preventDefault();

		console.log(event.target.href);

		if(event.target.href != document.URL){
			var win = window.open(event.target.href);
    		win.focus();
    	}
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

	$scope.toggle = function(event){
		var $this = $(event.target),
			$pass = $this.parents(".card").find("h3");

		$pass.slideToggle();

		if($this.hasClass("fa-chevron-circle-down")){
			$this.removeClass("fa-chevron-circle-down").addClass("fa-chevron-circle-up");
		}else{
			$this.removeClass("fa-chevron-circle-up").addClass("fa-chevron-circle-down");
		}
	}
}