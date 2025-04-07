// Scroll Horizontally
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let scrollAllowed = true;
    const scrollDelay = 700; // Delay (milliseconds)

    // Function to re-enable scrolling after the delay
    function enableScroll() {
        scrollAllowed = true;
    }

    // Listen for mouse wheel events
    document.addEventListener('wheel', function(event) {
        if (scrollAllowed) {
            event.preventDefault(); // Prevent the default vertical scroll behavior

            // Scroll the container horizontally by the amount of vertical scroll
            container.scrollBy({
                left: event.deltaY,
                behavior: 'smooth' // Smooth scrolling effect
            });

            scrollAllowed = false; // Temporarily disable scrolling

            setTimeout(enableScroll, scrollDelay); // Re-enable scrolling after the delay
        }
    });

    // Disable horizontal scroll when mouse is over the 'experience' section
    const resumeSections = document.querySelectorAll('#experience');

    resumeSections.forEach(section => {
        section.addEventListener('mouseover', () => {
            scrollAllowed = false;
        });
        section.addEventListener('mouseout', () => {
            scrollAllowed = true;
        });
    });
});

// Move trough sections using the navbar
document.addEventListener('DOMContentLoaded', () => {
     document.querySelectorAll('.nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default jump to section behavior
            const targetId = this.getAttribute('href').substring(1); // Get the target section's ID from the href attribute
            const targetSection = document.getElementById(targetId); // Find the section with the target ID

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the target section
            }
        });
    });
});

//Functions for the arrow controlls
document.addEventListener('DOMContentLoaded', () => {

    // Function for the arrows to be interacted
    const sections = document.querySelectorAll('section'); // Select all section elements
    sections.forEach((section, index) => {
        // Calculate previous and next section indexes
        const prevIndex = index > 0 ? index - 1 : sections.length - 1;
        const nextIndex = index < sections.length - 1 ? index + 1 : 0;
        
        const leftArrow = section.querySelector('.left-arrow');  // Select the left arrow in the section
        const rightArrow = section.querySelector('.right-arrow');  // Select the right arrow in the section
        
        // Add click event to the left arrow to scroll to the previous section
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
            });
        }
        // Add click event to the right arrow to scroll to the next section
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    const edgeThreshold = window.innerWidth / 4; // Threshold for showing arrows (25% of the window width)

    // Function to handle showing or hiding arrows based on mouse position
    function handleMouseMove(event) {
        const mouseX = event.clientX; // Get the mouse's X position
        const viewportWidth = window.innerWidth; // Get the viewport width

        sections.forEach((section) => {
            const leftArrow = section.querySelector('.left-arrow');  // Select the left arrow
            const rightArrow = section.querySelector('.right-arrow');  // Select the right arrow

            if (section.classList.contains("is-arrow-visible")) {  // Check if the section is active
                // Show or hide the left arrow based on mouse position
                if (leftArrow && mouseX < edgeThreshold) {
                    leftArrow.classList.add('show-arrow');
                } else if (leftArrow) {
                    leftArrow.classList.remove('show-arrow');
                }
                // Show or hide the right arrow based on mouse position
                if (rightArrow && mouseX > viewportWidth - edgeThreshold) {
                    rightArrow.classList.add('show-arrow');
                } else if (rightArrow) {
                    rightArrow.classList.remove('show-arrow');
                }
            } else {
                // Hide both arrows if the section is not active
                if (leftArrow) leftArrow.classList.remove('show-arrow');
                if (rightArrow) rightArrow.classList.remove('show-arrow');
            }
        });
    }

    document.addEventListener('mousemove', handleMouseMove); // Add mousemove event listener to control arrow visibility

    // Observer to detect when sections are visible
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-arrow-visible");  // Mark section as visible

                    // Hide arrows in all other sections
                    sections.forEach(section => {
                        if (section !== entry.target) {
                            const leftArrow = section.querySelector('.left-arrow');
                            const rightArrow = section.querySelector('.right-arrow');
                            if (leftArrow) leftArrow.classList.remove('show-arrow');
                            if (rightArrow) rightArrow.classList.remove('show-arrow');
                        }
                    });
                } else {
                    entry.target.classList.remove("is-arrow-visible");  // Mark section as not visible
                }
            });
        }, 
        {
            threshold: 0.5,  // 50% of the section must be visible for it to be considered "intersecting"
        }
    );

    sections.forEach(section => {
        observer.observe(section);  // Start observing each section
    });
});

// Detect visibility of sections' content to show or hide
document.addEventListener('DOMContentLoaded', function() {
    const autoShows = document.querySelectorAll(".autoShow");  // Select elements with the autoShow class
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("autoShowAnimationOn");  // Show animation when visible
                    entry.target.classList.remove("autoShowAnimationOff");  // Remove hiding class
                } else {
                    entry.target.classList.remove("autoShowAnimationOn");  // Remove animation when not visible
                    entry.target.classList.add("autoShowAnimationOff");  // Add hiding class
                }
            });
        }, 
        {
            threshold: 0.5,  // 50% of the element must be visible for the animation to trigger
        }
    );

    autoShows.forEach(autoShow => {
        observer.observe(autoShow);  // Start observing each autoShow element
    });
});

