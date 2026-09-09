(() => {
  const grid = document.getElementById('listingGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const condition = document.getElementById('condition');
  const searchBtn = document.getElementById('searchBtn');
  const resultsNote = document.getElementById('resultsNote');
  let listings = [];

  const esc = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function imageMarkup(item) {
    const first = Array.isArray(item.images) && item.images.length ? item.images[0] : '';
    if (first) return `<div class="listing-image has-image"><img src="${esc(first)}" alt="${esc(item.title)}" loading="lazy"></div>`;
    return `<div class="listing-image"><span>${item.sample ? 'SAMPLE EQUIPMENT' : 'INDUSTRIAL EQUIPMENT'}</span></div>`;
  }

  function card(item) {
    const location = [item.city, item.country].filter(Boolean).join(', ') || 'Location on request';
    const badge = item.sample ? '<b class="sample-text">Sample</b>' : (item.verified ? '<b>EDRP Verified</b>' : '');
    return `<a class="listing-card" href="listing.html?id=${encodeURIComponent(item.id)}">
      ${imageMarkup(item)}
      <div class="listing-body">
        <div class="listing-meta"><span>${esc(item.category)}</span>${badge}</div>
        <h2>${esc(item.title)}</h2>
        <p>${esc(item.manufacturer)}${item.model ? ` · ${esc(item.model)}` : ''}</p>
        <div class="listing-details"><span>${esc(item.condition)}</span><span>${esc(location)}</span></div>
        <div class="listing-spec">${esc(item.specification || '')}</div>
        <div class="listing-id">${esc(item.id)}</div>
      </div>
    </a>`;
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const cat = category.value;
    const cond = condition.value;
    const filtered = listings.filter(item => {
      const hay = [item.id,item.title,item.company,item.manufacturer,item.model,item.category,item.country,item.city,item.specification,item.condition].join(' ').toLowerCase();
      return (!q || hay.includes(q)) && (!cat || item.category === cat) && (!cond || item.condition === cond);
    });
    count.textContent = filtered.length;
    grid.innerHTML = filtered.map(card).join('');
    empty.hidden = filtered.length !== 0;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('q')) search.value = params.get('q');
  if (params.get('category')) category.value = params.get('category');
  if (params.get('condition')) condition.value = params.get('condition');

  ['input','change'].forEach(evt => {
    search.addEventListener(evt, render);
    category.addEventListener(evt, render);
    condition.addEventListener(evt, render);
  });
  searchBtn.addEventListener('click', render);

  fetch('data/inventory.json')
    .then(r => { if (!r.ok) throw new Error(`Inventory request failed: ${r.status}`); return r.json(); })
    .then(items => {
      listings = items.filter(x => x.status === 'Active' || x.sample === true);
      const realCount = listings.filter(x => !x.sample).length;
      if (resultsNote) resultsNote.textContent = realCount ? 'Human-verified inventory' : 'Sample inventory';
      render();
    })
    .catch(err => {
      console.error(err);
      count.textContent = '0';
      grid.innerHTML = '';
      empty.hidden = false;
      empty.querySelector('h2').textContent = 'Equipment could not be loaded.';
      empty.querySelector('p').textContent = 'Please refresh the page.';
    });
})();
