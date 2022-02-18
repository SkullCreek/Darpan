window.onload = () => {
    let loader_con = document.getElementById("loader-con");
    let load = document.getElementById("loader");
    var t1 = gsap.timeline();
    gsap.ticker.lagSmoothing();
    t1.to('#loader', {scale: 400, duration: .8});
    load.style.animation = "none";
    t1.to('#loader-con', {duration: 1.5, ease: "expo.out", y: -innerHeight});
    t1.to('#loader-con', {display: 'none', duration:0});
    t1.from("#name", {duration: 1, ease: "back.out(1)", xPercent:-100, opacity:0}, 1);
    t1.from(".webgl", {duration: 1.4, ease: "back.out(.2)", xPercent:-100, opacity:0}, "-=1");
    t1.from(".webgl2", {duration: 1.4, ease: "back.out(.2)", xPercent:100, opacity:0}, "-=1");
    t1.from("#portfolio-heading", {duration: 1, ease: "back.out(1)", xPercent:100}, 1);
    // t1.from("#scrollbar-ind", {duration: .1, ease: "back.out(1)", y:100}, "-=.5");

}


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

// const scroll_bg = () => {
//     let black = document.getElementById("black-ball");
//     let white = document.getElementById("white-ball");
//     let body_con = document.getElementById("fullpage");
//     body_con.onscroll = () => {
//         // console.log(body_con.scrollTop);
//         if(body_con.scrollTop >= innerHeight/5){
//             black.style.transition = "transform 1s ease-in-out";
//             black.style.transform = `translate(-35%,35%)`;
//             white.style.transition = "transform 1s ease-in-out";
//             white.style.transform = `translate(28%,5%)`;
//         }
//         else{
//             black.style.transition = "transform 1s ease-in-out";
//             black.style.transform = `translate(-20%, -3%)`;
//             white.style.transition = "transform 1s ease-in-out";
//             white.style.transform = `translate(46%, 30%)`;
//         }
//         let sec_bar = document.getElementById("sec-bar");
//             let first_bar = document.getElementById("first-bar");
//         if(body_con.scrollTop >= innerHeight/2){
//             sec_bar.style.transition = "transform 1s ease-in-out";
//             sec_bar.style.width = "100%";
//             first_bar.style.transition = "transform 1s ease-in-out";
//             first_bar.style.width = "60%";
//         }
//         else{
//             sec_bar.style.transition = "transform 1s ease-in-out";
//             sec_bar.style.width = "60%";
//             first_bar.style.transition = "transform 1s ease-in-out";
//             first_bar.style.width = "100%";
//         }
//     }
// }
// scroll_bg();


// const theme = () => {
//     let theme_btn = document.getElementById("light-dark-mode-btn");
//     theme_btn.onclick = () => {
//         let theme_icon = document.getElementById("theme-icon");
//         document.documentElement.style.setProperty('--dark', '#ECECEC');
//         document.documentElement.style.setProperty('--light', '#161313');
//         theme_icon.src = "img/icons/dark.svg";
//         let black = document.getElementById("black-ball");
//         let white = document.getElementById("white-ball");
//         black.style.transition = "transform 1s ease-in-out";
//         black.style.transform = `translate(46%, 30%)`;
//         white.style.transition = "transform 1s ease-in-out";
//         white.style.transform = `translate(-20%, -3%)`;
//     }
// }

// theme();

// mouse tracker
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

var view = document.querySelector("#portfolio-heading");

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

var word = [0,0,0,0,0,0,0,0,0];

var tl = new TimelineMax({ onUpdate: update })
  .to(word, 2, { "0": 26 * 3 + 15  }, 0)
  .to(word, 3, { "1": 26 * 3 + 14 }, 0)
  .to(word, 4, { "2": 26 * 3 + 17  }, 0)
  .to(word, 5, { "3": 26 * 3 + 19 }, 0)
  .to(word, 6, { "4": 26 * 3 + 5 }, 0)
  .to(word, 7, { "5": 26 * 3 + 14 }, 0)
  .to(word, 8, { "6": 26 * 3 + 11 }, 0)
  .to(word, 9, { "7": 26 * 3 + 8 }, 0)
  .to(word, 10, { "8": 26 * 3 + 14 }, 0);

update();

function update() {
  
  var html = "";
  
  for (var i = 0; i < word.length; i++) {    
    html += letters[Math.round(word[i]) % 26];
  }
  
  view.innerHTML = html;
}

