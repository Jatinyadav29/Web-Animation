const menuItems = [
  { label: "Vision", icon: "ion-eye-sharp", href: "#vision" },
  { label: "Portfolio", icon: "ion-layers-sharp", href: "#portfolio" },
  { label: "People", icon: "ion-person-sharp", href: "#people" },
  { label: "Insights", icon: "ion-browsers-sharp", href: "#insights" },
  { label: "Careers", icon: "ion-briefcase-sharp", href: "#careers" },
  { label: "About Us", icon: "ion-reader-sharp", href: "#about" },
];

let isOpen = false;
let isMenuAnimating = false;
let responsiveConfig = {};

function getResponsiveConfig() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const isMobile = viewportWidth < 768;
  const maxSize = Math.min(viewportWidth, viewportHeight) * 0.9;

  const menuSize = isMobile ? Math.min(maxSize, 480) : 700;

  return {
    menuSize: menuSize,
    center: menuSize / 2,
    innerRadius: menuSize * 0.08,
    outerRadius: menuSize * 0.42,
    contentRadius: menuSize * 0.28,
    isMobile: isMobile,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  responsiveConfig = getResponsiveConfig();

  const menu = document.querySelector(".circular-menu");
  const joystick = document.querySelector(".joystick");
  const nav = document.querySelector(".menu-overlay-nav");
  const menuOverlayFooter = document.querySelector(".menu-overlay-footer");
});

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createSegment(item, index, totalItems) {
  const segment = document.createElement("a");
  segment.href = item.href;
  segment.className = "menu-segment";

  const config = responsiveConfig;
  const anglePerSegment = 360 / totalItems;
  const startAngle = index * anglePerSegment;
  const centerAngle = startAngle + anglePerSegment / 2;

  const angleOffset = 5;
  const adjustedStartAngle = startAngle + angleOffset;
  const adjustedEndAngle = startAngle + anglePerSegment - angleOffset;

  const startRad = ((adjustedStartAngle - 90) * Math.PI) / 180;
  const endRad = ((adjustedEndAngle - 90) * Math.PI) / 180;
  const centerRad = ((centerAngle - 90) * Math.PI) / 180;

  const innerStart = {
    x: config.center + config.innerRadius * Math.cos(startRad),
    y: config.center + config.innerRadius * Math.sin(startRad),
  };

  const innerEnd = {
    x: config.center + config.innerRadius * Math.cos(endRad),
    y: config.center + config.innerRadius * Math.sin(endRad),
  };

  const outerStart = {
    x: config.center + config.outerRadius * Math.cos(startRad),
    y: config.center + config.outerRadius * Math.sin(startRad),
  };

  const outerEnd = {
    x: config.center + config.outerRadius * Math.cos(endRad),
    y: config.center + config.outerRadius * Math.sin(endRad),
  };

  const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

  segment.style.clipPath = `path('M ${innerStart.x} ${innerStart.y} L ${outerStart.x} ${outerStart.y} A ${config.outerRadius} ${config.outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${config.innerRadius} ${config.innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y} Z')`;

  segment.style.width = config.menuSize + "px";
  segment.style.height = config.menuSize + "px";
  segment.style.position = "absolute";
  segment.style.top = "0";
  segment.style.left = "0";
  segment.style.opacity = "0";

  const contentX = config.center + config.contentRadius * Math.cos(centerRad);
  const contentY = config.center + config.contentRadius * Math.sin(centerRad);

  const offsetX = contentX - config.center;
  const offsetY = contentY - config.center;

  segment.innerHTML = `
        <div class="segment-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <i class="icon ${item.icon}"></i>
            <span>${item.label}</span>
        </div>
    `;

  return segment;
}

