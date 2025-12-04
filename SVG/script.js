let initialPath = `M 20 200 Q 500 200 980 200`;
let finalPath = `M 20 200 Q 500 200 980 200`;

let string = document.querySelector(".string");

string.addEventListener("mousemove", function (dets) {
  path = `M 20 200 Q ${dets.x} ${dets.y} 980 200`;
  gsap.to("svg path", {
    attr: {
      d: path,
      duration: 0.3,
      ease: "power3.out",
    },
  });
});

string.addEventListener("mouseleave", function () {
  gsap.to("svg path", {
    attr: { d: finalPath },
    duration: 1.5,
    ease: "elastic.out(1,0.2)",
  });
});
