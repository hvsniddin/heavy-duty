let homePageChanger;

window.addEventListener('scroll', function() {
    const productExamples = document.querySelectorAll('.product-examples>*');
    productExamples.forEach(e => {
        const position = e.getBoundingClientRect();
        
        if (position.top < window.innerHeight / 2 && position.bottom > window.innerHeight / 2) {
            e.classList.add('shadow');
        } else if (position.top >= window.innerHeight || position.bottom <= 0) {
            e.classList.remove('shadow');
        }
    });
        
    const glitter = document.querySelector('.glitter');
    const about = document.querySelectorAll('.about>div');
    [...about, glitter].forEach(e => {
        const position = e.getBoundingClientRect();
        
        if (position.top < window.innerHeight / 2 && position.bottom > window.innerHeight / 2) {
            e.classList.add('fade-in-side');
        } else if (position.top >= window.innerHeight || position.bottom <= 0) {
            e.classList.remove('fade-in-side');
        }
    });
    
    const glitter2 = document.querySelector('.glitter2');
    const glitter2Position = glitter2.getBoundingClientRect();
    
    if (glitter2Position.top < window.innerHeight / 2 && glitter2Position.bottom > window.innerHeight / 2) {
        glitter2.classList.add('fade-in-side-glitter2');
    } else if (glitter2Position.top >= window.innerHeight || glitter2Position.bottom <= 0) {
        glitter2.classList.remove('fade-in-side-glitter2');
    }
    
    const products = document.querySelector('.products');
    const productsPosition = products.getBoundingClientRect();
    
    if (productsPosition.top < window.innerHeight + 200) {
        products.classList.add('fade-in-top');
    } else if (productsPosition.top >= window.innerHeight || productsPosition.bottom <= 0) {
        products.classList.remove('fade-in-top');
    }
});

const imagesContainer = document.querySelector('.home .page .image-container .wrapper');
const imageSize = imagesContainer.children[1].offsetWidth;

let currPage = 0;
const counters = document.querySelectorAll('.counter')

const textElem = document.querySelector('.subtitle span');
const texts = ['Yuqori sifatli', 'Talabgir', 'Chidamli']
const reverseString = (str) => { 
    const strRev =  str.split('').reverse().join(''); 
    return strRev
} 
const changeText = (ind) => {
    // textElem.textContent = texts[i];
    const currText = textElem.textContent;
    const newText = texts[ind];
    let i = currText.length;

    let removeInterval = setInterval(() => {
        if (i <= 0) {
            clearInterval(removeInterval);

            let j = 0;
            let addInterval = setInterval(() => {
                if (j >= newText.length) {
                    clearInterval(addInterval);
                } else {
                    textElem.innerText += newText[j];
                    j++;
                }
            }, 50);
        } else {
            i--;
            textElem.innerText = currText.slice(0, i);
        }
    }, 50);


    
}

homePageChanger = setInterval(() => {
    if (imagesContainer.scrollLeft >= imagesContainer.scrollWidth - imagesContainer.clientWidth) {
        imagesContainer.scrollLeft=0;

        counters[currPage].dataset.active = 'false';
        if (currPage==2) {
            currPage = 0;
        }
        counters[currPage].dataset.active = 'true';

        changeText(currPage);
    } else {
        imagesContainer.scrollLeft+=imageSize;
        counters[currPage].dataset.active = 'false';
        currPage+=1;
        counters[currPage].dataset.active = 'true';
        changeText(currPage);
    }
}, 3500);

// setTimeout(() => {
//     changeText(2)
// }, 1000);