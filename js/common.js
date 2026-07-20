// DevToolbox 공통 스크립트: 다크모드 토글
(function () {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  function currentTheme() {
    return document.documentElement.dataset.theme || "light";
  }

  function render() {
    btn.textContent = currentTheme() === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", currentTheme() === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
  }

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    render();
  });

  render();
})();

// 클립보드 복사 헬퍼
function copyText(text, msgEl) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(function () {
    if (msgEl) {
      msgEl.textContent = "클립보드에 복사되었습니다.";
      msgEl.className = "result-msg ok";
      setTimeout(function () { msgEl.textContent = ""; }, 2000);
    }
  });
}
