var colorBtn = document.getElementById('color');
colorBtn.onclick = function(){
    this.style.backgroundColor = 'red';
};
var growingBtn = document.getElementById('growing');
growingBtn.onclick = function(){
    this.style.fontSize = '36px';
    this.style.color = 'red';
};

var train = document.getElementById('train');
train.onclick = function(){
    //keep the time of the start of the animation
    var start = Date.now();

    var timer = setInterval(function(){
        //get the time tha has passed every interval cycle
        var timePassed = Date.now() - start;
        //move the train left
        train.style.left = timePassed / 5 + 'px';
        //if 2 seconds have passed stop the interval
        if(timePassed >= 2000) clearInterval(timer);
        //run function every 20 miliseconds
    }, 20);
}

//timing function that can be resused for many different animations
function animate({duration, draw, timing}) {
        //get the start time of the animation
        var start = performance.now();
        //request the animation frame so the browser renders it when it is ready to for performance
      requestAnimationFrame(function animate(time) {
          ////get a time fraction value between 0 and 1
        var timeFraction = (time - start) / duration;
        //if the time fraction goes above 1 set it to 1
        if (timeFraction > 1) timeFraction = 1;
    
        var progress = timing(timeFraction)
    
        draw(progress);
    
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
    
      });
    }

    var elem = document.getElementById('elem');
    elem.onclick = function(){
        animate({
            duration: 1000,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              elem.style.width = progress * 100 + '%';
            }
          });
    }

    //timing functions

    //parabolic curve
    function quad(progress){
        return Math.pow(progress, 2);
    }

    //the arc
    function circ(timeFraction){
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    //back bow shooting
    function back(x, timeFraction){
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
    }

    //bounce
    function bounce(timeFraction){
        for(var a = 0, b = 1, result; 1; a += b, b/= 2){
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
        }
    }

    //elastic
    function elastic(x, timeFraction) {
        return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
      }