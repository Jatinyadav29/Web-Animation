// gsap.to(".box1", {
//   x: 1000,
//   y: 500,
//   duration: 3,
//   delay: 1,
//   rotation: 360,
//   scale: 2,
//   borderRadius: "50%",
//   backgroundColor: "blue",
// });

// gsap.from(".box2", {
//   x: 400,
//   y: 600,
//   duration: 3,
//   delay: 1,
//   rotation: -180,
//   scale: 4,
//   borderRadius: "50%",
//   backgroundColor: "yellow",
// });

// gsap.to(".box3", {
//   x: 800,
//   y: 300,
//   duration: 3,
//   delay: 1,
//   scale: 3,
//   rotation: 720,
//   borderRadius: "50%",
//   backgroundColor: "green",
// });

// gsap.from(".box4", {
//   x: 600,
//   y: 400,
//   duration: 3,
//   delay: 1,
//   scale: 0.5,
//   rotation: -360,
//   backgroundColor: "orange",
//   borderRadius: "50%",
// });

gsap.to("h1", {
  opacity: 0,
  color: "green",
  duration: 2,
  delay: 1,
  x: 100,
  y: 100,
  stagger: -0.5,
  repeat: 3,
  yoyo: true,
});

gsap.from(".box1,.box2,.box3,.box4", {
  x: 1200,
  y: 500,
  borderRadius: "50%",
  duration: 3,
  scale: 2,
  delay: 1,
  rotation: 360,
  repeat: -1,
  yoyo: true,
});
