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

//스크롤
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const sections = document.querySelectorAll('main section');
    
    if (sections.length === 0) return;

    const VIEWPORT_HEIGHT = window.innerHeight; // 100vh 값
    const COOLDOWN_DELAY = 500;                 // ⭐️ 쿨다운 시간: 연속 스크롤 방지 (ms)
    
    let lastScrollTime = 0; // 마지막 스크롤 발생 시간

    /**
     * @param {number} direction - 스크롤 방향 (-1: 위, 1: 아래)
     * CSS의 smooth 속성을 활용하여 목표 위치로 즉시 스크롤 명령을 내립니다.
     */
    function snapToNextSection(direction) {
        // 현재 스크롤 위치
        const currentScroll = mainContainer.scrollTop;
        
        // 이동할 섹션의 시작 위치 (100vh 단위로 이동)
        // 현재 위치에서 100vh를 더하거나 는 것이 아니라, 가장 가까운 100vh 단위 위치를 찾아야 합니다.
        
        // 현재 위치를 기준으로 가장 가까운 섹션 인덱스를 찾습니다.
        let currentIndex = Math.round(currentScroll / VIEWPORT_HEIGHT);
        
        // 목표 인덱스 계산
        let targetIndex = currentIndex + direction;

        // 경계 처리
        if (targetIndex < 0) {
            targetIndex = 0;
        } else if (targetIndex >= sections.length) {
            targetIndex = sections.length - 1;
        }

        // 목표 스크롤 위치 (섹션의 정확한 시작 지점)
        const targetY = targetIndex * VIEWPORT_HEIGHT; 

        // ⭐️ CSS의 scroll-behavior: smooth 속성이 부드러운 애니메이션을 담당합니다.
        mainContainer.scrollTo({
            top: targetY,
            behavior: 'smooth' 
        });
    }

    // ⭐️ 휠 이벤트 리스너 (쿨다운 적용) ⭐️
    mainContainer.addEventListener('wheel', (e) => {
        const currentTime = new Date().getTime();

        // 1. 쿨다운 체크 및 X축 스크롤 무시
        if (currentTime - lastScrollTime < COOLDOWN_DELAY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            return;
        }

        // 2. 브라우저의 기본 스크롤 동작 방지 (자석처럼 붙는 느낌을 주기 위해 필수)
        e.preventDefault(); 
        
        // 3. 쿨다운 시간 업데이트
        lastScrollTime = currentTime;

        // 4. 스크롤 방향 결정 및 스냅 실행
        const scrollDirection = Math.sign(e.deltaY); // -1: 위, 1: 아래

        snapToNextSection(scrollDirection);
        
    }, { passive: false }); 
});