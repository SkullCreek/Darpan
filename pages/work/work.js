gsap.registerPlugin(ScrollTrigger);

window.onload = () => {
    let loader_con = document.getElementById("loader-con");
    let load = document.getElementById("loader");
    var t1 = gsap.timeline();
    gsap.ticker.lagSmoothing();
    t1.to('#loader', {scale: 400, duration: .8});
    load.style.animation = "none";
    t1.to('#loader-con', {duration: 1.5, ease: "expo.out", y: -innerHeight});
    t1.to('#loader-con', {display: 'none', duration:0});
}

gsap.set(".ball", {xPercent: -50, yPercent: -50});

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});


const menu = () => {
    const menu_bar = document.getElementById("menu-bar");
    menu_bar.onclick = () => {
        var t2 = gsap.timeline();
        t2.from("#menu", {duration: .5,ease: "circ.out", yPercent: -100});
        t2.from("#menu ul", {duration: .2, xPercent: -200});
        const items = document.querySelectorAll(".item");
        gsap.defaults({ duration: 0.3 });

        items.forEach(function (item, index) {
          const tl = gsap
            .timeline({ paused: true })
            .to(item.querySelector(".text"), {
              backgroundImage:"linear-gradient(90deg, var(--left) 0%, var(--left) 100%, var(--right) 100%)",
              duration: 0.5,
              ease: "power1",
              stagger: {
                each: 0.1,
                ease: "power2.out"
              }
            })
          item.addEventListener("mouseenter", () => tl.play());
          item.addEventListener("mouseleave", () => tl.reverse());
        });

        let menu_sec = document.getElementById("menu");
        let menubar_top = document.getElementsByClassName("menubar-top");
        let menubar_bottom = document.getElementsByClassName("menubar-bottom");
        let social_media = document.getElementsByClassName("social-media");
        menu_sec.style.display = "grid";
        menubar_top[0].style.transform = `rotate(45deg) translate(34%)`;
        menubar_top[0].style.transition = `.2s`;
        menubar_bottom[0].style.transform = `rotate(-45deg) translateX(34%)`;
        menubar_bottom[0].style.transition = `.2s`;
        social_media[0].style.zIndex = "-1";
        let buttons = document.getElementsByClassName("item");
        for(let i=0; i< buttons.length; i++){
          buttons[i].onclick = () => {
            menu_sec.style.display = "none";
            menubar_top[0].style.transform = `rotate(0deg) translate(0%)`;
            menubar_top[0].style.transition = `.2s`;
            menubar_bottom[0].style.transform = `rotate(0deg) translateX(0%)`;
            menubar_bottom[0].style.transition = `.2s`;
            social_media[0].style.zIndex = "30";
            menu();
          }
        }
        

        menu_bar.onclick = () => {
            menu_sec.style.display = "none";
            menubar_top[0].style.transform = `rotate(0deg) translate(0%)`;
            menubar_top[0].style.transition = `.2s`;
            menubar_bottom[0].style.transform = `rotate(0deg) translateX(0%)`;
            menubar_bottom[0].style.transition = `.2s`;
            social_media[0].style.zIndex = "30";
            menu();
        }

    }
}

menu();




(function () {
  var locoScroll = new LocomotiveScroll({
      el: document.querySelector('.scrollContainer'),
      smooth: true,
      
  });
  locoScroll.on('scroll', (args) => {
    let desk_menu = document.getElementById("desk-menu-a");
    let desk_menu_li = document.getElementById("desk-menu-li");
    let desk_menu_li2 = document.getElementById("desk-menu-li2");
    let facebook = document.getElementById("facebook");
    let linkedin = document.getElementById("linkedin");
    let github = document.getElementById("github");
    let twitter = document.getElementById("twitter");

    if(args.scroll.y >= window.innerHeight){
      desk_menu.style.color = "var(--dark)";
      desk_menu_li.style.backgroundColor = "var(--dark)";
      desk_menu_li2.style.backgroundColor = "var(--dark)";
      facebook.src = "../../img/socialMedia/facebook_dark.svg";
      linkedin.src = "../../img/socialMedia/linkedin_dark.svg";
      github.src = "../../img/socialMedia/github_dark.svg";
      twitter.src = "../../img/socialMedia/twitter_dark.svg";
    }
    else{
      desk_menu.style.color = "var(--light)";
      desk_menu_li.style.backgroundColor = "var(--light)";
      desk_menu_li2.style.backgroundColor = "var(--light)";
      facebook.src = "../../img/socialMedia/facebook.svg";
      linkedin.src = "../../img/socialMedia/linkedin.svg";
      github.src = "../../img/socialMedia/github.svg";
      twitter.src = "../../img/socialMedia/twitter.svg";
    }
});






  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".scrollContainer", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },

    pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
  });

  gsap.from(".move-up", {duration: 2 , ease: "back.out",y:200, opacity:0, 
    scrollTrigger: {
      trigger: "#img-work",
      scroller: ".scrollContainer"
    }
});

  const images = gsap.utils.toArray('.roller-item');

  const showDemo = () => {
    document.scrollingElement.scrollTo(0, 0);
    gsap.utils.toArray('.demo-gallery').forEach((section, index) => {
      const w = section.querySelector('.wrapper');
      console.log(w);
      const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
      gsap.fromTo(w, {  x  }, {
        x: xEnd,
        scrollTrigger: { 
          trigger: ".demo-gallery", 
          scroller: ".scrollContainer",
          scrub: 0.5 
        }
      });
    });
  }
  showDemo();


  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
})();