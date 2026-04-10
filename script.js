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

  topButton?.addEventListener("click", () => {
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

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".service-panel");

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-tab-target");

      tabButtons.forEach(function (item) {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tabPanels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.setAttribute("aria-hidden", "true");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("is-active");
        targetPanel.setAttribute("aria-hidden", "false");
      }
    });
  });

  const bannerSlides = document.querySelectorAll(".banner-slide");
  const bannerPages = document.querySelectorAll(".banner-page");
  const bannerPrev = document.getElementById("bannerPrev");
  const bannerNext = document.getElementById("bannerNext");

  let currentBannerIndex = 0;

  function setBanner(index) {
    bannerSlides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    bannerPages.forEach(function (page, pageIndex) {
      page.classList.toggle("is-active", pageIndex === index);
    });

    currentBannerIndex = index;
  }

  bannerPages.forEach(function (pageButton) {
    pageButton.addEventListener("click", function () {
      const index = Number(pageButton.getAttribute("data-banner-index"));
      setBanner(index);
    });
  });

  if (bannerPrev) {
    bannerPrev.addEventListener("click", function () {
      let nextIndex = currentBannerIndex - 1;
      if (nextIndex < 0) {
        nextIndex = bannerSlides.length - 1;
      }
      setBanner(nextIndex);
    });
  }

  if (bannerNext) {
    bannerNext.addEventListener("click", function () {
      let nextIndex = currentBannerIndex + 1;
      if (nextIndex >= bannerSlides.length) {
        nextIndex = 0;
      }
      setBanner(nextIndex);
    });
  }

  if (bannerSlides.length > 0) {
    setBanner(0);
  }
});

const slides = document.querySelectorAll(".family-page .banner-slide");
const pages = document.querySelectorAll(".family-page .banner-page");

let currentIndex = 0;
let bannerTimer = null;

function showBanner(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  pages.forEach((page, i) => {
    page.classList.toggle("is-active", i === index);
  });

  currentIndex = index;
}

function nextBanner() {
  if (slides.length === 0) return;
  const nextIndex = (currentIndex + 1) % slides.length;
  showBanner(nextIndex);
}

function startBannerAuto() {
  if (slides.length === 0) return;
  bannerTimer = setInterval(nextBanner, 3000);
}

function stopBannerAuto() {
  clearInterval(bannerTimer);
}

pages.forEach((page, index) => {
  page.addEventListener("click", () => {
    showBanner(index);
    stopBannerAuto();
    startBannerAuto();
  });
});

if (slides.length > 0) {
  showBanner(0);
  startBannerAuto();
}

const closeBtn = document.querySelector(".family-top-close");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

