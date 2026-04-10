const $ = (sel) => document.querySelector(sel);

function lockBody(lock) {
  document.body.classList.toggle("is-locked", !!lock);
}

/* ================================
   DRAWER
================================ */

function openDrawer() {
  const overlay = $("#drawerOverlay");
  const drawer = $("#drawer");
  const btn = $("#openDrawer");

  if (!overlay || !drawer) return;

  overlay.hidden = false;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  btn?.setAttribute("aria-expanded", "true");
  lockBody(true);

  $("#drawerClose")?.focus();
}

function closeDrawer() {
  const overlay = $("#drawerOverlay");
  const drawer = $("#drawer");
  const btn = $("#openDrawer");

  if (!overlay || !drawer) return;

  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  btn?.setAttribute("aria-expanded", "false");

  setTimeout(() => {
    overlay.hidden = true;
    lockBody(false);
  }, 180);

  btn?.focus();
}

/* ================================
   MORE MODAL
================================ */

function openMore() {
  const overlay = $("#modalOverlay");
  const modal = $("#moreModal");

  if (!overlay || !modal) return;

  overlay.hidden = false;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  lockBody(true);

  $("#closeMore")?.focus();
}

function closeMore() {
  const overlay = $("#modalOverlay");
  const modal = $("#moreModal");

  if (!overlay || !modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    overlay.hidden = true;
    lockBody(false);
  }, 180);

  $("#openMore")?.focus();
}

/* ================================
   QUICK MODAL
================================ */

function openQuickModal() {
  const modal = $("#quickModal");
  if (!modal) return;

  modal.removeAttribute("hidden");
  lockBody(true);
}

function closeQuickModal() {
  const modal = $("#quickModal");
  if (!modal) return;

  modal.setAttribute("hidden", "");
  lockBody(false);
}

/* ================================
   LOADING
================================ */

function showLoading() {
  const loading = $("#loadingOverlay");
  if (!loading) return;
  loading.classList.add("is-active");
}

function hideLoading() {
  const loading = $("#loadingOverlay");
  if (!loading) return;
  loading.classList.remove("is-active");
}

/* ================================
   COMMON EVENTS
================================ */

$("#searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("#q")?.value.trim();
  if (!q) return alert("검색어를 입력하세요.");
  alert(`"${q}" 검색 (데모)`);
});

$("#openDrawer")?.addEventListener("click", openDrawer);
$("#drawerClose")?.addEventListener("click", closeDrawer);
$("#drawerOverlay")?.addEventListener("click", closeDrawer);

$("#openMore")?.addEventListener("click", openMore);
$("#closeMore")?.addEventListener("click", closeMore);
$("#closeMore2")?.addEventListener("click", closeMore);
$("#modalOverlay")?.addEventListener("click", closeMore);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const drawerOpen = $("#drawer")?.classList.contains("is-open");
  const modalOpen = $("#moreModal")?.classList.contains("is-open");
  const quickModalOpen = $("#quickModal") && !$("#quickModal").hidden;

  if (quickModalOpen) closeQuickModal();
  else if (modalOpen) closeMore();
  else if (drawerOpen) closeDrawer();
});

$("#drawerMockLogin")?.addEventListener("click", () => {
  alert("로그인 (데모)");
});

$("#drawerMockCert")?.addEventListener("click", () => {
  alert("인증 (데모)");
});

