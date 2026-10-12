const container = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = 8;
let currentSlide = 0;

function nextSlide() {
    if (currentSlide < totalSlides - 1) currentSlide++;
    else currentSlide = 0;
    goToSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    container.scrollTo({ top: window.innerHeight * index, behavior: 'smooth' });
    updateActiveSlide(index);
}

function updateActiveSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) slide.classList.add('active');
        else slide.classList.remove('active');
    });

    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });

    const navIcon = document.getElementById('navIcon');
    if (index === totalSlides - 1) {
        // 위쪽 화살표 모양으로 변경
        navIcon.innerHTML = '<path d="M7 14l5-5 5 5"/>';
    } else {
        // 다시 아래쪽 화살표 모양으로 변경
        navIcon.innerHTML = '<path d="M7 10l5 5 5-5"/>';
    }
}

container.addEventListener('scroll', () => {
    const slideIndex = Math.round(container.scrollTop / window.innerHeight);
    if (slideIndex !== currentSlide) {
        currentSlide = slideIndex;
        updateActiveSlide(currentSlide);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    }
});