/* ================================
   PAGE DATA
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const selectedUser = localStorage.getItem("selectedUser") || "indexsa";

  const PAGE_CARD_DATA = {
    index: {
      userName: "김종혁님"
    },

    indexsa: {
      name: "김지형",
      rrnFront: "050421",
      rrnBackMasked: "*******",
      rrnBackFull: "3561416",
      region: "전라남도 장성군",
      address: "장성읍 문화로 21-34, 203동 804호(영천 휴먼시아)",
      issueDate: "2024.02.29",
      issuer: "전라남도 장성군수",
      profileImage: "./assets/bang.jpeg"
    },

    indexsb: {
      name: "오대우",
      rrnFront: "050611",
      rrnBackMasked: "*******",
      rrnBackFull: "3623437",
      region: "전라남도 장성군",
      address: "장성읍 대창1길 16-1",
      issueDate: "2022.07.06",
      issuer: "전라남도 장성군수",
      profileImage: "./assets/bang.jpeg"
    },

    indexsc: {
      name: "김현준",
      rrnFront: "050318",
      rrnBackMasked: "*******",
      rrnBackFull: "3661211",
      region: "광주광역시 북구",
      address: "용두마을2길 12, 103동 1802호 (용두동, 첨단진아리채)",
      issueDate: "2024.12.31",
      issuer: "광주광역시 북구청장",
      profileImage: "./assets/jong.jpeg"
    },

    indexsd: {
      name: "최민기",
      rrnFront: "050203",
      rrnBackMasked: "*******",
      rrnBackFull: "3144311",
      region: "대구광역시 수성구",
      address: "달구벌대로 77, 305동 1502호",
      issueDate: "2024.01.20",
      issuer: "대구광역시 수성구청장",
      profileImage: "./assets/bang.jpeg"
    },

    indexse: {
      name: "장석두",
      rrnFront: "890412",
      rrnBackMasked: "*******",
      rrnBackFull: "1559223",
      region: "광주광역시 광산구",
      address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
      issueDate: "2021.05.10",
      issuer: "광주광역시 광산구청장",
      profileImage: "./assets/jong.jpeg"
    },

    indexsf: {
      name: "정치영",
      rrnFront: "890625",
      rrnBackMasked: "*******",
      rrnBackFull: "1559223",
      region: "광주광역시 광산구",
      address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
      issueDate: "2021.05.10",
      issuer: "광주광역시 광산구청장",
      profileImage: "./assets/jong.jpeg"
    },

    indexsg: {
      name: "최승준",
      rrnFront: "050131",
      rrnBackMasked: "*******",
      rrnBackFull: "3158724",
      region: "광주광역시 광산구",
      address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
      issueDate: "2021.05.10",
      issuer: "광주광역시 광산구청장",
      profileImage: "./assets/bang.jpeg"
    },

    indexsh: {
      name: "정대영",
      rrnFront: "830627",
      rrnBackMasked: "*******",
      rrnBackFull: "1560011",
      region: "경기도 파주시",
      address: "문산읍 방촌로 1660, 104동 409호",
      issueDate: "2019.01.21",
      issuer: "경기도 파주시청장",
      profileImage: "./assets/jong.jpeg"
    },

    indexsi: {
      name: "김병민",
      rrnFront: "900107",
      rrnBackMasked: "*******",
      rrnBackFull: "1559223",
      region: "광주광역시 광산구",
      address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
      issueDate: "2021.05.10",
      issuer: "광주광역시 광산구청장",
      profileImage: "./assets/jong.jpeg"
    },

    indexsj: {
      name: "편수진",
      rrnFront: "891215",
      rrnBackMasked: "*******",
      rrnBackFull: "2552312",
      region: "경기도 구리시",
      address: "산마루로46 갈매스타힐스 404동 1401호",
      issueDate: "2021.05.10",
      issuer: "경기도 구리시청장",
      profileImage: "./assets/minji.png"
    },

    indexsk: {
      name: "양연하",
      rrnFront: "890717",
      rrnBackMasked: "*******",
      rrnBackFull: "2552616",
      region: "광주광역시 북구",
      address: "문화소통로 108번길 8-3, 초원빌라 4층",
      issueDate: "2019.05.10",
      issuer: "광주광역시 북구청장",
      profileImage: "./assets/sun.jpeg"
    },

    indexsl: {
      name: "박시원",
      rrnFront: "890717",
      rrnBackMasked: "*******",
      rrnBackFull: "2552616",
      region: "광주광역시 북구",
      address: "문화소통로 108번길 8-3, 초원빌라 4층",
      issueDate: "2019.05.10",
      issuer: "광주광역시 북구청장",
      profileImage: "./assets/bang.jpeg"
    },

    indexs: {
      name: "홍성환",
      rrnFront: "890928",
      rrnBackMasked: "*******",
      rrnBackFull: "1144311",
      region: "광주광역시 광산구",
      address: "수등로123번길 22 (신가동, 아름마을휴먼시아2단지아파트) 205동 701호",
      issueDate: "2021.05.10",
      issuer: "광주광역시 광산구청장",
      profileImage: "./assets/user1.jpg"
    }
  };

  const directPages = [
    "indexsa", "indexsb", "indexsc", "indexsd", "indexse",
    "indexsf", "indexsg", "indexsh", "indexsi", "indexsj",
    "indexsk", "indexsl"
  ];

  const cardData =
    page === "index"
      ? PAGE_CARD_DATA[selectedUser]
      : page === "indexs"
      ? PAGE_CARD_DATA[selectedUser]
      : directPages.includes(page)
      ? PAGE_CARD_DATA[page]
      : PAGE_CARD_DATA[selectedUser];

  if (!cardData) return;

  if (page === "index") {
    const userNameEl = document.querySelector(".topbar-user-name");
    if (userNameEl) {
      userNameEl.textContent = `${cardData.name}님`;
    }
    return;
  }

  let qrRefreshCount = 0;

  function setRealVh() {
    document.documentElement.style.setProperty("--app-vh", `${window.innerHeight * 0.01}px`);
  }

function renderDetailInfo() {
  const mount = document.getElementById("detailInfoMount");
  if (!mount) return;

  mount.innerHTML = `
    <div class="detail-fixed-name" id="detailName">${cardData.name}</div>

    <input type="checkbox" id="switch" hidden />

    <label for="switch" class="switch_label detail-fixed-switch">
      <span class="onf_btn"></span>
    </label>

    <div class="detail-fixed-rrn">
      ${cardData.rrnFront}-<span id="idNumber">${cardData.rrnBackMasked}</span>
    </div>

    <div class="detail-fixed-address">
      <div id="fullRegion">${cardData.region}</div>
      <div id="userLocation"></div>
    </div>

    <div class="modal-bottom">
      <h4 id="issueDate">${cardData.issueDate}</h4>
      <p id="issuerName">${cardData.issuer}</p>
    </div>
  `;
}
console.log("page =", page);
console.log("selectedUser =", selectedUser);
console.log("cardData =", cardData);

  
  function applyCardData() {
    const mainName = document.getElementById("mainName");
    const mainRegion = document.getElementById("mainRegion");
    const detailName = document.getElementById("detailName");
    const issueDate = document.getElementById("issueDate");
    const issuerName = document.getElementById("issuerName");
    const profileImage = document.getElementById("profileImage");
    const detailProfileImage = document.getElementById("detailProfileImage");

    if (mainName) mainName.textContent = cardData.name;
    if (mainRegion) mainRegion.textContent = cardData.region;
    if (detailName) detailName.textContent = cardData.name;
    if (issueDate) issueDate.textContent = cardData.issueDate;
    if (issuerName) issuerName.textContent = cardData.issuer;
    if (profileImage) profileImage.src = cardData.profileImage;
    if (detailProfileImage) detailProfileImage.src = cardData.profileImage;
  }

  function updateText() {
    const checkbox = document.getElementById("switch");
    const idNumber = document.getElementById("idNumber");
    const userLocation = document.getElementById("userLocation");

    if (!checkbox || !idNumber || !userLocation) return;

    if (checkbox.checked) {
      idNumber.textContent = cardData.rrnBackFull;
      userLocation.textContent = " " + cardData.address;
    } else {
      idNumber.textContent = cardData.rrnBackMasked;
      userLocation.textContent = "";
    }
  }

  function updateTime() {
    const now = new Date();
    const formattedTime =
      `${now.getFullYear()}년${String(now.getMonth() + 1).padStart(2, "0")}월${String(now.getDate()).padStart(2, "0")}일 ` +
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const timeEl = document.getElementById("current-time");
    if (timeEl) timeEl.textContent = formattedTime;
  }

  function updateQrCode() {
    const now = new Date();
    const token = Math.floor(now.getTime() / 30000);

    const qrValue = `user=${cardData.name}|region=${cardData.region.replace(/\s/g, "")}|token=${token}`;
    const qrImg = document.getElementById("QR_img");
    const qrOverlay = document.querySelector(".qr-overlay");

    if (!qrImg) return;

    qrImg.src =
      `https://api.qrserver.com/v1/create-qr-code/?size=250x250&ecc=H&color=000000&bgcolor=ffffff&data=${encodeURIComponent(qrValue)}`;

    qrRefreshCount += 1;

    if (qrRefreshCount >= 5) {
      if (qrOverlay) qrOverlay.style.display = "block";
      qrImg.style.opacity = "0.2";
    } else {
      if (qrOverlay) qrOverlay.style.display = "none";
      qrImg.style.opacity = "1";
    }
  }

  function resetQr() {
    qrRefreshCount = 0;
    updateQrCode();
  }

  renderDetailInfo();
  applyCardData();
  updateText();
  updateTime();
  updateQrCode();
  setRealVh();

  window.addEventListener("resize", setRealVh);
  window.addEventListener("orientationchange", setRealVh);

  const openBtn = document.querySelector(".js-click-modal");
  const closeBtn = document.querySelector(".js-close-detail");
  const mainBox = document.querySelector(".box_main");
  const modal = document.querySelector(".modal");
  const progress = document.getElementById("jb");
  const timeText = document.querySelector(".progressbar_time");
  const qrOverlay = document.querySelector(".qr-overlay");

  if (qrOverlay) {
    qrOverlay.style.display = "none";
    qrOverlay.addEventListener("click", resetQr);
  }

  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "switch") {
      updateText();
    }
  });

  openBtn?.addEventListener("click", () => {
    if (mainBox) mainBox.style.display = "none";
    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }
  });

  closeBtn?.addEventListener("click", () => {
    if (mainBox) mainBox.style.display = "flex";
    if (modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }

    const checkbox = document.getElementById("switch");
    if (checkbox) checkbox.checked = false;
    updateText();
  });

  let count = 30;
  if (progress) progress.value = count;
  if (timeText) timeText.textContent = `${count}초`;

  setInterval(() => {
    count -= 1;

    if (count < 0) {
      count = 30;
      updateQrCode();
    }

    if (progress) progress.value = count;
    if (timeText) timeText.textContent = `${count}초`;
  }, 1000);

  setInterval(updateTime, 1000);
});

/* =========================================
   SAFE ROUTER + QR CLICK FIX
   기존 JS 맨 아래에 추가
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop() || "";

  /* ---------------------------------
     1) 파일 순서 라우팅
  --------------------------------- */
