// ================= ELEMENT =================
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const openBtn = document.getElementById("openBook");

// ================= AUDIO =================
const klikA = new Audio("assets/klik.mp3");
klikA.preload = "none";
klikA.volume = 1;

const musikA = new Audio("assets/musik.mp3");
musikA.loop = true;
musikA.volume = 0.5;

// ================= FLIPBOOK =================
class FlipBook {
  constructor(bookElem) {
    this.elems = {
      book: bookElem,
      leaves: bookElem.querySelectorAll(".leaf"),
      buttons: {
        next: document.getElementById("nextPage"),
        prev: document.getElementById("prevPage")
      }
    };
    this.currentPagePosition = 0;
    this.setupEvents();
    this.turnPage(0);
  }

  setPagePosition(page, position, index) {
    let transform =
      "translate3d(0,0," + (position < 0 ? 1 : -1) * Math.abs(index) + "px)";
    if (position < 0) {
      transform += "rotate3d(0,1,0,-180deg)";
      page.classList.add("turned");
    } else {
      page.classList.remove("turned");
    }
    if (page.style.transform !== transform) {
      page.style.transform = transform;
    }
  }

  turnPage(delta) {
    this.currentPagePosition += delta;

    if (this.currentPagePosition < 0) {
      this.currentPagePosition = 0;
      return;
    }
    if (this.currentPagePosition > this.elems.leaves.length) {
      this.currentPagePosition = this.elems.leaves.length;
      return;
    }

    this.elems.leaves.forEach((page, index) => {
      this.setPagePosition(page, index - this.currentPagePosition, index);
    });

    if (this.currentPagePosition === 0) {
      this.elems.buttons.prev.setAttribute("disabled", "disabled");
    } else if (this.currentPagePosition === this.elems.leaves.length) {
      this.elems.buttons.next.setAttribute("disabled", "disabled");
    } else {
      this.elems.buttons.next.removeAttribute("disabled");
      this.elems.buttons.prev.removeAttribute("disabled");
    }
  }

  setupEvents() {
    document.getElementById("nextPage").addEventListener("click", () => {
      klikA.play().catch(() => {});
      this.turnPage(1);
    });
    document.getElementById("prevPage").addEventListener("click", () => {
      klikA.play().catch(() => {});
      this.turnPage(-1);
    });
  }
}

// ================= INIT =================
const flipBook = new FlipBook(document.getElementById("flipbook"));

// ================= OPEN BUTTON LOGIC =================

// STATE AWAL
prevBtn.style.display = "none";
nextBtn.style.display = "none";

let opened = false;

openBtn.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  // ▶️ AUDIO AMAN (USER INTERACTION)
  musikA.play().catch(() => {});
  klikA.play().catch(() => {});

  // 📖 BUKA BUKU = NEXT PERTAMA
  flipBook.turnPage(1);

  // 🎛️ TOGGLE BUTTON
  openBtn.style.display = "none";
  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";
});
