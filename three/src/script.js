scroll({
    top: 0,
    behavior: "smooth"
});
document.getElementById('link').addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
});
document.querySelector('.connect').addEventListener('click', function(e){
    window.location.href = "http://localhost:3000/users";

});

document.querySelector('.scroller').addEventListener('click', function(e){
    scroll({
        top: 0,
        behavior: "smooth"
    });
});

let list = document.querySelector('.list');
let menu = document.querySelector('.menu');

menu.addEventListener('click', function(e){
    list.classList.contains('menu-active') ?   list.classList.remove('menu-active') : list.classList.toggle('menu-active');
    
})

list.addEventListener('load', function(e){
    console.log('huuuuuuu')
})


