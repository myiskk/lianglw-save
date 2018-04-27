
/**
* 请求模块
*/

module.exports = function (opt, str) {
	var options = {};
	var data = {};
	var USER = JSON.parse(localStorage.getItem('X-SOHU-LIVE-USER'));
	var token =  USER ? USER.token : '';
	// dataForm 特殊化
	if (str === 'form') {
		opt.data.append('token', token);
		options = {
			url: opt.url,
			data: opt.data,
			type: "POST",
            contentType: false,
            processData: false, 
			success:function(data, stateText, jqXHR){
				opt.success(data, stateText, jqXHR, this);
			},
			error:function(jqXHR, textStatus, errorThrow){
				opt.error && opt.error(jqXHR, textStatus, errorThrow, this);
			}
		};
		$.ajax(options);
		return;
	}

	if(!opt.data){
		opt.data = {};
	}
	opt.data.token = token;
	
	options = {
		url: opt.url,
		dataType : opt.dataType || 'json',
		data: opt.data || {},
		context: opt.context || true,
		type: opt.type || "GET",
		contentType: opt.contentType === undefined ? "application/json" : opt.contentType,
		success:function(data, stateText, jqXHR){
			opt.success(data, stateText, jqXHR, this);
		},
		error:function(jqXHR, textStatus, errorThrow){
			if (jqXHR&&jqXHR.responseJson&&jqXHR.responseJson.code === 100103) {
                window.localStorage.clear();
                window.location.href = './download.html';
			}
			opt.error && opt.error(jqXHR, textStatus, errorThrow, this);
		}
	};

	if(opt.jsonp) {
		options.jsonp = opt.jsonp;
	}
	if(opt.jsonpCallback) {
		options.jsonpCallback = opt.jsonpCallback;
	}
	if (options.type === 'POST' || options.type === 'post') {
		options.data = JSON.stringify(options.data)
	}
	$.ajax(options);
};
