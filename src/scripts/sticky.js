window.onscroll = function () {
  makeHeaderSticky();
};

const header = document.querySelector("#stickyHeader");

let sticky = header.offSetTop;

function makeHeaderSticky() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
