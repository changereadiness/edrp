(() => {
  const recipient = (window.EDRP_CONFIG && window.EDRP_CONFIG.formRecipient || '').trim();
  const qs = new URLSearchParams(window.location.search);
  const listing = qs.get('id');

  document.querySelectorAll('.edrp-form').forEach(form => {
    if (listing && form.elements.listing_id) form.elements.listing_id.value = listing;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const result = form.querySelector('.form-result');
      if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
        result.textContent = 'This form is not yet configured. Please contact EDRP using the published contact details.';
        result.className = 'form-result error';
        return;
      }

      const isSeller = form.dataset.formType === 'seller';
      const subject = isSeller ? 'EDRP equipment submission' : `EDRP equipment inquiry${listing ? ` — ${listing}` : ''}`;
      const lines = [];
      for (const el of form.elements) {
        if (!el.name || el.type === 'submit') continue;
        if (el.type === 'checkbox') {
          if (el.checked) lines.push(`${el.name.replaceAll('_',' ')}: Yes`);
          continue;
        }
        const value = String(el.value || '').trim();
        if (value) lines.push(`${el.name.replaceAll('_',' ')}: ${value}`);
      }
      if (isSeller) lines.push('', 'Please attach equipment photos, brochures, manuals or other supporting documents to this email before sending.');

      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      result.textContent = 'Your email application should now open with the message prepared.';
      result.className = 'form-result success';
    });
  });
})();
