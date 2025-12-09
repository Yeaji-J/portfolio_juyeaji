// #cover 타원 애니메이션
const dot = document.querySelector('#ellipse_container .dot')
const container = document.querySelector('#ellipse_container .ellipse_wrap')
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

// #cover explore 버튼 클릭 시 페이지 이동, 부드럽게
const exploreBtn = document.querySelector('.scroll_btn > a')
const aboutMePage = document.querySelector('#about_me')
const main = document.querySelector('main')

exploreBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    main.scrollTo(0,aboutMePage.offsetTop);
})


// #cover 넘어가면서 header 배경 생기기
const header = document.querySelector('#header')
const headerBgChangePoint = aboutMePage.offsetTop;
console.log(header, aboutMePage, headerBgChangePoint)

function handleScroll(){
    const currentScrollY = main.scrollTop;

    if(currentScrollY >= headerBgChangePoint) {
        header.style.backgroundColor = "rgba(255,255,255,0.4)"
    }else {header.style.backgroundColor = 'transparent'};
    
}
main.addEventListener('scroll', handleScroll);
handleScroll(); 

// <iframe width="560" height="315" src="https://www.youtube.com/embed/7ps_rc0Gm_w?si=RCbd-dIiWW7tApQ9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

//조회수 top 5 기준 랜덤함수 돌리기

//graphics 클릭 시 크게 보이게
/* 
const graphicsSection = document.querySelector('#graphics')
console.log(designPoster, designSwiperSlide, graphicsSection);

designPoster.forEach(poster => {
    poster.addEventListener('click', e => {
        e.preventDefault();
        designSwiperSlide.style.width = "500px";
    designSwiperSlide.style.height = "800px";
        graphicsSection.style.backgroundColor = "rgba(0,0,0,0.4)"
    })
}) */

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