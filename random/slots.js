
//note parseInt
//note stop


var opts = ['Carmen','Laurie','Jerry','Robert'];



function go(){
	addSlots($("#slots_a .wrapper"));
	moveSlots($("#slots_a .wrapper"));
}

$(document).ready(function(){
	addSlots($("#slots_a .wrapper"));
	init();
});

function init(){
	$('#list').html('');
	var curcook = $.cookie("siurandompick");
	items = curcook ? curcook.split(/,/) : new Array();
	if(items && items[0]){
		$('#list').html('');
		$.each(items,function(i,v){
			$('#list').append('<li id="cook'+i+'"><a title="Click to remove" href="javascript:void(0);" onclick="removeOne('+i+');">'+v+'</a></li>');
		});
	}else{
		$('#list').html('<li id="nosel"><i>No selections</i></li>');
	}
}

function removeOne(id){
	items.splice(id,1);
	$.cookie("siurandompick", items.join(','), { expires : 10 });
	init();
}

function addSlots(jqo){
	var rem = '';
	for(var i = 0; i < 100; i++){
		var ctr = Math.floor(Math.random()*opts.length);
		if(rem == ctr){}else{
		jqo.append("<div class='slot'>"+opts[ctr]+"</div>");
		}
		rem = ctr;
	}
}

function clearList(){
	$.removeCookie("siurandompick");
	init();
}

function moveSlots(jqo){
	$('.wrapper').show();
	var time = 1500;
	time += Math.round(Math.random()*10000);
	jqo.stop(true,true);

	var marginTop = parseInt(jqo.css("margin-top"), 10)
	
	marginTop -= (7 * 250)
	
	jqo.animate(
		{"margin-top":marginTop+"px"},
		{'duration' : time, 'easing' : "easeOutElastic"}
	);
	
	$('#chosen').remove();
	
	setTimeout(function(){
		var temp = $('.chosen').position();
		var list = $('.wrapper').children();
		var found;
		var pos = 0;
		$.each(list,function(i,v){
			pos = $(v).position();
			if(pos.top >= (temp.top + 110) && pos.top < (temp.top + 140)){
				found = pos.top;
				$(v).attr('id', 'chosen');;
			}
		});
		if(found){
			var cook = $('#chosen').html();
			items.push(cook);
			$('#nosel').remove();
			$('#list').append('<li id="cook'+(items.length-1)+'"><a title="Click to remove" href="javascript:void(0);" onclick="removeOne('+(items.length-1)+');">'+cook+'</a></li>');
		}
		$.cookie("siurandompick", items.join(','), { expires : 10 });
	}, time);
}
