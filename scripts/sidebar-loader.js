(() => {
  const container = document.getElementById('sidebar-container');
  const isLessonPage = window.location.pathname.includes('/pages/');
  const introductionHref = isLessonPage
    ? 'course-introduction.html'
    : 'pages/course-introduction.html';
  const isIntroduction = document.body.dataset.pageId === 'course-introduction.html';

  if (container) {
    container.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-title">Master Data Management for Insurance</div>
        </div>
        <nav aria-label="Course navigation">
          <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
              <a class="sidebar-nav-link${isIntroduction ? ' active' : ''}"
                 href="${introductionHref}"${isIntroduction ? ' aria-current="page"' : ''}>
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"></path>
                  <path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20"></path>
                </svg>
                Course Introduction
              </a>
            </li>
          </ul>
        </nav>
      </aside>`;
  }

  const applyInfographicFallback = (image) => {
    if (image.dataset.fallbackApplied === 'true') {
      return;
    }

    image.dataset.fallbackApplied = 'true';

    const placeholder = document.createElement('div');
    placeholder.className = 'course-visual-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute(
      'aria-label',
      `Missing infographic: ${image.dataset.infographicTitle || 'Infographic unavailable'}`
    );

    const title = document.createElement('p');
    title.className = 'course-visual-placeholder-title';
    title.textContent = image.dataset.infographicTitle || 'Infographic unavailable';

    const detail = document.createElement('p');
    detail.className = 'course-visual-placeholder-text';
    detail.textContent = 'Infographic file is not available in this project yet.';

    placeholder.append(title, detail);
    image.replaceWith(placeholder);
  };

  document.querySelectorAll('.course-visual-image').forEach((image) => {
    image.addEventListener('error', () => applyInfographicFallback(image), { once: true });

    if (image.complete && image.naturalWidth === 0) {
      applyInfographicFallback(image);
    }
  });
})();