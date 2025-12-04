let tl = gsap.timeline();

tl.from(".nav", {
  x: -2000,
  duration: 1,
  opacity: 0,
  delay: 1,
  backgroundColor: "red",
});

tl.from(".logo", {
  duration: 1,
  opacity: 0,
  scale: 2,
});

tl.from(".nav-item", {
  duration: 1,
  opacity: 0,
  stagger: 0.5,
  scale: 2,
});
