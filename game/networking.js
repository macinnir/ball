// getJSON returns a json object from a url 
function getJSON(URL) {
	var result = null;
	$.ajax({
			async: false,
			url: URL,
			data: {},
			dataType: "json",
			success: function(data) {
				result = data;
			}}

	);
	return result;
}

function postJSON(URL,payload) {
	var result = null;
	$.post(URL, payload, function(response) {
		animationStack = response;
		alert();
	});
}