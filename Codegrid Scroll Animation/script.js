document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const spotlightImgFinalPos = [
    [-140, -140],
    [40, -130],
    [-160, 40],
    [20, 30],
  ];

  const spotlightImgs = document.querySelectorAll(".spotlight-img");

  ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top top",
    end: `+=${window.innerHeight * 6}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const initialRotation = [5, -3, 3.5, -1];
      const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3];

      spotlightImgs.forEach((img, index) => {
        let x = -50;
        let y = 200;
        let rotation = initialRotation[index];

        const phase1Start = phaseOneStartOffsets[index];
        const phase1End = Math.min(
          phase1Start + (0.45 - phase1Start) * 0.9,
          0.45
        );

        // ---- Phase 1: Entry ----
        if (progress >= phase1Start && progress <= 0.45) {
          const linearProgress =
            (progress - phase1Start) / (phase1End - phase1Start);
          const phase1Progress = 1 - Math.pow(1 - linearProgress, 3);
          y = 200 - phase1Progress * 250;
        } else if (progress > 0.45) {
          y = -50;
        }

        // ---- Phase 2: Final Position ----
        const phaseTwoStartOffsets = [0.5, 0.55, 0.6, 0.65];
        const phase2Start = phaseTwoStartOffsets[index];
        const phase2End = Math.min(
          phase2Start + (0.95 - phase2Start) * 0.9,
          0.95
        );
        const [finalX, finalY] = spotlightImgFinalPos[index];

        if (progress >= phase2Start && progress <= 0.95) {
          const linearProgress =
            (progress - phase2Start) / (phase2End - phase2Start);
          const phase2Progress = 1 - Math.pow(1 - linearProgress, 3);

          x = -50 + (finalX + 50) * phase2Progress;
          y = -50 + (finalY + 50) * phase2Progress;
          rotation = initialRotation[index] * (1 - phase2Progress);
        } else if (progress > 0.95) {
          x = finalX;
          y = finalY;
          rotation = 0;
        }

        gsap.set(img, {
          transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
        });
      });
    },
  });
});
