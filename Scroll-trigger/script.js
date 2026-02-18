// gsap.from(".page1 .box1", {
//   scale: 0,
//   delay: 1,
//   duration: 1.5,
//   rotate: 360,
// });

// gsap.from(".page2 .box1", {
//   scale: 0,
//   duration: 1.5,
//   rotate: 360,
//   scrollTrigger: {
//     trigger: ".page2 .box1",
//     scroller: "body",
//     markers: true,
//     start: "top 60%",
//     end: "top 10%",
//     scrub: 2,
//     pin: true,
//   },
// });

// gsap.from(".page2 h1", {
//   opacity: 0,
//   duration: 2,
//   x: 500,
//   scrollTrigger: {
//     scroller: "body",
//     trigger: ".page2 h1",
//     start: "top 50%",
//     markers: true,
//   },
// });

// gsap.from(".page2 h2", {
//   opacity: 0,
//   duration: 2,
//   x: -500,
//   scrollTrigger: {
//     scroller: "body",
//     trigger: ".page2 h2",
//     start: "top 50%",
//     markers: true,
//   },
// });

gsap.to(".page2 h3", {
  transform: "translateX(-190%)",
  scrollTrigger: {
    trigger: ".page2",
    scroller: "body",
    marker: true,
    start: "top 0%",
    end: "top -150%",
    scrub: 2,
    pin: true,
  },
});