function toggleMenu() {
  if (isMenuAnimating) return;

  const menuOverlay = document.querySelector(".menu-overlay");
  const segments = document.querySelectorAll(".menu-segment");
  const joystick = document.querySelector(".joystick");
  const nav = document.querySelector(".menu-overlay-nav");
  const footer = document.querySelector(".menu-overlay-footer");

  isMenuAnimating = true;

  if (!isOpen) {
    isOpen = true;

    gsap.to(menuOverlay, {
      opacity: 1,
      duration: 0.5,
      pointerEvents: "auto",
    });

    gsap.to(joystick, {
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    if (nav && footer) {
      gsap.to([nav, footer], {
        opacity: 1,
        duration: 0.4,
        repeat: 1,
        yoyo: true,
        onComplete: () => {
          gsap.set([nav, footer], { opacity: 1 });
        },
      });
    }

    const shuffledIndices = shuffleArray(
      Array.from({ length: segments.length }, (_, i) => i),
    );

    shuffledIndices.forEach((originalIndex, newIndex) => {
      const segment = segments[originalIndex];
      const delay = newIndex * 0.05;

      gsap.fromTo(
        segment,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          delay: delay,
          onComplete: () => {
            if (newIndex === shuffledIndices.length - 1) {
              isMenuAnimating = false;
            }
          },
        },
      );
    });
  } else {
    isOpen = false;

    if (nav && footer) {
      gsap.to([nav, footer], {
        opacity: 0,
        duration: 0.2,
      });
    }

    gsap.to(joystick, {
      scale: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
    });

    const shuffledIndices = shuffleArray(
      Array.from({ length: segments.length }, (_, i) => i),
    );

    shuffledIndices.forEach((originalIndex, newIndex) => {
      const segment = segments[originalIndex];
      const delay = newIndex * 0.03;

      gsap.to(segment, {
        opacity: 0,
        duration: 0.2,
        delay: delay,
        onComplete: () => {
          if (newIndex === shuffledIndices.length - 1) {
            gsap.to(menuOverlay, {
              opacity: 0,
              duration: 0.3,
              pointerEvents: "none",
              onComplete: () => {
                isMenuAnimating = false;
              },
            });
          }
        },
      });
    });
  }
}

function initCenterDrag() {
  const joystick = document.querySelector(".joystick");
  const segments = document.querySelectorAll(".menu-segment");

  if (!joystick || segments.length === 0) return;

  let isDragging = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let activeSegment = null;

  const minThreshold = 30;
  const maxDragRange = 75;

  function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    gsap.set(joystick, {
      x: currentX,
      y: currentY,
    });

    if (isDragging) {
      const distance = Math.sqrt(currentX * currentX + currentY * currentY);

      if (distance > minThreshold) {
        let angle = Math.atan2(currentY, currentX) * (180 / Math.PI);
        angle = (angle + 90 + 360) % 360;

        const anglePerSegment = 360 / segments.length;
        const segmentIndex =
          Math.floor(angle / anglePerSegment) % segments.length;
        const newSegment = segments[segmentIndex];

        if (newSegment !== activeSegment) {
          if (activeSegment) {
            gsap.killTweensOf(activeSegment);
            gsap.to(activeSegment, { opacity: 1, duration: 0.2 });
            activeSegment.style.zIndex = "1";
          }

          activeSegment = newSegment;
          activeSegment.style.zIndex = "100";
          gsap.to(activeSegment, {
            opacity: 0.5,
            duration: 0.2,
          });
        }
      } else {
        if (activeSegment) {
          gsap.killTweensOf(activeSegment);
          gsap.to(activeSegment, { opacity: 1, duration: 0.2 });
          activeSegment.style.zIndex = "1";
          activeSegment = null;
        }
      }
    }

    requestAnimationFrame(animate);
  }

  joystick.addEventListener("mousedown", (e) => {
    isDragging = true;

    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    function handleDrag(event) {
      if (!isDragging) return;

      let deltaX = event.clientX - centerX;
      let deltaY = event.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > maxDragRange) {
        const scale = maxDragRange / distance;
        deltaX *= scale;
        deltaY *= scale;
      }

      if (distance < 5) {
        targetX = 0;
        targetY = 0;
      } else {
        targetX = deltaX;
        targetY = deltaY;
      }

      e.preventDefault();
    }

    function handleEnd() {
      isDragging = false;
      targetX = 0;
      targetY = 0;

      if (activeSegment) {
        gsap.to(activeSegment, {
          opacity: 1,
          duration: 0.3,
        });
        activeSegment.style.zIndex = "1";
        if (activeSegment.href) {
          window.location.href = activeSegment.href;
          toggleMenu();
        }
        activeSegment = null;
      }

      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleEnd);
    }

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleEnd);
  });

  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  responsiveConfig = getResponsiveConfig();

  const circularMenu = document.querySelector(".circular-menu");
  const joystick = document.querySelector(".joystick");
  const nav = document.querySelector(".menu-overlay-nav");
  const footer = document.querySelector(".menu-overlay-footer");
  const toggleBtn = document.querySelector(".menu-toggle-btn");
  const closeBtn = document.querySelector(".close-btn");

  if (!circularMenu) return;

  circularMenu.style.width = responsiveConfig.menuSize + "px";
  circularMenu.style.height = responsiveConfig.menuSize + "px";
  circularMenu.style.position = "relative";

  if (joystick)
    gsap.set(joystick, {
      scale: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
  if (nav && footer) gsap.set([nav, footer], { opacity: 0 });

  menuItems.forEach((item, index) => {
    const segment = createSegment(item, index, menuItems.length);
    circularMenu.appendChild(segment);
  });

  if (toggleBtn) toggleBtn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

  initCenterDrag();

  window.addEventListener("resize", () => {
    responsiveConfig = getResponsiveConfig();
    circularMenu.style.width = responsiveConfig.menuSize + "px";
    circularMenu.style.height = responsiveConfig.menuSize + "px";

    circularMenu.innerHTML = "";
    if (joystick) circularMenu.appendChild(joystick);

    menuItems.forEach((item, index) => {
      const segment = createSegment(item, index, menuItems.length);
      if (isOpen) segment.style.opacity = "1";
      circularMenu.appendChild(segment);
    });

    initCenterDrag();
  });
});
