// var id=hb.Cookies.get('wechat_ticket_id');

var wechat = {
    init: function(shareDate) {
        var _this = this;
        var defaultData={
            title: `礼成英雄榜`,
            content: '「让强者更强 让王者称王」礼成全国城市合伙人英雄排名榜',
            link: `${window.location.origin}/lc_dkp/h5/home/top`,
            logo: `${window.location.origin}${STATIC}/images/share.png`,
            // logo: `${require('src/lib/images/share.png')}`,
            success:function (res) {},
        }
        // console.log(defaultData)
        if (typeof(shareDate) !== 'undefined') {
            this.data.title = shareDate.title||defaultData.title;
            this.data.content = shareDate.content||defaultData.content;
            this.data.link = shareDate.link||defaultData.link;
            this.data.logo = shareDate.logo||defaultData.logo;
            this.data.success = shareDate.success||defaultData.success;
        }else{
            this.data=defaultData
        }
        if(_this.loadedScript||wx){
            _this.act();
        }else{
            // $.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(data, textStatus) {
            //     if (textStatus == 'success') {
            //         _this.loadedScript=true;
            //         _this.act();
            //     }
            // });
            $.ajax({
                url: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
                dataType: "script",
                cache : true,
                success:function (res) {
                    // console.log(res)
                    _this.loadedScript=true;
                    _this.act();
                }
            });

        }
    },
    loadedScript:false,
    data:{},
    act: function() {
        var _this = this;
        $.ajax({
            url: 'http://ke.halobear.com/courses/getWechat',
            // type: 'get',
            data: {
                url: encodeURIComponent(window.location.href.split('#')[0])
            },
            dataType: 'jsonp',
            success: function(ret) {
                wx.config($.extend({
                    // debug:1,
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                }, ret));
                wx.ready(function() {
                    wx.onMenuShareTimeline({
                        title: _this.data.content,
                        desc: "",
                        link:  _this.data.link,
                        imgUrl:  _this.data.logo,
                        dataUrl: '',
                        success: _this.data.success,
                        cancel: function() {}
                    });
                    wx.onMenuShareAppMessage({
                        title: _this.data.title,
                        desc:  _this.data.content,
                        link:  _this.data.link,
                        imgUrl:  _this.data.logo,
                        dataUrl: '',
                        success: _this.data.success,
                        cancel: function() {}
                    });
                    wx.onMenuShareQQ({
                        title: _this.data.title,
                        desc:  _this.data.content,
                        link:  _this.data.link,
                        imgUrl:  _this.data.logo,
                        dataUrl: '',
                        success: _this.data.success,
                        cancel: function() {}
                    });
                });
            }
        });
    },
    shareCount: function(){

    }
};
function init(shareDate) {
    wechat.init(shareDate);
}
function getShareDate() {
    return wechat.data;
}





export default {
    init:init,
    getShareDate:getShareDate,
}

