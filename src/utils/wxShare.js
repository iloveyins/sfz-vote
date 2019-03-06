import { baseUrl } from "../config/url.js";

function wxInit(title, link, imgUrl, desc) {
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //从后台获取签名信息
        $.ajax({
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            type: "get",
            url: baseUrl + "/common/share",
            data: {
                url: encodeURIComponent(window.location.href.split('#')[0])
            },
            success: function (r) {
                //微信
                wxConfig(r, title, link, imgUrl, desc);
                QQInit(title, desc, imgUrl);
            }
        });
    } else {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            // QQ
            setTimeout(function () {
                setShareInfo({
                    title: title, // 分享标题
                    summary: desc, // 分享内容
                    pic: imgUrl, // 分享图片
                    url: link, // 分享链接
                });
            }, 50);
            QQInit(title, desc, imgUrl);
        }
        if (isIOS) {
            QQInit(title, desc, imgUrl);
        }
    }
};

function wxConfig(data, title, link, imgUrl, desc) {

    wx.config({ //微信分享
        debug: false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.APP_Id, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, //必填， 生成签名的随机串
        signature: data.signature, //必填，签名
        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareWeibo', 'onMenuShareAppMessage', 'onMenuShareTimeline'] //必填， JS接口列表，这里只填写了分享需要的接口
    });

    wx.ready(function () {
        //分享到朋友圈 QQ空间
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        });

        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
            }
        });

        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //朋友与QQ好友
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        });

        //微博
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

//QQ分享
function QQInit(title, desc, imgUrl) {
    document.getElementById('shortDescription').setAttribute('content', desc);
    document.getElementById('shortName').setAttribute('content', title);
    $(document).attr('title', title);
    document.getElementById('shortImage').setAttribute('content', imgUrl);
}

export {
    wxInit,
    QQInit
}