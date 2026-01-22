// #cover 타원 애니메이션
const dot = document.querySelector('#ellipse_container .dot')
const container = document.querySelector('#ellipse_container .ellipse_wrap')
console.log(dot, container);
let theta = 0;

function animate() {
    theta += 0.008;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;
    let a, b; // 타원 가로, 세로 반지름

    const winWidth = window.innerWidth;
    if (winWidth > 1250) {
        // PC
        a = 500; // 1000px의 절반
        b = 250; // 500px의 절반
    } else if (winWidth > 950) {
        // 태블릿
        a = 400;
        b = 200;
    } else if (winWidth > 800) {
        // 작은 태블릿
        a = 350;
        b = 160;
    } else if (winWidth > 700) {
        // 큰 모바일
        a = 300;
        b = 140;
    } else if (winWidth > 500) {
        // 작은 모바일
        a = 220;
        b = 110;
    } else {
        // 모바일
        a = 180;
        b = 90;
    }
    const x = cx + a * Math.cos(theta) - dot.clientWidth / 2;
    const y = cy + b * Math.sin(theta) - dot.clientHeight / 2;
    dot.style.left = x + "px";
    dot.style.top = y + "px";

    requestAnimationFrame(animate);
}

animate();

// #cover explore 버튼 클릭 시 페이지 이동, 부드럽게
const exploreBtn = document.querySelector('.scroll_btn > a')
const aboutMePage = document.querySelector('#about_me')
const main = document.querySelector('main')

exploreBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    main.scrollTo(0,aboutMePage.offsetTop);
})


//graphics 클릭 시 크게 보이게

const thumbnailA = document.querySelectorAll('#graphics .poster_design') //작은 포스터 썸네일 - a 태그
const grayBg = document.querySelector('.gray_bg')
const modalContent = document.querySelector('.modal_content')

console.log(thumbnailA, modalContent);
console.log(grayBg)
thumbnailA.forEach(poster => {
    poster.addEventListener('click',(e)=>{
        e.preventDefault();
        designSwiper.autoplay.stop();
        grayBg.style.display = 'flex';

        const clickedImg = poster.querySelector('img');
        const imgSrc = clickedImg.getAttribute('src');

        const newImg = document.createElement('img');
        newImg.src = imgSrc;
        newImg.alt = clickedImg.alt;

        modalContent.innerHTML = "";
        modalContent.appendChild(newImg);
        
    })
})
grayBg.addEventListener('click',(e)=>{
    if (e.target === grayBg) {
        grayBg.style.display = 'none';
        designSwiper.autoplay.start();
    }
})

//반응형 피그마 주소
/* const figmaBtn = document.querySelectorAll('.figma_btn > a')
const figmaSet = document.querySelectorAll('.prototype_figma_set')
figmaBtn.forEach(button => {
    button.addEventListener('click', ()=>{

    })
}) */
