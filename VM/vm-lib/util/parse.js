define(function () {
    return {
        thousandify: function (n) {
            if (n) {
                n = n.toString();
                var reg = /\d{1,3}(?=(\d{3})+$)/g;
                var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
                    return s1.replace(reg, "$&,") + s2;
                });
                return n1;
            }
            return n;
        },

        parseDate: function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1,              //月份
                "d+": date.getDate(),                    //日
                "h+": date.getHours(),                   //小时
                "m+": date.getMinutes(),                 //分
                "s+": date.getSeconds(),                 //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        getUrlParam: function (key) {
            var urlSearchKV = [];
            var query = window.location.search.substr(1);
            var pairs = query.split('&');

            for (var i = 0; i < pairs.length; ++i) {
                var item = pairs[i].split('=');
                urlSearchKV[item[0]] = decodeURIComponent(item[1]);
            }
            return urlSearchKV[key];
        }
    }

});