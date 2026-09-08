(() => {
  'use strict';

  const locale = document.documentElement.lang || 'en';
  const number = new Intl.NumberFormat(locale);
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase(locale).replace(/#/g, '').trim();
  const matches = (text, query) => normalize(query).split(/\s+/).every(word => text.includes(word));

  const nav = document.querySelector('.site-nav');
  if (nav) {
    const button = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    const mobile = window.matchMedia('(max-width: 768px)');
    const setExpanded = expanded => {
      button.setAttribute('aria-expanded', String(expanded));
      links.hidden = mobile.matches && !expanded;
    };
    const resize = () => {
      // Return focus before hiding a menu item or the desktop toggle.
      const focused = document.activeElement;
      if (mobile.matches) button.hidden = false;
      else links.hidden = false;
      if (mobile.matches && links.contains(focused)) button.focus();
      if (!mobile.matches && focused === button) links.querySelector('a')?.focus();
      button.hidden = !mobile.matches;
      setExpanded(false);
    };
    button.addEventListener('click', () => setExpanded(button.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') {
        setExpanded(false);
        button.focus();
      }
    });
    mobile.addEventListener('change', resize);
    resize();
  }

  function setupSearch(form, update, restoreExtra = () => {}) {
    const input = form.querySelector('input[type="search"]');
    const clear = form.querySelector('.clear-search');
    const status = form.querySelector('.search-status');
    const empty = document.querySelector('[data-empty-results]');
    const render = () => {
      const { count, total } = update(input.value);
      status.textContent = input.value.trim() ? status.dataset.format
        .replace('{count}', number.format(count)).replace('{total}', number.format(total)) : '';
      empty.hidden = count !== 0;
      clear.hidden = input.value.length === 0;
    };
    const save = () => {
      const url = new URL(location.href);
      const query = input.value.trim();
      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');
      const sort = form.querySelector('[name="sort"]');
      if (sort?.value === 'name') url.searchParams.set('sort', 'name');
      else url.searchParams.delete('sort');
      // Filtering may hide a previously selected year.
      if (form.hasAttribute('data-book-search')) url.hash = '';
      history.replaceState(history.state, '', url);
    };
    const restore = () => {
      const params = new URL(location.href).searchParams;
      input.value = params.get('q') || '';
      restoreExtra(params);
      render();
    };
    input.addEventListener('input', () => { render(); save(); });
    form.addEventListener('submit', event => { event.preventDefault(); render(); save(); });
    clear.addEventListener('click', () => {
      input.value = '';
      render();
      save();
      input.focus();
    });
    window.addEventListener('popstate', restore);
    window.addEventListener('pageshow', restore);
    restore();
    form.hidden = false;
    return { render, save };
  }

  const books = document.querySelector('[data-book-search]');
  if (books) {
    const year = books.querySelector('select');
    const groups = [...document.querySelectorAll('.ledger-group')].map(element => ({
      element,
      id: element.querySelector('.ledger-year').id,
      rows: [...element.querySelectorAll('.ledger-row')].map(row => ({
        element: row, text: normalize(row.dataset.search)
      }))
    }));
    const total = groups.reduce((sum, group) => sum + group.rows.length, 0);
    setupSearch(books, query => {
      let count = 0;
      groups.forEach(group => {
        let visible = 0;
        group.rows.forEach(row => {
          row.element.hidden = !matches(row.text, query);
          if (!row.element.hidden) visible++;
        });
        group.element.hidden = visible === 0;
        [...year.options].find(option => option.value === group.id).disabled = visible === 0;
        count += visible;
      });
      year.value = '';
      return { count, total };
    });
    year.addEventListener('change', () => {
      const target = document.getElementById(year.value);
      if (target && !target.closest('.ledger-group').hidden) {
        location.hash = target.id;
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: 'start' });
      }
    });
  }

  const tags = document.querySelector('[data-tag-search]');
  if (tags) {
    const list = document.querySelector('.tag-cloud');
    const rows = [...list.children];
    const text = new Map(rows.map(row => [row, normalize(row.dataset.name)]));
    const sort = tags.querySelector('select');
    const collator = new Intl.Collator(locale, { numeric: true, sensitivity: 'base' });
    const order = () => {
      rows.sort((a, b) => (sort.value === 'count' ? Number(b.dataset.count) - Number(a.dataset.count) : 0)
        || collator.compare(a.dataset.name, b.dataset.name));
      list.append(...rows);
    };
    const { render, save } = setupSearch(tags, query => {
      let count = 0;
      rows.forEach(row => {
        row.hidden = !matches(text.get(row), query);
        if (!row.hidden) count++;
      });
      return { count, total: rows.length };
    }, params => {
      sort.value = params.get('sort') === 'name' ? 'name' : 'count';
      order();
    });
    sort.addEventListener('change', () => { order(); render(); save(); });
  }
})();
