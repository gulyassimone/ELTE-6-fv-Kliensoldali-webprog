

//1. feladat belső linkek A landing page oldalon a navigációs fejlécben lévő belső linkekre kattintva az oldal gördülve menjen az adott helyre.

const navBar = document.querySelector('nav');
navBar.addEventListener('click', event =>{
    if(event.target.matches('a[href^="#"]')){
        event.preventDefault();
        const idSelector = event.target.hash;
        const anchorTarget = document.querySelector(idSelector);
        anchorTarget.scrollIntoView({behavior: 'smooth'});
    }
})

//2. feladat navigáció rögzítése Ha elgördült az oldal 200px-nyit, akkor alkalmazzuk a navbar-scrolled stílusosztályt a nav elemen. Ügyelj arra, hogy a scroll esemény nagyon sokszor hívódik meg!

function throttle(fn, time) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        return;
      }
      fn(...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, time);
    };
}

document.addEventListener('scroll', event => {
    const scrolledPxs = window.scrollY;
    if(scrolledPxs > 200) {
        navBar.classList.add('navbar-scrolled');
    } else{
        navBar.classList.remove('navbar-scrolled');
    }
},30);

//3. feladat animáció megjelenéskor Ha egy elem gördítés közben a viewportba ér, akkor valamilyen animáció segítségével jelenjen meg! Az elemeket deklaratívan jelöljük meg HTML5 data attribútumokat használva, pl. data-scroll. Az animáció nevét is eltárolhatod data attribútumban, pl. data-scroll-animation="fadeInUp". Animációhoz használhatod az animate.css könyvtárat (https://animate.style/). Ügyelj arra, hogy a scroll esemény nagyon sokszor hívódik meg!

const animationObserver = new IntersectionObserver(entries =>{
    entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
            const element = entry.target;
            element.classList.add('animate__animated');
            element.classList.add('animate__' + element.getAttribute('data-scroll-animation'));
        });
});


document.querySelectorAll('[data-scroll]').forEach(elem => {
    animationObserver.observe(elem);
});

//4.feladat folyamatsáv Helyezz el egy olvasási folyamatsávot az oldal tetején. A gördítés mértéke szerint változzon 0 és 100% között a szélessége!

document.addEventListener('scroll', throttle(() =>{
    const scrolled = window.scrollY;
    const viewPortHeight = document.body.clientHeight;
    const scrollHeight = document.body.scrollHeight;
    const maxScroll = scrollHeight - viewPortHeight;
    const scrolledPercentage = scrolled/maxScroll * 100;

    document.querySelector('.loading').style.width = `${scrolledPercentage}%`;

}),30)

