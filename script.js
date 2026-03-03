const $ = (sel) => document.querySelector(sel);

function lockBody(lock) {
  document.body.classList.toggle("is-locked", !!lock);
}

function openDrawer() {
  const overlay = $("#drawerOverlay");
  const drawer = $("#drawer");
  const btn = $("#openDrawer");

  overlay.hidden = false;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  btn?.setAttribute("aria-expanded", "true");
  lockBody(true);

  // 포커스: 닫기 버튼으로
  $("#drawerClose")?.focus();
}

function closeDrawer() {
  const overlay = $("#drawerOverlay");
  const drawer = $("#drawer");
  const btn = $("#openDrawer");

  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  btn?.setAttribute("aria-expanded", "false");

  // 애니메이션 끝나고 overlay 숨김
  setTimeout(() => {
    overlay.hidden = true;
    lockBody(false);
  }, 180);

  btn?.focus();
}

function openMore() {
  const overlay = $("#modalOverlay");
  const modal = $("#moreModal");

  overlay.hidden = false;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  lockBody(true);

  $("#closeMore")?.focus();
}

function closeMore() {
  const overlay = $("#modalOverlay");
  const modal = $("#moreModal");

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    overlay.hidden = true;
    lockBody(false);
  }, 180);

  $("#openMore")?.focus();
}

// 검색 폼(데모)
$("#searchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("#q").value.trim();
  if (!q) return alert("검색어를 입력하세요.");
  alert(`"${q}" 검색 (데모)`);
});

// 이벤트 바인딩
$("#openDrawer")?.addEventListener("click", openDrawer);
$("#drawerClose")?.addEventListener("click", closeDrawer);
$("#drawerOverlay")?.addEventListener("click", closeDrawer);

$("#openMore")?.addEventListener("click", openMore);
$("#closeMore")?.addEventListener("click", closeMore);
$("#closeMore2")?.addEventListener("click", closeMore);
$("#modalOverlay")?.addEventListener("click", closeMore);

// ESC로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const drawerOpen = $("#drawer")?.classList.contains("is-open");
  const modalOpen = $("#moreModal")?.classList.contains("is-open");

  if (modalOpen) closeMore();
  else if (drawerOpen) closeDrawer();
});

// 드로어 안 데모 버튼
$("#drawerMockLogin")?.addEventListener("click", () => alert("로그인 (데모)"));
$("#drawerMockCert")?.addEventListener("click", () => alert("인증 (데모)"));