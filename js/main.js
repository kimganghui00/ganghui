$(document).ready(function(){

  //header
  const header = document.querySelector("#header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("on");
    } else {
      header.classList.remove("on");
    }
  });

  //home ani
  const mainGroup = document.querySelector('.svg-main')
  const mainPaths = mainGroup.querySelectorAll('path')
  mainPaths.forEach((path, i) => {
    const length = path.getTotalLength()
    path.style.setProperty('--length', length)
    path.style.setProperty('--duration', length + 'ms')
    path.style.setProperty('--delay', i * 60 + 'ms')
  })


  //slide
  let swiper = new Swiper(".web-slide", {
    pagination: {
      el: ".swiper-pagination",
    },
  });


});  

//gnb
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu');
  const sections = document.querySelectorAll('section');
  
      function changeActiveMenuItem() {
        let index = sections.length;
  
            while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  
          menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
          if (index >= 0) {
            menuItems[index].classList.add('active');
        }
  }
  
      changeActiveMenuItem();
      window.addEventListener('scroll', changeActiveMenuItem);
  
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = document.getElementById(item.getAttribute('data-target'));
                window.scrollTo({
                  top: target.offsetTop,
                    behavior: 'smooth'
                });
          });
  });
});