const autoShows = document.querySelectorAll(".autoShow")

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("autoShowAnimationOn");
                entry.target.classList.remove("autoShowAnimationOff");
            } else {
                entry.target.classList.remove("autoShowAnimationOn");
                entry.target.classList.add("autoShowAnimationOff");
            }
        })
}, 
    {
    threshold: 0.5,
    }
)   

autoShows.forEach(autoShow => {
    observer.observe(autoShow)
}) 




document.addEventListener('wheel', function(event) {
    // Prevent the default scroll behavior
    event.preventDefault();

    // Scroll horizontally based on vertical scroll amount
    document.querySelector('.container').scrollBy({
        left: event.deltaY,
        behavior: 'smooth' // Adiciona rolagem suave
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const prevIndex = index > 0 ? index - 1 : sections.length - 1;
        const nextIndex = index < sections.length - 1 ? index + 1 : 0;
        
        const leftArrow = section.querySelector('.left-arrow');
        const rightArrow = section.querySelector('.right-arrow');
        
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const leftArrows = document.querySelectorAll('.left-arrow');
    const rightArrows = document.querySelectorAll('.right-arrow');

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const viewportWidth = window.innerWidth;
        const edgeThreshold = viewportWidth / 4; // Metade da largura da tela

        if (mouseX < edgeThreshold) {
            // Mouse está na metade esquerda
            leftArrows.forEach(arrow => arrow.classList.add('show-arrow'));
        } else {
            leftArrows.forEach(arrow => arrow.classList.remove('show-arrow'));
        }

        if (mouseX > viewportWidth - edgeThreshold) {
            // Mouse está na metade direita
            rightArrows.forEach(arrow => arrow.classList.add('show-arrow'));
        } else {
            rightArrows.forEach(arrow => arrow.classList.remove('show-arrow'));
        }
    }

    document.addEventListener('mousemove', handleMouseMove);
});
