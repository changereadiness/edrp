(() => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const escText = value => value == null || value === '' ? '—' : String(value);

  function setText(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = escText(value);
  }

  function setOptionalRow(rowId, value, displayValue = value) {
    const row = document.getElementById(rowId);
    if (!row) return;
    if (value == null || value === '') row.hidden = true;
    else {
      row.hidden = false;
      const target = row.querySelector('strong, p');
      if (target) target.textContent = displayValue;
    }
  }

  function renderGallery(item) {
    const gallery = document.getElementById('listing-gallery');
    if (!gallery) return;
    const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    if (!images.length) {
      gallery.innerHTML = `<div class="listing-hero-image"><span>${item.sample ? 'Sample equipment image' : 'Equipment image pending'}</span></div>`;
      return;
    }
    gallery.innerHTML = `<img class="listing-main-image" src="${images[0]}" alt="${item.title}">` +
      (images.length > 1 ? `<div class="listing-thumbs">${images.slice(1).map((src,i)=>`<button type="button" data-src="${src}" aria-label="View equipment image ${i+2}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}</div>` : '');
    const main = gallery.querySelector('.listing-main-image');
    gallery.querySelectorAll('[data-src]').forEach(btn => btn.addEventListener('click', () => { main.src = btn.dataset.src; }));
  }

  function renderNotFound() {
    document.title = 'Listing Not Found | EDRP';
    document.querySelector('.listing-layout').innerHTML = '<div class="empty-state"><h1>Listing not found.</h1><p>This equipment listing does not exist or is no longer available.</p><a class="btn btn-primary" href="browse.html">Browse equipment</a></div>';
    const details = document.getElementById('listing-details-section');
    if (details) details.hidden = true;
  }

  if (!id) {
    renderNotFound();
    return;
  }

  fetch('data/inventory.json')
    .then(r => { if (!r.ok) throw new Error(`Inventory request failed: ${r.status}`); return r.json(); })
    .then(items => {
      const item = items.find(x => x.id === id);
      if (!item) return renderNotFound();

      document.title = `${item.title} | EDRP`;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.href = `https://edrp.net/listing.html?id=${encodeURIComponent(item.id)}`;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) descriptionMeta.content = `${item.title}${item.manufacturer ? ` by ${item.manufacturer}` : ''}. ${item.condition}. ${[item.city,item.country].filter(Boolean).join(', ')}. Industrial equipment listing on EDRP.`;
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.content = item.sample ? 'noindex,follow' : 'index,follow';

      setText('listing-id', item.id);
      setText('listing-category', item.category);
      setText('listing-condition', item.condition);
      setText('listing-title', item.title);
      setText('listing-location', [item.city,item.country].filter(Boolean).join(', ') || 'Location on request');
      setText('listing-company', item.company || 'Seller identity on request');
      setText('listing-manufacturer', item.manufacturer);
      setText('listing-model', item.model);
      setText('listing-spec', item.specification);
      setText('listing-availability', item.availability);
      setText('listing-description', item.description);
      setText('listing-status', item.status);

      setOptionalRow('row-year', item.year);
      setOptionalRow('row-quantity', item.quantity, String(item.quantity));
      const priceDisplay = item.price ? `${item.price}${item.currency && item.price !== 'Price on Request' ? ` ${item.currency}` : ''}` : '';
      setOptionalRow('row-price', item.price, priceDisplay);
      setOptionalRow('condition-details-block', item.conditionDetails);
      setOptionalRow('logistics-block', item.logistics);
      setOptionalRow('date-listed-block', item.dateListed);
      setOptionalRow('date-verified-block', item.dateVerified);

      renderGallery(item);

      const verifiedTag = document.getElementById('verified-tag');
      const sampleTag = document.getElementById('sample-tag');
      const verifyBox = document.getElementById('verification-box');
      if (item.sample) {
        sampleTag.hidden = false;
        verifiedTag.hidden = true;
        verifyBox.innerHTML = '<strong>Sample listing</strong><p>This is demonstration inventory used to show the EDRP listing format. It is not available for purchase and has no represented seller.</p>';
      } else {
        sampleTag.hidden = true;
        verifiedTag.hidden = !item.verified;
      }

      const contact = document.getElementById('listing-contact');
      if (item.sample || item.status !== 'Active') {
        contact.removeAttribute('href');
        contact.classList.add('btn-disabled');
        contact.setAttribute('aria-disabled','true');
        contact.textContent = item.sample ? 'Sample Listing — Inquiry Unavailable' : `${item.status} — Inquiry Unavailable`;
      } else {
        contact.href = `contact.html?id=${encodeURIComponent(item.id)}`;
      }
    })
    .catch(err => {
      console.error(err);
      renderNotFound();
    });
})();
