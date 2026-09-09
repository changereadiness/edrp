(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const homeGrid = document.getElementById('equipment-grid');
  const heroPanel = document.getElementById('featured-listing');
  const homeSearch = document.getElementById('home-search');
  const homeCategory = document.getElementById('home-category');
  const homeSearchBtn = document.getElementById('home-search-btn');

  const esc = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function listingBadge(item) {
    if (item.sample) return '<span class="sample-badge">Sample listing</span>';
    if (item.verified) return '<span class="verified">✓ Verified</span>';
    return '';
  }

  function homeCard(item) {
    const location = [item.city, item.country].filter(Boolean).join(', ') || 'Location on request';
    return `<a class="listing-card" href="listing.html?id=${encodeURIComponent(item.id)}">
      <div class="card-visual"><span>${esc(item.id)}</span></div>
      <div class="card-body">
        <p class="card-category">${esc(item.category)}</p>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.specification || `${item.manufacturer} ${item.model}`)} · ${esc(item.condition)}</p>
        <div class="card-meta"><span>${esc(location)}</span>${listingBadge(item)}</div>
      </div>
    </a>`;
  }

  function wireHomeSearch() {
    if (!homeSearchBtn) return;
    const go = () => {
      const params = new URLSearchParams();
      if (homeSearch && homeSearch.value.trim()) params.set('q', homeSearch.value.trim());
      if (homeCategory && homeCategory.value) params.set('category', homeCategory.value);
      const suffix = params.toString() ? `?${params}` : '';
      window.location.href = `browse.html${suffix}`;
    };
    homeSearchBtn.addEventListener('click', go);
    if (homeSearch) homeSearch.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  }

  wireHomeSearch();

  if (!homeGrid && !heroPanel) return;
  fetch('data/inventory.json')
    .then(r => { if (!r.ok) throw new Error(`Inventory request failed: ${r.status}`); return r.json(); })
    .then(items => {
      const visible = items.filter(x => x.status === 'Active' || x.sample === true);
      const featured = visible.filter(x => x.featured).slice(0, 3);
      const cards = featured.length ? featured : visible.slice(0, 3);
      if (homeGrid) {
        homeGrid.innerHTML = cards.length ? cards.map(homeCard).join('') : '<div class="empty-state"><h3>No equipment published yet.</h3><p>Verified inventory will appear here as it is added.</p></div>';
      }
      const lead = cards[0];
      if (heroPanel && lead) {
        heroPanel.href = `listing.html?id=${encodeURIComponent(lead.id)}`;
        heroPanel.querySelector('[data-featured-id]').textContent = lead.id;
        heroPanel.querySelector('[data-featured-badge]').textContent = lead.sample ? 'Sample listing' : (lead.verified ? '✓ EDRP Verified' : 'Listing');
        heroPanel.querySelector('[data-featured-title]').textContent = `${lead.manufacturer} ${lead.model}`.trim() || lead.title;
        heroPanel.querySelector('[data-featured-spec]').textContent = `${lead.title} · ${lead.specification || lead.condition}`;
        heroPanel.querySelector('[data-featured-location]').textContent = [lead.city, lead.country].filter(Boolean).join(', ') || 'Location on request';
      }
    })
    .catch(err => {
      console.error(err);
      if (homeGrid) homeGrid.innerHTML = '<div class="empty-state"><h3>Equipment could not be loaded.</h3><p>Please refresh the page.</p></div>';
    });
})();