/* ================================
   DOM READY
================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------
     ALLMENU MYGOV
  ---------------- */
  const mygovAccordions = document.querySelectorAll(".allmenu-mygov-accordion");
  const mygovToggles = document.querySelectorAll(".allmenu-mygov-toggle");

  mygovToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const currentAccordion = toggle.closest(".allmenu-mygov-accordion");
      if (!currentAccordion) return;

      const isOpen = currentAccordion.classList.contains("is-open");

      mygovAccordions.forEach((accordion) => {
        accordion.classList.remove("is-open");
      });

      if (!isOpen) {
        currentAccordion.classList.add("is-open");
      }
    });
  });

  /* ----------------
     ALLMENU CUSTOMER
  ---------------- */
  const customerAccordions = document.querySelectorAll(".allmenu-customer-accordion");
  const customerToggles = document.querySelectorAll(".allmenu-customer-toggle");

  customerToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const currentAccordion = toggle.closest(".allmenu-customer-accordion");
      if (!currentAccordion) return;

      const isOpen = currentAccordion.classList.contains("is-open");

      customerAccordions.forEach((accordion) => {
        accordion.classList.remove("is-open");
      });

      if (!isOpen) {
        currentAccordion.classList.add("is-open");
      }
    });
  });


/* ----------------
   MID MODAL
---------------- */
const midModalConfirmBtn = document.querySelector(".mid-modal-confirm");
const midModal = document.querySelector(".mid-modal");
const midModalDim = document.querySelector(".mid-dim");

function openMidModal() {
  midModal?.classList.add("is-open");
  midModalDim?.classList.add("is-open");
  lockBody(true);
}

function closeMidModal() {
  midModal?.classList.remove("is-open");
  midModalDim?.classList.remove("is-open");
  lockBody(false);
}

/* 🔥 이걸로 바꿔 */
openMidModal();