const routeMap = {
  "index.html": "menu.html",
  "menu.html": "mobile-id-card.html"
};

function getSelectedUserPage() {
  return (localStorage.getItem("selectedUser") || "indexs") + ".html";
}

function goNextPage(currentFile) {
  // 마지막 페이지 분기 (여기 핵심)
  if (currentFile === "mobile-id-card.html") {
    window.location.href = getSelectedUserPage();
    return;
  }

  const nextFile = routeMap[currentFile];
  if (!nextFile) return;

  window.location.href = nextFile;
}

  /* ---------------------------------
     2) 클릭 막는 레이어 해제
  --------------------------------- */
  function forceReleaseBlockingLayer() {
    const selectors = [
      ".mid-dim",
      ".mid-modal",
      "#modalOverlay",
      "#drawerOverlay",
      ".quick-modal-dim",
      ".policy-modal-dim",
      ".land-policy-modal-dim",
      ".channel-modal-dim",
      ".land-channel-modal-dim",
      "#loadingOverlay"
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.classList.remove("is-open", "is-active");
        el.hidden = true;
        el.style.pointerEvents = "none";
      });
    });

    document.body.classList.remove("is-locked");
    document.body.style.overflow = "";
  }

  /* ---------------------------------
     3) mobile-id-card.html 에서
        QR / 상세정보표시 클릭 막힘 방지
  --------------------------------- */
  if (path === "mobile-id-card.html") {
    forceReleaseBlockingLayer();

    requestAnimationFrame(() => {
      forceReleaseBlockingLayer();
    });

    setTimeout(() => {
      forceReleaseBlockingLayer();
    }, 250);
  }



  /* ---------------------------------
     5) QR / 상세정보표시 클릭 허용
  --------------------------------- */
  const qrSelectors = [
    ".qr",
    ".qr-code",
    ".qr-image",
    ".mid-card-qr",
    ".detail-qr",
    ".detail-info-qr",
    ".mobile-id-qr",
    "[data-role='qr']",
    "[data-action='show-detail']",
    ".mid-card-toggle",
    ".detail-toggle",
    ".show-detail-btn",
    ".detail-info-btn"
  ];

  function bindSafeClick(selector, handler) {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.pointerEvents = "auto";

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        forceReleaseBlockingLayer();
        handler?.(e, el);
      });
    });
  }

  qrSelectors.forEach((sel) => {
    bindSafeClick(sel, () => {});
  });

  /* ---------------------------------
     6) 페이지별 다음 연결
  --------------------------------- */
  const nextButtonSelectorsByPage = {
    "index.html": [
      ".menu",
      ".open-menu",
      ".all-menu-link",
      "a[href='./menu.html']",
      "a[href='menu.html']"
    ],
    "menu.html": [
      ".resident-check-section a",
      ".allmenu-section-grid a[href='./mobile-id-card.html']",
      ".allmenu-section-grid a[href='mobile-id-card.html']",
      "a[href='./mobile-id-card.html']",
      "a[href='mobile-id-card.html']"
    ],
    "mobile-id-card.html": [
      ".mid-card",
      ".mid-card-wrap",
      ".detail-info-open",
      ".show-detail-btn",
      ".mid-modal-confirm",
      "button[data-next='indexsl.html']",
      "a[href='indexsl.html']",
      "a[href='./indexsl.html']"
    ]
  };

  const targets = nextButtonSelectorsByPage[path] || [];

  targets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("click", (e) => {
        const tag = el.tagName.toLowerCase();
        const href = el.getAttribute("href");

        if (tag === "a" && href && href !== "#" && href !== "") return;

        e.preventDefault();
        e.stopPropagation();
        forceReleaseBlockingLayer();
        goNextPage(path);
      });
    });
  });

  /* ---------------------------------
     7) menu -> mobile-id-card 충돌 방지
  --------------------------------- */
  if (path === "menu.html") {
    document.querySelectorAll("a[href$='.html']").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (
        href.includes("mobile-id-card.html") ||
        href.includes("./mobile-id-card.html")
      ) {
        link.addEventListener("click", () => {
          forceReleaseBlockingLayer();
        });
      }
    });
  }
});
