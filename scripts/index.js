const menuOpen = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
menuOpen.addEventListener('click', e => {
    menu.dataset.open = menu.dataset.open == 'true' ? 'false' : 'true';
});

document.addEventListener('touchstart', (e) => {
    if (!menu.contains(e.target) && e.target !== menuOpen) {
        menu.dataset.open = 'false';
    }
});



let lastScrollTop = 0;
window.onscroll = function() {
    const header = document.querySelector('header');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;

    if (window.scrollY > 300) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
};

const carousel = document.querySelector('.product-container');
const carouselChildren = [...carousel.children];
const carouselControls = document.querySelectorAll('.crousel-control div')

const firstItemWidth = carousel.querySelector('.product').offsetWidth;

let itemPerView = Math.round(carousel.offsetWidth / firstItemWidth);

carouselChildren.slice(-itemPerView).reverse().forEach(i =>  {
    carousel.insertAdjacentHTML('afterbegin', i.outerHTML);
});
carouselChildren.slice(0, itemPerView).forEach(i =>  {
    carousel.insertAdjacentHTML('beforeend', i.outerHTML);
});

carouselControls.forEach(e => {
    e.addEventListener('click', () => {
        carousel.scrollLeft += e.id === "left" ? -firstItemWidth : firstItemWidth;

    });
});

carousel.scrollLeft = 40;
let isDragging = false, startX, startScrollLeft;
let autoScrollId;

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragStop = (e) => {
    isDragging = false;
    carousel.classList.remove('dragging');
}
const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const autoScroll = () => {
    autoScrollId = setTimeout(() => {
        carousel.scrollLeft += firstItemWidth
    }, 2000);
}

autoScroll();
const infiniteScroll = () => {
    if (carousel.scrollLeft===0) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.scrollWidth - (2*carousel.offsetWidth);
        carousel.classList.remove('no-transition')
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition')
    }

    clearInterval(autoScrollId);
    if (!carousel.matches(':hover')) autoScroll();

}


carousel.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragStop);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('scroll', infiniteScroll);








// const items = document.querySelectorAll('.product');
// const firstItem = items[0];
// const lastItem = items[items.length - 1];
// const cloneFirst = firstItem.cloneNode(true);
// const cloneLast = lastItem.cloneNode(true);

// carousel.appendChild(cloneFirst);
// carousel.appendChild(cloneLast);
// carousel.insertBefore(cloneLast, firstItem);

// let scrollAmount = 0;
// const itemWidth = firstItem.getBoundingClientRect().width;

// function autoScroll() {
//   if (scrollAmount < carousel.scrollWidth - itemWidth) {
//         requestAnimationFrame(autoScroll);
//         scrollAmount += 4;  // Adjust speed as needed
//         carousel.scrollLeft = scrollAmount;
//   } else {
//         scrollAmount = 0;
//         carousel.scrollLeft = scrollAmount;
//   }
// }

// autoScroll();