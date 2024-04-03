window.addEventListener('scroll', function() {
    const imageContainers = document.querySelectorAll('section:not(.home) .image-container');
    const elems = document.querySelectorAll('section:not(.home, .section2) p, section:not(.home) .image-container img');
    const section2Paragraph = document.querySelector('.section2 p');
    // console.log(imageContainers);
    const position = section2Paragraph.getBoundingClientRect();
        
    if (position.top < window.innerHeight / 1.2) {
        section2Paragraph.classList.add('fade-in-bottom');
    } else if (position.top >= window.innerHeight) {
        section2Paragraph.classList.remove('fade-in-bottom');
    }

    imageContainers.forEach(e => {
        const position = e.getBoundingClientRect();
            
        if (position.top < window.innerHeight / 1.2) {
            e.classList.add('fade-in');
        } else if (position.top >= window.innerHeight) {
            e.classList.remove('fade-in');
        }
    });
    elems.forEach(e => {
        const position = e.getBoundingClientRect();
            
        if (position.top < window.innerHeight) {
            e.classList.add('fade-in-delayed');
        } else if (position.top >= window.innerHeight) {
            e.classList.remove('fade-in-delayed');
        }
    });
});