midModalConfirmBtn?.addEventListener("click", () => {
  closeMidModal();
});

  /* ----------------
     MID TIMER
  ---------------- */
  const remainingEl = document.querySelector("#midCardRemaining");
  const progressBarEl = document.querySelector("#midCardProgressBar");
  const nowEl = document.querySelector("#midCardNow");

  if (remainingEl && progressBarEl && nowEl) {
    const TOTAL_SECONDS = 30;
    let remainingSeconds = TOTAL_SECONDS;

    function formatNow(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}년${month}월${day}일 ${hours}:${minutes}:${seconds}`;
    }

    function renderTimer() {
      remainingEl.textContent = `${remainingSeconds}초`;
      nowEl.textContent = formatNow(new Date());

      const percent = (remainingSeconds / TOTAL_SECONDS) * 100;
      progressBarEl.style.width = `${percent}%`;
    }

    function resetTimer() {
      remainingSeconds = TOTAL_SECONDS;
      renderTimer();
    }

    renderTimer();

    setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds < 0) {
        resetTimer();
        return;
      }

      renderTimer();
    }, 1000);
  }

  /* ----------------
     LIFE GUIDE
  ---------------- */
  const guide = document.querySelector(".lifeguide-section");

  if (guide) {
    const tabs = guide.querySelectorAll(".lifeguide-tab");
    const panels = guide.querySelectorAll(".lifeguide-panel");
    const moreButtons = guide.querySelectorAll(".lifeguide-more");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const key = this.getAttribute("data-guide");

        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });

        panels.forEach(function (panel) {
          panel.hidden = true;
          panel.classList.remove("is-active");
          panel.classList.remove("is-open");

          const moreBtn = panel.querySelector(".lifeguide-more");
          if (moreBtn) {
            moreBtn.setAttribute("aria-expanded", "false");
          }
        });

        this.classList.add("is-active");
        this.setAttribute("aria-selected", "true");

        const target = guide.querySelector('.lifeguide-panel[data-panel="' + key + '"]');
        if (target) {
          target.hidden = false;
          target.classList.add("is-active");
        }
      });
    });

    moreButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const panel = this.closest(".lifeguide-panel");
        if (!panel) return;

        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.classList.toggle("is-open");
      });
    });
  }

  /* ----------------
     RESIDENT TOP BUTTON
  ---------------- */
const topButton = document.querySelector(".floating-top-btn");
const lifeGuideSection = document.querySelector(".lifeguide-section");

function toggleTopButton() {
  if (!topButton || !lifeGuideSection) return;

  const guideTop = lifeGuideSection.getBoundingClientRect().top;

  if (guideTop <= window.innerHeight - 120) {
    topButton.classList.add("is-visible");
  } else {
    topButton.classList.remove("is-visible");
  }
}

window.addEventListener("scroll", toggleTopButton);
toggleTopButton();

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

  /* ----------------
     QUICK MODAL EVENTS
  ---------------- */
  const quickOpenBtn = document.querySelector(".quick-section-more");
  const quickCloseBtn = document.getElementById("quickModalClose");
  const quickDim = document.querySelector(".quick-modal-dim");

  quickOpenBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickModal();
  });

  quickCloseBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeQuickModal();
  });

  quickDim?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeQuickModal();
  });
});



/* =========================
   분야별 정책정보 모달
========================= */
 document.addEventListener("DOMContentLoaded", () => {
  const policyOpenBtn =
    document.querySelector(".lower-links .lower-row:first-child") ||
    document.querySelector('.land-lower-row[data-modal-target="policy"]');

  const policyModal = document.getElementById("policyModal");

  const policyDim =
    document.querySelector(".policy-modal-dim") ||
    document.querySelector(".land-policy-modal-dim");

  const policyCloseBtn =
    document.querySelector(".policy-modal-close") ||
    document.querySelector(".land-policy-modal-close");

  if (!policyOpenBtn || !policyModal) return;

  function openPolicyModal() {
    policyModal.hidden = false;
    document.body.classList.add("is-locked");
  }

  function closePolicyModal() {
    policyModal.hidden = true;
    document.body.classList.remove("is-locked");
  }

  policyOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPolicyModal();
  });

  policyCloseBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closePolicyModal();
  });

  policyDim?.addEventListener("click", () => {
    closePolicyModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !policyModal.hidden) {
      closePolicyModal();
    }
  });
});


const channelModal = document.getElementById("channelModal");

document.addEventListener("click", (e) => {
  const secondLowerRow =
  e.target.closest(".lower-links .lower-row:nth-child(2)") ||
  e.target.closest('.land-lower-row[data-modal-target="channel"]');  
  if (secondLowerRow && channelModal) {
    channelModal.hidden = false;
    document.body.classList.add("is-locked");
  }

  const closeBtn = e.target.closest(
  ".channel-modal-close, .channel-modal-dim, .land-channel-modal-close, .land-channel-modal-dim"
);
  if (closeBtn && channelModal) {
    channelModal.hidden = true;
    document.body.classList.remove("is-locked");
  }
});


/* ================================
   AI BANNER CLICK
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const aiBar = document.querySelector(".ai-search-bar");
  if (!aiBar) return;

  aiBar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    aiBar.classList.add("is-clicked");
  });

  document.addEventListener("click", (e) => {
    if (!aiBar.contains(e.target)) {
      aiBar.classList.remove("is-clicked");
    }
  });
});
/* ================================
famaily
================================ */


document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.service-panel');

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const targetId = button.getAttribute('data-tab-target');

      tabButtons.forEach(function (item) {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });

      tabPanels.forEach(function (panel) {
        panel.classList.remove('is-active');
        panel.setAttribute('aria-hidden', 'true');
      });

      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
        targetPanel.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const bannerSlides = document.querySelectorAll('.banner-slide');
  const bannerPages = document.querySelectorAll('.banner-page');
  const bannerPrev = document.getElementById('bannerPrev');
  const bannerNext = document.getElementById('bannerNext');

  let currentBannerIndex = 0;

  function setBanner(index) {
    bannerSlides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('is-active', slideIndex === index);
    });

    bannerPages.forEach(function (page, pageIndex) {
      page.classList.toggle('is-active', pageIndex === index);
    });

    currentBannerIndex = index;
  }

  bannerPages.forEach(function (pageButton) {
    pageButton.addEventListener('click', function () {
      const index = Number(pageButton.getAttribute('data-banner-index'));
      setBanner(index);
    });
  });

  if (bannerPrev) {
    bannerPrev.addEventListener('click', function () {
      let nextIndex = currentBannerIndex - 1;
      if (nextIndex < 0) {
        nextIndex = bannerSlides.length - 1;
      }
      setBanner(nextIndex);
    });
  }

  if (bannerNext) {
    bannerNext.addEventListener('click', function () {
      let nextIndex = currentBannerIndex + 1;
      if (nextIndex >= bannerSlides.length) {
        nextIndex = 0;
      }
      setBanner(nextIndex);
    });
  }

  setBanner(0);
});


const slides = document.querySelectorAll('.family-page .banner-slide');
const pages = document.querySelectorAll('.family-page .banner-page');

let currentIndex = 0;
let bannerTimer = null;

function showBanner(index){
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });

  pages.forEach((page, i) => {
    page.classList.toggle('is-active', i === index);
  });

  currentIndex = index;
}

function nextBanner(){
  const nextIndex = (currentIndex + 1) % slides.length;
  showBanner(nextIndex);
}

function startBannerAuto(){
  bannerTimer = setInterval(nextBanner, 3000);
}

function stopBannerAuto(){
  clearInterval(bannerTimer);
}

pages.forEach((page, index) => {
  page.addEventListener('click', () => {
    showBanner(index);
    stopBannerAuto();
    startBannerAuto();
  });
});

showBanner(0);
startBannerAuto();

const closeBtn = document.querySelector('.family-top-close');

if(closeBtn){
  closeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

/* ================================
   PAGE DATA (🔥 핵심)
================================ */

const PAGE_DATA = {
  index: {
    userName: "김종혁님"
  },

  indexs: {
    name: "홍성환",
    region: "광주광역시 광산구",
    rrnFront: "890928",
    rrnBackFull: "1144311",
    address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
    issueDate: "2021.05.10",
    issuer: "광주광역시 광산구청장",
    profileImage: "https://i.postimg.cc/kGszy40D/photo-2026-04-04-00-34-29.jpg"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const data = PAGE_DATA[page];

  if (!data) return;

  /* =================
     index (상단 이름)
  ================= */
  if (page === "index") {
    const userNameEl = document.querySelector(".topbar-user-name");
    if (userNameEl) userNameEl.textContent = data.userName;
  }

  /* =================
     indexs (카드 전체)
  ================= */
  if (page === "indexs") {

    // 메인 카드
    document.getElementById("mainName").textContent = data.name;
    document.getElementById("mainRegion").textContent = data.region;

    // 프로필 이미지
    document.getElementById("profileImage").src = data.profileImage;
    document.getElementById("detailProfileImage").src = data.profileImage;

    // 모달 렌더
    const mount = document.getElementById("detailInfoMount");
    if (mount) {
      mount.innerHTML = `
        <div class="detail-fixed-name">${data.name}</div>

        <input type="checkbox" id="switch" hidden onchange="updateText()" />

        <label for="switch" class="switch_label detail-fixed-switch">
          <span class="onf_btn"></span>
        </label>

        <div class="detail-fixed-rrn">
          ${data.rrnFront}-<span id="idNumber">*******</span>
        </div>

        <div class="detail-fixed-address">
          ${data.region}
          <span id="userLocation">ㅤ<br />ㅤ</span>
        </div>

        <div class="modal-bottom">
          <h4>${data.issueDate}</h4>
          <p>${data.issuer}</p>
        </div>
      `;
    }

    // toggle 기능
    window.updateText = function () {
      const checkbox = document.getElementById("switch");
      const idNumber = document.getElementById("idNumber");
      const userLocation = document.getElementById("userLocation");

      if (!checkbox || !idNumber || !userLocation) return;

      if (checkbox.checked) {
        idNumber.innerHTML = data.rrnBackFull;
        userLocation.innerHTML = data.address;
      } else {
        idNumber.innerHTML = "*******";
        userLocation.innerHTML = "ㅤ<br>ㅤ";
      }
    };
  }
});
