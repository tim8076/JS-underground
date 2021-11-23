const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');



setInterval(setClock,1000);//每一秒執行一次setClock 函式
setClock();//更新畫面時立即執行

function setClock(){
    const currentDate = new Date; //取得現在時間
    const secondRatio = currentDate.getSeconds() / 60; //現在秒數除以60 ，算出秒針旋轉的比例
    const minuteRatio = currentDate.getMinutes() / 60; //現在分鐘除以60 ，算出分針旋轉的比例
    const hourRatio = currentDate.getHours() / 12; //現在小時除以12，算出時針旋轉比例
    
    setRotation(hourHand, hourRatio);
    setRotation(minuteHand, minuteRatio);
    setRotation(secondHand, secondRatio);

}

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360);
}


