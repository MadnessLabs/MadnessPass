$(document).on("ready", function(){
	$(".search input").focus();
})
.on("click", ".ml-logo", function(event){
	event.preventDefault();
	var win = window.open("http://madnesslabs.net");
    win.focus();
});


$(window).on("resize", function(){
	if($(document).width() >= 775 && $(".search").is(":hidden")){
		$(".search").slideDown();
	}

	if($(document).width() >= 775 && $(".search").is(":visible") && $("body").css("padding-top") == "85px"){
		$( "body" ).animate({
		    paddingTop: "52px"
		}, 250);
	}

	if($(document).width() < 775 && $(".search").is(":visible") && $("body").css("padding-top") == "52px"){
		$( "body" ).animate({
		    paddingTop: "85px"
		}, 250);
	}

	if($(document).width() < 775 && $(".search").is(":visible") && $(".new-card").is(":visible")){
		$(".search").hide();
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

	$scope.toggleIcon = function(){
		if($('.plus i').hasClass("fa-plus-circle")){
			$('.plus i').removeClass("fa-plus-circle").addClass("fa-minus-circle");
		}else{
			$('.plus i').removeClass("fa-minus-circle").addClass("fa-plus-circle");
		}
	};

	$scope.toggleNew = function(){
		$scope.checkSearch(function(){
			$(".new-card").slideToggle("fast", function(){
				$scope.toggleIcon();
				$(".new-title").focus().focus();	
			});
		});
	};

	$scope.toggleForm = function(el){

		if($(".search").is(":visible") && $(document).width() <= 775){
			$(".search").slideUp("fast", function(){
				$scope.toggleNew();
			});
		}else{
			$scope.toggleNew();
		}
	};

	$scope.checkSearch = function(fn){
		if($(document).width() <= 775){
			if($(".search").is(":hidden")){
				$( "body" ).animate({
				    paddingTop: "52px"
				}, 250, fn);
			}else{
				$( "body" ).animate({
				    paddingTop: "85px"
				}, 250, fn);
			}
		}else{
			$( "body" ).animate({
			    paddingTop: "52px"
			}, 250, fn);
		}
	};

	$scope.animateSearch = function(){
		$(".search").slideToggle("fast", function(){
			$(".search input").focus().focus();
			$scope.checkSearch();
		});
	};

	$scope.toggleSearch = function(){

		if($(".new-card").is(":visible")){
			$(".new-card").slideUp("fast", function(){
				$scope.toggleIcon();
				$scope.animateSearch();
			});
		}else{
			$scope.animateSearch();
		}
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