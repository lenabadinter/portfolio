var lppModule = (function() {
  "use strict";
  function e() {
    const e = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        e
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4)
      )
    );
  }
  function t() {
    const t = navigator.userAgent.toLowerCase(),
      o = -1 != t.indexOf("safari") && -1 == t.indexOf("chrome");
    return o
      ? t.match(/ipad/i)
        ? f.SAFARI_DESKTOP
        : f.SAFARI_MOBILE
      : ((L = e()), L ? f.MOBILE : f.DESKTOP);
  }
  function o() {
    b
      ? (document.querySelector("body").classList.remove("main-nav-open"),
        document.querySelector("body").classList.add("main-nav-close"))
      : (document.querySelector("body").classList.remove("main-nav-close"),
        document.querySelector("body").classList.add("main-nav-open")),
      (b = !b);
  }
  function n() {
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? document.querySelector("body").classList.add("scrolled")
      : document.querySelector("body").classList.remove("scrolled"),
      document.querySelector(".hamburger").removeEventListener(v, o, !1),
      document.querySelector(".hamburger").addEventListener(v, o, !1);
    let e = q.length;
    for (; --e && window.scrollY + 80 < q[e].offsetTop; );
    E.forEach(e => e.classList.remove("active")), E[e].classList.add("active");
  }
  function c(e) {
    var t = this.parentElement;
    (t.style.opacity = "0"),
      setTimeout(() => {
        t.style.display = "none";
      }, 600);
  }
  function a(e) {
    if (!e.target.matches(".toggle-dropdown-btn")) {
      var t,
        o = document.querySelectorAll(".dropdown-content");
      for (t = 0; t < o.length; t++) {
        var n = o[t];
        n.classList.contains("show-dropdown-content") &&
          n.classList.remove("show-dropdown-content");
      }
    }
  }
  function r(e) {
    var t,
      o = document.querySelectorAll(".testimonial-slides");
    for (
      e > o.length && (w = 1), e < 1 && (w = o.length), t = 0;
      t < o.length;
      t++
    )
      o[t].style.display = "none";
    o[w - 1].style.display = "block";
  }
  function i(e) {
    e.target.classList.contains("prev")
      ? w--
      : e.target.classList.contains("next") && w++,
      r(w);
  }
  function s() {
    document
      .querySelector("#lang-dropdown")
      .classList.toggle("show-dropdown-content");
  }
  function l() {
    document.querySelector(".hamburger").addEventListener(v, o, !1),
      document.querySelector(".menu-overlay").addEventListener(v, o, !1),
      document.querySelector(".toggle-dropdown-btn").addEventListener(v, s, !1);
    const e = document.querySelectorAll(".close-alert-button");
    for (let t = 0; t < e.length; t++) e[t].addEventListener(v, c, !1);
    document.querySelector(".close-modal").addEventListener(v, g, !1),
      window.addEventListener(v, a);
    const t = document.querySelectorAll(".slide-button");
    t.forEach(e => {
      e.addEventListener(v, i, !1);
    });
  }
  function d() {
    const e = document.querySelector("#contact-form");
    e.addEventListener("submit", t => {
      t.preventDefault();
      const o = e.querySelector("input[name='email']").value;
      "" !== o ? e.submit() : alert("Please fill email address");
    });
    const t = document.querySelector("#bottom-contact-form");
    t.addEventListener("submit", e => {
      e.preventDefault();
      const o = t.querySelector("input[name='email']").value;
      "" !== o ? t.submit() : alert("Please fill email address");
    });
  }
  function m() {
    window.addEventListener("scroll", n, !1);
  }
  function u() {
    v =
      h === f.SAFARI_MOBILE || h === f.MOBILE
        ? "touchend"
        : (h === f.SAFARI_DESKTOP || f.DESKTOP, "click");
  }
  function p(e) {
    return e.split(".").pop();
  }
  function y() {
    (h = t()),
      (E =
        L || h === f.SAFARI_DESKTOP || h === f.SAFARI_MOBILE
          ? document.querySelectorAll(".mobile-nav-item")
          : document.querySelectorAll(".desktop-nav-item")),
      h === f.SAFARI_DESKTOP || h === f.SAFARI_MOBILE
        ? document.querySelector("body").classList.add("safari")
        : document.querySelector("body").classList.add("not-safari"),
      h === f.SAFARI_DESKTOP || h === f.DESKTOP
        ? document.querySelector("body").classList.add("desktop")
        : (h !== f.SAFARI_MOBILE && h !== f.MOBILE) ||
          document.querySelector("body").classList.add("mobile"),
      u(),
      m(),
      l(),
      document.addEventListener("DOMContentLoaded", function() {
        setTimeout(() => {
          const e = document.querySelectorAll(".async-image");
          Array.from(e).map(e => {
            const t = new Image();
            let o = "",
              n = "";
            if ("PICTURE" === e.nodeName)
              (n = e.querySelector("img")), (o = n.currentSrc);
            else {
              const t = e.currentStyle || window.getComputedStyle(e, !1);
              o = t.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
            }
            (o = o.replace("-min", "")),
              t.addEventListener("load", t => {
                e.classList.remove("async-image");
                let n = "";
                if ("PICTURE" === e.nodeName) {
                  const t = p(o);
                  switch (t) {
                    case "webp":
                      n = "image/webp";
                      break;
                    case "jpg":
                      n = "image/jpg";
                      break;
                    case "png":
                      n = "image/png";
                  }
                  const c = e.querySelector(`source[type="${n}"]`);
                  c.srcset = o;
                } else e.style.backgroundImage = `url(${o})`;
              }),
              (t.src = o);
          });
        }, 0);
      }),
      d(),
      r(w);
  }
  function g() {
    S.style.display = "none";
  }
  let v = "click",
    b = !1,
    w = 1;
  const S = document.querySelector("#modal"),
    f = {
      UNKNOWN: 0,
      SAFARI_MOBILE: 1,
      SAFARI_DESKTOP: 2,
      MOBILE: 3,
      DESKTOP: 4
    };
  let h = f.UNKNOWN,
    L = !1,
    E = null;
  const q = document.querySelectorAll("section");
  return {
    init: function() {
      y();
    }
  };
})();
lppModule.init();
