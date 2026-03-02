const $ = (sel, root=document) = root.querySelector(sel);

const quickItems = [
  인감증명서, 토지(임야)대장, 주민등록등본(초본), 자동차등록원부,
  건축물대장, 가족관계증명서, 지방세납세증명, 건강보험자격득실확인서,
  여권 재발급, 전입신고, 출입국사실증명, 운전경력증명서
];

function openOverlay(el){
  el.classList.add(is-open);
  el.setAttribute(aria-hidden,false);
  document.body.style.overflow = hidden;
}
function closeOverlay(el){
  el.classList.remove(is-open);
  el.setAttribute(aria-hidden,true);
  document.body.style.overflow = ;
}

function buildQuickModal(){
  const grid = $(#quickModalGrid);
  grid.innerHTML = ;
  quickItems.forEach(name = {
    const btn = document.createElement(button);
    btn.type = button;
    btn.className = quick-item;
    btn.innerHTML = `div class=quick-name${name}divdiv class=quick-icondiv`;
    btn.addEventListener(click, () = closeOverlay($(#quickModal)));
    grid.appendChild(btn);
  });
}

document.addEventListener(DOMContentLoaded, () = {
  const quickModal = $(#quickModal);
  const menuSheet = $(#menuSheet);

  buildQuickModal();

  $(#btnQuickMore).addEventListener(click, () = openOverlay(quickModal));
  $(#btnQuickClose).addEventListener(click, () = closeOverlay(quickModal));
  quickModal.addEventListener(click, (e) = {
    if (e.target === quickModal) closeOverlay(quickModal);
  });

  $(#btnAllMenu).addEventListener(click, () = openOverlay(menuSheet));
  $(#btnMenuClose).addEventListener(click, () = closeOverlay(menuSheet));
  menuSheet.addEventListener(click, (e) = {
    if (e.target === menuSheet) closeOverlay(menuSheet);
  });

   ESC 닫기
  document.addEventListener(keydown, (e) = {
    if (e.key !== Escape) return;
    if (quickModal.classList.contains(is-open)) closeOverlay(quickModal);
    if (menuSheet.classList.contains(is-open)) closeOverlay(menuSheet);
  });
});