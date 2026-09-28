async function loadCasesData() {
  const res = await fetch("/data/cases.json", { cache: "no-store" });
  if (!res.ok) throw new Error("無法載入工程案例資料");
  return res.json();
}

function youtubeId(url) {
  if (!url) return "";
  const m = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/
  );
  return m ? m[1] : "";
}

function isVideoUrl(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || !!youtubeId(url);
}

function mediaSrc(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
  return "/" + path.replace(/^\.?\//, "");
}

function renderNavCasesDropdown(categories, currentPath) {
  const links = document.querySelector(".links");
  if (!links || links.querySelector(".nav-cases")) return;

  const homePrefix = currentPath && currentPath.includes("/cases/") ? "../" : "";
  const adminPrefix = currentPath && currentPath.includes("/admin/") ? "../" : homePrefix;

  const wrap = document.createElement("div");
  wrap.className = "nav-cases";
  wrap.innerHTML = `
    <a class="nav-cases-trigger" href="${homePrefix}cases/">工程案例</a>
    <div class="nav-cases-menu">
      <a href="${homePrefix}cases/">全部案例</a>
      ${categories
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(
          (c) =>
            `<a href="${homePrefix}cases/category.html?slug=${encodeURIComponent(c.slug)}">${c.name}</a>`
        )
        .join("")}
    </div>
  `;

  const contact = Array.from(links.querySelectorAll("a")).find(
    (a) => a.getAttribute("href") === "#contact" || a.getAttribute("href") === `${homePrefix}index.html#contact` || a.textContent.includes("聯絡")
  );
  if (contact) links.insertBefore(wrap, contact);
  else {
    const callBtn = links.querySelector(".call-btn");
    if (callBtn) links.insertBefore(wrap, callBtn);
    else links.appendChild(wrap);
  }

  // Fix home links when on subpages
  if (homePrefix) {
    links.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.setAttribute("href", homePrefix + "index.html" + a.getAttribute("href"));
    });
    const logo = document.querySelector(".logo");
    if (logo && (logo.getAttribute("href") === "#" || logo.getAttribute("href") === "./")) {
      logo.setAttribute("href", homePrefix + "index.html");
    }
  }
}
