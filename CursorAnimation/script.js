let main = document.querySelector(".main");
let cursor = document.querySelector(".cursor");
let image = document.querySelector(".image");

main.addEventListener("mousemove", function (data) {
  gsap.to(cursor, {
    x: data.x,
    y: data.y,
    duration: 1,
  });
});

image.addEventListener("mouseenter", function () {
  cursor.innerHTML = "View More";
  gsap.to(cursor, {
    scale: 2,
    backgroundColor: "azure",
  });
});

image.addEventListener("mouseleave", function () {
  cursor.innerHTML = "";
  gsap.to(cursor, {
    scale: 1,
    backgroundColor: "white",
  });
});
