function ajax_post(url,data) {
    var post = null;
    if(data){
        post = data;
    }else {
        post = {};
    }
    $.ajax({
        type: 'post'
        ,url: url
        ,data: post
        ,success:function (res) {
            res = JSON.parse(res);
            if(res.log){
                mdui.alert('已退出登录！');
                setTimeout(function () {
                    window.location = '/';
                },2000);
            }
            else {
                mdui.alert('请先登录！');
                setTimeout(function () {
                    window.location = '/login';
                },2000);
            }
        }
        ,error:function (res) {
            mdui.alert('错误：' + JSON.stringify(res));
        }
    });
}