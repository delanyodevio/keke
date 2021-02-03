/**
 * window.onscroll = function () {
  makeStickyHeader();
};

const header = document.getElementById("stickyHeader");

let sticky = header.offSetTop;

function makeStickyHeader() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

 */
