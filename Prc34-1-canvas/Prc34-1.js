/**
 * canvas绘图工具
 * 1.获取操作的div元素位置
 * 2.获取触摸touchmove的坐标
 * 3.为touchmove的位置创建像素涂块
 * 4.连接触摸的各个坐标点
 * 5.设置同功能的橡皮擦
 * 6.设置保存功能
 * 7.设置重置功能
 */


// 激活按钮
$('.pen-tool').on('click',function (e) {
    let $li = $(e.currentTarget);
    $li.addClass('current').siblings().removeClass('current');
});


// 重置设备画板高度
let canvas = document.querySelector('.drawInput');
let clientHeight = document.documentElement.clientHeight;
let clientWidth = document.documentElement.clientWidth;
canvas.width = clientWidth-6;
canvas.height = clientHeight-68;
let prePoint;

// 创建画笔触控监听
canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    // 获取触控坐标
    let clientX = e.touches[0].clientX;
    let clientY = e.touches[0].clientY;

    //查看类型
    let $index = $('.pen-tool').filter('.current').index();

    // 创建画笔
    if ($index === 0) {                              //画笔
        if (prePoint) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = 'green';
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#14E8BB';
            // 绘制路径
            ctx.beginPath();
            ctx.moveTo(prePoint.x, prePoint.y);      //移动到上一个点
            ctx.lineTo(clientX, clientY);            //画线到下一个点
            ctx.stroke();
        }
        prePoint = {
            x: clientX,
            y: clientY
        }
    } else if ($index === 1) {                       //橡皮擦
        let ctx = canvas.getContext('2d');
        ctx.clearRect(clientX - 10, clientY - 10, 20, 20)
    }
});

canvas.addEventListener('touchend',function (e){
    // 重置画笔点位
    prePoint={undefined};
});

// 保存canvas图片
$('.save').on('click',function () {
    let ctx = canvas.getContext('2d');
    // 将canvas的透明背景设置成白色
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < imageData.data.length; i += 4) {
    // 当该像素是透明的，则设置成白色
        if(imageData.data[i + 3] == 0) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
            imageData.data[i + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);

    window.open(canvas.toDataURL('image/png'));
});


// 重置canvas画板
$('.reset').on('click',function () {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

