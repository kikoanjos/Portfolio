// Scroll Horizontally
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let scrollAllowed = true;
    const scrollDelay = 700; // Tempo de espera em milissegundos

    // Função para habilitar rolagem após o atraso
    function enableScroll() {
        scrollAllowed = true;
    }

    document.addEventListener('wheel', function(event) {
        if (scrollAllowed) {
            // Prevent the default scroll behavior
            event.preventDefault();

            // Scroll horizontally based on vertical scroll amount
            container.scrollBy({
                left: event.deltaY,
                behavior: 'smooth' // Adiciona rolagem suave
            });

            // Bloqueia a rolagem temporariamente
            scrollAllowed = false;

            // Define um tempo de espera antes de permitir rolar novamente
            setTimeout(enableScroll, scrollDelay);
        }
    });

     // Função para rolar suavemente para a seção clicada
     document.querySelectorAll('.nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove o # do href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Função para as setas serem interagidas
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

    // Função para fazer as setas aparecerem
    const edgeThreshold = window.innerWidth / 4; // 25% da largura da tela

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const viewportWidth = window.innerWidth;

        sections.forEach((section) => {
            const leftArrow = section.querySelector('.left-arrow');
            const rightArrow = section.querySelector('.right-arrow');

            if (section.classList.contains("is-arrow-visible")) {
                // Mostrar a seta esquerda se o mouse estiver na parte esquerda da tela e existir a seta esquerda
                if (leftArrow && mouseX < edgeThreshold) {
                    leftArrow.classList.add('show-arrow');
                } else if (leftArrow) {
                    leftArrow.classList.remove('show-arrow');
                }

                // Mostrar a seta direita se o mouse estiver na parte direita da tela e existir a seta direita
                if (rightArrow && mouseX > viewportWidth - edgeThreshold) {
                    rightArrow.classList.add('show-arrow');
                } else if (rightArrow) {
                    rightArrow.classList.remove('show-arrow');
                }
            } else {
                // Ocultar ambas as setas se a secção não estiver totalmente visível
                if (leftArrow) leftArrow.classList.remove('show-arrow');
                if (rightArrow) rightArrow.classList.remove('show-arrow');
            }
        });
    }

    document.addEventListener('mousemove', handleMouseMove);

    // Função do IntersectionObserver para detectar visibilidade das secções
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-arrow-visible");

                    // Remover as setas da seção anterior
                    sections.forEach(section => {
                        if (section !== entry.target) {
                            const leftArrow = section.querySelector('.left-arrow');
                            const rightArrow = section.querySelector('.right-arrow');
                            if (leftArrow) leftArrow.classList.remove('show-arrow');
                            if (rightArrow) rightArrow.classList.remove('show-arrow');
                        }
                    });
                } else {
                    entry.target.classList.remove("is-arrow-visible");
                }
            });
        }, 
        {
            threshold: 0.5,
        }
    );   

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function() {
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
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.nav-links li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Ajuste o threshold conforme necessário

    sections.forEach(section => {
        observer.observe(section);
    });
});

