// cover - 타원 윤곽선 & 점

/* #ellipse_container {
    position:absolute; right:0; top:50%; transform:translateY(-50%) rotate(-20deg); z-index:998;
    width:1500px; height:900px;
    margin: 50px auto;
    .ellipse_wrap {
        position:relative; width:100%; height:100%;
        .ellipse_outline {
            position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
            width:1000px; height:500px;
            border:$border; border-radius:50%;
        }
        .dot {
            position:absolute; width:16px; height:16px;
            background:black; border-radius:50%;
        }
    }
} */

const dot = document.querySelector('.dot')
const container = document.querySelector('.ellipse_wrap')
console.log(dot, container);

const cx = container.clientWidth / 2;
const cy = container.clientHeight / 2;
        
const a = 500; // 타원 가로 반지름
const b = 250; // 타원 세로 반지름
        
let theta = 0;
        
function animate() {
theta += 0.008; //속도
        
const x = cx + a * Math.cos(theta) - dot.clientWidth / 2;
const y = cy + b * Math.sin(theta) - dot.clientHeight / 2;
        
dot.style.left = x + "px";
dot.style.top = y + "px";
        
requestAnimationFrame(animate);
}
        
animate();
