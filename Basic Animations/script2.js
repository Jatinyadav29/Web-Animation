// gsap.to(".box1", {
//   x: 1200,
//   rotation: 360,
//   duration: 1.5,
//   delay: 1,
// });

// gsap.to(".box2", {
//   x: 1200,
//   rotation: 360,
//   duration: 1.5,
//   backgroundColor: "white",
//   delay: 2.5,
// });

let tl = gsap.timeline();

tl.to(".box1", {
  x: 1200,
  duration: 1.5,
  delay: 1,
  rotation: 360,
});

tl.to(".box2", {
  x: 1200,
  duration: 1.5,
  rotation: 150,
  backgroundColor: "white",
});

tl.to(".box3", {
  x: 1100,
  duration: 3,
  rotation: 260,
  borderRadius: "50%",
});
tl.to(".box4", {
  x: 1200,
  duration: 5,
  scale: 2,
  rotation: 930,
});