// Check what section is visible to underline the navbar content
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');  // Select all section elements
    const navLinks = document.querySelectorAll('.nav-links li a');  // Select all navbar links

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');  // Remove active class from all links
                });
                const activeLink = document.querySelector(`.nav-links li a[href="#${entry.target.id}"]`);  // Find the link corresponding to the visible section
                if (activeLink) {
                    activeLink.classList.add('active');  // Add active class to the current link
                }
            }
        });
    }, { threshold: 0.5 });  // 50% of the section must be visible to update the navbar

    sections.forEach(section => {
        observer.observe(section);  // Start observing each section
    });
});

// Show the content related to the active button
document.querySelectorAll('.resume-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' de todos os botões e seções
        document.querySelectorAll('.resume-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.resume-section').forEach(section => section.classList.remove('active'));

        // Adiciona 'active' ao botão e seção clicados
        button.classList.add('active');
        const sectionId = button.id.replace('btn-', '');
        document.getElementById(sectionId).classList.add('active');

        // Atualiza o título h3 de acordo com a seção ativa
        const titleElement = document.querySelector('.resume-right-side h3');
        if (sectionId === 'experience') {
            titleElement.textContent = 'My Experience';
        } else if (sectionId === 'education') {
            titleElement.textContent = 'My Education';
        } else if (sectionId === 'skills') {
            titleElement.textContent = 'My Skills';
        } else if (sectionId === 'bio') {
            titleElement.textContent = 'My Bio';
        }
    });
});

// Animation of the type writting
document.addEventListener('DOMContentLoaded', function() {
    const dynamicText = document.querySelector(".dynamic-txt span");
    const words = ["Informatic Enginner", "Eletronics Technician"];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let noText = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicText.textContent = currentChar;
        dynamicText.classList.add("stop-blink");

        if(!isDeleting && charIndex < currentWord.length) {
            if(charIndex > 0){
                dynamicText.classList.remove("blink-up");
            }
            // Type characters
            charIndex++;
            setTimeout(typeEffect, 100);
        }
        else if(isDeleting && charIndex > 0) {
            // Remove characters
            charIndex--;
            setTimeout(typeEffect, 80);
        }
        else {
            if(noText === false){
                dynamicText.classList.remove("blink-up");
                noText = !noText;
            }
            else{
                dynamicText.classList.add("blink-up");
                noText = !noText;
            }
            // Switch to next word
            isDeleting = !isDeleting;
            dynamicText.classList.remove("stop-blink");
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
            setTimeout(typeEffect, 1800);
        }
    }
    typeEffect();
});

// Work projects slideshow
document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            number: "01",
            title: "Projeto CC++",
            description: "Application of detection of object using IfraRed Sensor and Buzzer",
            applications: "Arduino Uno, C++",
            course: "Eletronics Technician",
            show: "video/Projeto_CC++_Rodrigo_Anjos_I170211.mp4"
        },
        {
            number: "02",
            title: "Projeto AutoCad",
            description: "Descrição do projeto 2...",
            applications: "",
            course: "Eletronics Technician",
            show: "video/Rodrigo_Anjos_I170211.mp4"
        },
        {
            number: "03",
            title: "Projeto Circuitos",
            description: "Descrição do projeto 3...",
            applications: "",
            course: "Eletronics Technician",
            show: "video/Tarefa_2_Rodrigo_Anjos_I170211.mp4"
        },
        {
            number: "04",
            title: "Projeto Semáforos",
            description: "Descrição do projeto 4...",
            applications: "",
            course: "Eletronics Technician",
            show: "video/Tarefa_3_Rodrigo_Anjos_I170211.mp4"
        },
        {
            number: "05",
            title: "Projeto Web B2B",
            description: "Descrição do projeto 5...",
            applications: "",
            course: "Informatic Enginner",
            show: "img/B2B_IMG_1.jpg"
        }
    ];

    let currentIndex = 0;

    function updateProject() {
        document.getElementById("project-number").textContent = projects[currentIndex].number;
        document.getElementById("project-title").textContent = projects[currentIndex].title;
        document.getElementById("project-description").textContent = projects[currentIndex].description;
        document.getElementById("project-applications").textContent = projects[currentIndex].applications;
        document.getElementById("project-course").textContent = projects[currentIndex].course;
        
        const videoElement = document.getElementById("project-video");
        const imageElement = document.getElementById("project-image");

        if (projects[currentIndex].show.endsWith(".mp4")) {
                videoElement.innerHTML = `<source src="${projects[currentIndex].show}" type="video/mp4">`;
                videoElement.load(); // Recarrega o vídeo para refletir a mudança

                videoElement.style.display = "block";
                imageElement.style.display = "none";
        }
        else {
            imageElement.src = projects[currentIndex].show;

            imageElement.style.display = "block";
            videoElement.style.display = "none";
        };
    }

    document.getElementById("prevBtn").addEventListener("click", function() {
        currentIndex = (currentIndex === 0) ? projects.length - 1 : currentIndex - 1;
        updateProject();
    });

    document.getElementById("nextBtn").addEventListener("click", function() {
        currentIndex = (currentIndex === projects.length - 1) ? 0 : currentIndex + 1;
        updateProject();
    });

    updateProject();
});

// Character count for message form
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("message").addEventListener("input", function() {
        let charCount = this.value.length;
        document.getElementById("charCounter").textContent = charCount + "/240";
    });
});

// Form sender to email
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.success || result.error);
});