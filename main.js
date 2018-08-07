// 1四叶草游戏操作模块开始
    // 步骤：
        //获取相关元素
        var range = document.getElementsByClassName("range")[0];
        var img3 = range.children[0];
        var img4 = range.children[1];
        var countNumber = document.getElementsByClassName("count-number")[0];
        var rightNumber = 0;
        var finishBt = document.getElementsByClassName("right-finish")[0];
         //生成四叶草
           var leafNumber2 = 4;
        for(var j=0;j<leafNumber2;j++){
            //生成新标签
            var newImg2 = img4.cloneNode(true);
            //绑定类名和ID
            newImg2.className = "show";
            newImg2.id = "right"+j;
            //改变位置
            var topValue2 = parseInt(Math.random()*320);
            var leftValue2 = parseInt(Math.random()*720);
            newImg2.style.top = topValue2+"px";
            newImg2.style.left = leftValue2+"px";       
            //把新创建的元素放入range里面
            range.appendChild(newImg2);
            //绑定事件，提高层级;鼠标放置，图片变大
            newImg2.onmouseenter = ProveIndex;
            newImg2.onmouseleave = function(){
            this.style.width = "80px";
            this.style.height = "80px";
            }
            // 4拖动计数模块开始
             //四叶草可移动
            newImg2.onmousedown = function (event) {
                event=event||window.event;
                //获取鼠标在盒子中的的坐标值
                var mousex = event.pageX||scroll().left + event.clientX;
                var mousey = event.pageY||scroll().top + event.clientY;
                var minix = mousex - this.offsetLeft;
                var miniy = mousey - this.offsetTop;
                this.onmousemove = function(event){
                    event=event||window.event;
                    var xx = event.pageX||scroll().left + event.clientX;
                    var yy = event.pageY||scroll().top + event.clientY;
                    xx=xx-minix;
                    yy=yy-miniy;
                    this.style.left = xx+"px";
                    this.style.top = yy+"px";
                }
                if(this.offsetLeft<-200){
                rightNumber++;
                range.removeChild(this);
                //在篮子中新建一个小四叶草
                countNumber.innerHTML = "已找到：<br>"+rightNumber+"个/共"+leafNumber2+"个";
                    if(rightNumber===leafNumber2){
                        alert("已找到所有四叶草，点击完成结束计时！");
                         // 点击完成按钮，结束计时，显示耗时
                         finishBt.onclick = function(){
                            this.innerHTML="耗时"+minu+"分"+sec+"秒";
                            clearInterval(timer1);
                         }
                        }
                }
            }
            //解绑
            newImg2.onmouseup = function(){
                this.onmousemove = null;
            }
            // 4拖动计数模块结束
        }
        //三叶草
        //循环生成img标签，然后为innerHTML属性添加内容
        var leafNumber = 100;
        for(var i=0;i<leafNumber;i++){
            //生成新标签
            var newImg = img3.cloneNode(true);
            //绑定类名和ID
            newImg.className = "show";
            newImg.id = "tip"+i;
            //改变位置
            var topValue = parseInt(Math.random()*320);
            var leftValue = parseInt(Math.random()*720);
            newImg.style.top = topValue+"px";
            newImg.style.left = leftValue+"px";
            //把新创建的元素放入content里面
            range.appendChild(newImg);
            //绑定事件，提高层级
            newImg.onmouseenter = ProveIndex;
            newImg.onmouseleave = function(){
            this.style.width = "80px";
            this.style.height = "80px";
            }
            //双击关闭按钮类名叫做tip_h
            newImg.ondblclick = function () {
                //不能用newDiv，因为在页面加载的时候newDiv，已经变成最后一个了，当你点击的时候，用远关闭的是最后的那个div。
                range.removeChild(this);
            }
        }
        var index = 100;
        function ProveIndex(){
            this.style.zIndex = index;
            index++;
            this.style.width = "100px";
            this.style.height = "100px";
        }
// 1四叶草游戏操作模块结束
// 2倒计时模块开始
    var countDown = document.getElementsByClassName("time")[0];
    var btStart = document.getElementsByClassName("bt-start")[0];
    var timeSum = 180;
    var bool = true;
    btStart.onclick = function(){
        range.className = "bigShow";
        if(bool){
        bool = false;// 避免点很多次开始，越来越快，清除计数器也没有效果
        // clearInterval(timer1);
    	 timer1 = setInterval(timeUp,1000);
        function timeUp(){
         minu = parseInt(timeSum/60%60);
         sec = parseInt(timeSum%60);
        minu=minu<10?"0"+minu:minu;
        sec=sec<10?"0"+sec:sec;
        timeSum=timeSum-1;
       		 if(timeSum<0){
            countDown.innerHTML="游戏结束，很遗憾，未找齐！";
            range.className = "range"
            clearInterval(timer1);
            return;
        	 }
        countDown.innerHTML="距离游戏结束:<br>"+minu+"分"+sec+"秒";
         }
        }
       }
// 2倒计时模块结束
// 3鼠标跟随模块开始（给鼠标后面加一个小四叶草）
    var mouseimg = document.getElementsByClassName("mouse-img")[0];
    var timer2 = null;
        var targetx = 0;var targety = 0;
        var leaderx = 0;var leadery = 0;
        //给整个文档绑定点击事件获取鼠标的位置。
        document.onmousemove = function (event) {
            //新五步
            //兼容获取事件对象
            event = event || window.event;
            //鼠标在页面的位置 = 被卷去的部分+可视区域部分。
            var pagey = event.pageY || scroll().top + event.clientY;
            var pagex = event.pageX || scroll().left + event.clientX;
            //要用定时器，先清定时器
           targety = pagey+10;
           targetx = pagex+6;
            clearInterval(timer2);
            timer2 = setInterval(function () {
                //为盒子的位置获取值
                leaderx = mouseimg.offsetLeft;
                //获取步长
                var stepx = (targetx-leaderx)/10;
                //二次处理步长
                stepx = stepx>0?Math.ceil(stepx):Math.floor(stepx);
                leaderx = leaderx + stepx;
                //赋值
                mouseimg.style.left = leaderx + "px";
                //为盒子的位置获取值
                leadery = mouseimg.offsetTop;
                //获取步长
                var stepy = (targety-leadery)/10;
                //二次处理步长
                stepy = stepy>0?Math.ceil(stepy):Math.floor(stepy);
                leadery = leadery + stepy;
                //赋值
                mouseimg.style.top = leadery + "px";
            },1);
        }
// 3鼠标跟随模块结束
