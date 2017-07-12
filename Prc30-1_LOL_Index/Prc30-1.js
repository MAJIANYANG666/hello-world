
//userInformation popover   用户信息下拉窗口
$('.topbar').on('mouseover','.userInformation',function () {
    $('.user-popover').addClass('on');
});
$('.userInformation').on('mouseout',function () {
    $('.user-popover').removeClass('on');
});


// promo 轮播组件
$('.promo> .promo-trigger ').on('mouseover', '.trigger-item', function (e, keepScroll) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    e.preventDefault();
    go(index);
    //收到任意监听，则停止计时器播放
    if (!keepScroll) clearInterval(itvl);
});

function go(index) {
    //添加对应标签为active，删除其他标签的active
    $('.promo-item').eq(index).addClass('on')
        .siblings().removeClass('on');
    $('.trigger-item').eq(index).addClass('on')
        .siblings().removeClass('on');
    let width = $('.promo-item').width();
    $('.promo-list').css({
        transform: 'translateX(' + (-width * (index)) + 'px)'
    })
}
// 定时器，自动轮播页面
let current = 0;
let itvl = setInterval(function () {
    let nextIndex = current + 1;
    if (nextIndex === 5) {
        nextIndex = 0;
    }
    go(nextIndex);
    current = nextIndex;
}, 5000);

//news tabs 新闻标签
$('.news-nav').on('mouseover', 'li', function (e) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    e.preventDefault();
    newsGo(index);
});

function newsGo(index) {
    $('.news-type').eq(index).addClass('current')
        .siblings().removeClass('current');
    $('.news-content').eq(index).addClass('current')
        .siblings().removeClass('current');
}
//hero tabs 英雄/皮肤标签
$('.hero-nav').on('mouseover', 'li', function (e) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    e.preventDefault();
    heroGo(index);
});

function heroGo(index) {
    $('.hero-type').eq(index).addClass('current')
        .siblings().removeClass('current');
    $('.hero-content').eq(index).addClass('current')
        .siblings().removeClass('current');
}

//recommend 推荐标签
$('.recommend-nav').on('mouseover', 'li', function (e) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    e.preventDefault();
    recommendGo(index);
});

function recommendGo(index) {
    $('.recommend-type').eq(index).addClass('current')
        .siblings().removeClass('current');
    $('.recommend-content').eq(index).addClass('current')
        .siblings().removeClass('current');
}