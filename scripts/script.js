"use strict";

let radioInGalery = $(".galery-radio").find("input");
let photoContainer = $(".galery-photo-container").first();
let indexLastChanged = 0;
let interval;

function CheckRadio(photoContainer, indexLastChanged) {
  $(`.galery-radio input[type="radio"]:eq(${indexLastChanged})`).attr(
    "checked",
    "checked"
  );
  photoContainer.css("left", -1160 * indexLastChanged + "px");
}

function SwipeGalery() {
  indexLastChanged =
    indexLastChanged !=
    Array.from($('.galery-radio input[type="radio"]')).length - 1
      ? indexLastChanged + 1
      : 0;
  CheckRadio(photoContainer, indexLastChanged);
}

document.getElementById("galery-radio").addEventListener("change", (elem) => {
  indexLastChanged = Array.from($('.galery-radio input[type="radio"]')).indexOf(
    elem.target
  );
  photoContainer.css("left", -1160 * indexLastChanged + "px");

  clearInterval(interval);
  interval = setInterval(() => {
    SwipeGalery();
  }, 5000);
});

document.getElementById("galery-left").addEventListener("click", () => {
  indexLastChanged =
    indexLastChanged != 0
      ? indexLastChanged - 1
      : Array.from($('.galery-radio input[type="radio"]')).length - 1;
  CheckRadio(photoContainer, indexLastChanged);
});

document.getElementById("galery-right").addEventListener("click", () => {
  indexLastChanged =
    indexLastChanged !=
    Array.from($('.galery-radio input[type="radio"]')).length - 1
      ? indexLastChanged + 1
      : 0;
  CheckRadio(photoContainer, indexLastChanged);
});

// $('.back-for-animation').each(function(i, e){
//   $(this).on({'mouseenter': function(event) {
//       let count = 1;

//       const animate = () => {
//         event.target.style.height = 190 + count + 'px';
//         event.target.style.width = 260 + count + 'px';

//         count++;

//         if(count < 20){
//           requestAnimationFrame(animate)
//         }
//       }

//       requestAnimationFrame(animate);

//       event.target.css({
//         'height': '120%',
//         'width': '120%',
//         'background-color': '#fff'}
//       );
//     }
//   });
// });

// const animateBlockForWhom = (eventTarget, count) => {
//   let requestId;

//   const animate = () => {
//     eventTarget.style.height = 190 + count + "px";
//     eventTarget.style.width = 260 + count + "px";
//     eventTarget.style.transform = `translateX(${-count / 2}px) translateY(${
//       -count / 2
//     }px)`;
//     //alert(eventTarget.id)

//     if (count < 20) {
//       requestId = requestAnimationFrame(animate);
//       count += count > 0 ? 1 : -1;
//     } else cancelAnimationFrame(requestId);
//   };

//   requestId = requestAnimationFrame(animate);
// };

// $('.sensor').each(function(i, e){

//   $(this).on({
//     'mouseover': function(event) { animateBlockForWhom(event.target.closest('.for-whom-block-container').querySelector('.back-for-animation'), 1); },
//     'mouseout': function(event) { animateBlockForWhom(event.target.closest('.for-whom-block-container').querySelector('.back-for-animation'), -1); }
//   });
// });

///////////////////////////////////////////////////////////////

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// animate({
//   duration: 500,
//   timing(timeFraction) {
//     return timeFraction;
//   },
//   draw(progress) {
//     elem.style.width = elem.style.width + progress * 20 + "px";
//     eventTarget.style.height = elem.style.heigh + progress * 20 + "px";
//     eventTarget.style.transform = `translateX(${-10 * progress}px) translateY(${
//       -10 * progress
//     }px)`;
//   },
// });

$(".sensor").each(function (i, e) {
  $(this).on({
    'mouseover': function (event) {
      let elem = event.target.closest(".for-whom-block-container").querySelector(".back-for-animation");
      animate({
        duration: 300,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          elem.style.width = 260 + progress * 20 + "px";
          elem.style.height = 190 + progress * 20 + "px";
          elem.style.transform = `translateX(${-10 * progress}px) translateY(${-10 * progress}px)`;
        },
      });
    },

    'mouseout': function (event) {
      let elem = event.target.closest('a').closest(".for-whom-block-container").querySelector(".back-for-animation");
      animate({
        duration: 300,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          elem.style.width = 280 - progress * 20 + "px";
          elem.style.height = 210 - progress * 20 + "px";
          elem.style.transform = `translateX(${-10 * (1-progress)}px) translateY(${-10 * (1 - progress)}px)`;
        },
      });
    },
  });
});
