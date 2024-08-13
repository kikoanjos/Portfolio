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