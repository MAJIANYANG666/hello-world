console.log("加载了");

// promo 轮播组件
$('.promo> .promo-trigger ').on('mouseover', '.trigger-item', function (e,keepScroll) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    console.log('dian');
    e.preventDefault();
    go(index);
    //收到任意监听，则停止计时器播放
    if(!keepScroll) clearInterval(itvl);
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
let itvl =setInterval(function () {
    let nextIndex =current +1;
    if(nextIndex === 5){
        nextIndex =0;
    }
    go(nextIndex);
    current=nextIndex;
},5000);