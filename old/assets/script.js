const sectionEls = document.querySelectorAll('.section');
const navEls = document.querySelectorAll('.navlink');
console.log(sectionEls);
sectionEls.forEach(sectionEl => {
        console.log(sectionEl.id);
    
});

console.log(navEls);
let currentSection = '';

window.addEventListener('scroll',()=>{
    sectionEls.forEach(sectionEl => {
        if(window.scrollY >= sectionEl.offsetTop-100){
            currentSection = sectionEl.id;
        }
    });

    navEls.forEach(navEl => {
        if(navEl.href.includes(currentSection)){
            document.querySelector('.active').classList.remove('active');
            navEl.classList.add('active');
        }
    });

});