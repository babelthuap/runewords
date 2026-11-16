'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const RANGE_REGEX = /(\(\d+-\d+\))/;

  const MELEE_SUBTYPES = [
    'Axes', 'Claws', 'Clubs', 'Daggers', 'Hammers',
    'Maces', 'Polearms', 'Scepters', 'Staves', 'Swords', 'Wands'
  ];

  const CATEGORY_GROUPS = [
    {
      label: 'Armor & Offhand:',
      categories: ['Helms', 'Armor', 'Shields']
    },
    {
      label: 'Weapon Classes:',
      categories: ['All Weapons', 'Melee Weapons', 'Missile Weapons']
    },
    {
      label: 'Weapon Types:',
      categories: MELEE_SUBTYPES
    }
  ];

  const ALL_CATEGORIES = CATEGORY_GROUPS.reduce(
    (acc, group) => acc.concat(group.categories),
    []
  );

  let selectedCategories = new Set();
  let collapsedGroups = new Set();
  let smartMatch = localStorage.smartMatch !== undefined
    ? localStorage.smartMatch === 'true'
    : true;
  let groupByCategory = localStorage.groupByCategory !== undefined
    ? localStorage.groupByCategory === 'true'
    : true;

  const smartMatchCheckbox = document.getElementById('smart-match');
  const groupByCategoryCheckbox = document.getElementById('group-by-category');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const clearBtn = document.getElementById('clear');
  const inputsTable = document.getElementById('inputs');
  const resultsTable = document.getElementById('results');
  const resultsCountSpan = document.getElementById('results-count');
  const filterChipsContainer = document.getElementById('filter-chips');
  const redNote = document.getElementById('red-note');
  const sortContainer = document.querySelector('.sort');
  const sortSelect = document.getElementById('sortby');

  smartMatchCheckbox.checked = smartMatch;
  groupByCategoryCheckbox.checked = groupByCategory;

  const horadricCube = new HoradricCube();

  let availableRunes;
  const params = new URLSearchParams(location.search);
  if (localStorage.availableRunes && !(params.get('overwrite') === 'true')) {
    availableRunes = JSON.parse(localStorage.availableRunes);
    replaceRunesParam(horadricCube.serializeRunes(availableRunes));
  } else {
    availableRunes = horadricCube.deserializeRunes(params.get('runes'));
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('overwrite');
  window.history.replaceState(null, '', url.toString());

  function getRunewordCategories(runeword) {
    if (Array.isArray(runeword.categories) && runeword.categories.length > 0) {
      return runeword.categories;
    }
    const parts = (runeword.itemType || '').split(/[,&]/).map(s => s.trim()).filter(Boolean);
    const normalized = [];
    parts.forEach(part => {
      let cat = part;
      if (part === 'All Melee Weapons' || part === 'Melee Weapons') {
        cat = 'Melee Weapons';
      } else if (part === 'All Weapons' || part === 'Weapons') {
        cat = 'All Weapons';
      } else if (part === 'Headgear' || part === 'Headgear (all types)' || part === 'Helms') {
        cat = 'Helms';
      }
      if (!normalized.includes(cat)) {
        normalized.push(cat);
      }
    });
    return normalized;
  }

  function matchesCategory(runeword, category, useSmartMatch) {
    const cats = getRunewordCategories(runeword);
    if (!useSmartMatch) {
      return cats.includes(category);
    }

    if (category === 'Helms' || category === 'Armor' || category === 'Shields') {
      return cats.includes(category);
    }
    if (category === 'All Weapons') {
      return (
        cats.includes('All Weapons') ||
        cats.includes('Melee Weapons') ||
        cats.includes('Missile Weapons') ||
        cats.some(c => MELEE_SUBTYPES.includes(c))
      );
    }
    if (category === 'Melee Weapons') {
      return (
        cats.includes('Melee Weapons') ||
        cats.includes('All Weapons') ||
        cats.some(c => MELEE_SUBTYPES.includes(c))
      );
    }
    if (category === 'Missile Weapons') {
      return cats.includes('Missile Weapons') || cats.includes('All Weapons');
    }
    if (MELEE_SUBTYPES.includes(category)) {
      return (
        cats.includes(category) ||
        cats.includes('Melee Weapons') ||
        cats.includes('All Weapons')
      );
    }
    return cats.includes(category);
  }

  /*
   * canMakeRuneword: Returns true iff the runeword can be made with the
   * runes available, otherwise false.
   *   @runeword - the word object to be formed, containing a 'runes' array
   *   'this' - an object representing the runes available
   */
  function canMakeRuneword(runeword) {
    let counts = {};
    runeword.runes.forEach(rune =>
      counts[rune] = counts[rune] ? counts[rune] + 1 : 1
    );

    return Object.keys(counts).every(rune => this[rune] >= counts[rune]) ||
           horadricCube.canUpgradeToMakeWord(this, counts);
  }

  function possibleRunewords(available) {
    return runewords.filter( canMakeRuneword.bind(available) );
  }

  function renderFilterChips(craftableRunewords) {
    filterChipsContainer.textContent = '';

    CATEGORY_GROUPS.forEach(group => {
      const row = document.createElement('div');
      row.className = 'filter-group-row';

      const label = document.createElement('span');
      label.className = 'filter-group-label';
      label.textContent = group.label;
      row.appendChild(label);

      const chips = document.createElement('div');
      chips.className = 'filter-group-chips';

      group.categories.forEach(cat => {
        const count = craftableRunewords.filter(rw => matchesCategory(rw, cat, smartMatch)).length;
        const isActive = selectedCategories.has(cat);

        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'filter-chip' +
          (isActive ? ' active' : '') +
          (count === 0 && !isActive ? ' zero-count' : '');
        chip.dataset.category = cat;

        const catSpan = document.createElement('span');
        catSpan.textContent = cat;
        chip.appendChild(catSpan);

        const countSpan = document.createElement('span');
        countSpan.className = 'chip-count';
        countSpan.textContent = `(${count})`;
        chip.appendChild(countSpan);

        chips.appendChild(chip);
      });

      row.appendChild(chips);
      filterChipsContainer.appendChild(row);
    });

    clearFiltersBtn.style.display = selectedCategories.size > 0 ? '' : 'none';
  }

  // create inputs and initialize values
  function initializeInputs(availableRunes) {
    inputsTable.textContent = '';
    const fragment = document.createDocumentFragment();

    RUNES.forEach(rune => {
      const tr = document.createElement('tr');

      const tdRune = document.createElement('td');
      tdRune.textContent = rune;
      tr.appendChild(tdRune);

      const tdInput = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.value = availableRunes[rune] || 0;
      tdInput.appendChild(input);
      tr.appendChild(tdInput);

      fragment.appendChild(tr);
    });

    inputsTable.appendChild(fragment);
    updateResults(availableRunes);
  }

  initializeInputs(availableRunes);

  clearBtn.addEventListener('click', () => {
    availableRunes = {};
    initializeInputs(availableRunes);
    delete localStorage.availableRunes;
    replaceRunesParam('');
  });

  function replaceRunesParam(value) {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('runes', value);
    } else {
      url.searchParams.delete('runes');
    }
    window.history.replaceState(null, '', url.toString());
  }

  // listeners on inputs
  inputsTable.addEventListener('input', (e) => {
    if (e.target && e.target.tagName === 'INPUT') {
      const input = e.target;
      const tdInput = input.closest('td');
      const rune = tdInput ? tdInput.previousElementSibling.textContent.trim() : null;
      if (!rune) return;

      const num = Number(input.value) || 0;
      if (num === 0) {
        delete availableRunes[rune];
      } else {
        availableRunes[rune] = num;
      }

      localStorage.availableRunes = JSON.stringify(availableRunes);
      replaceRunesParam(horadricCube.serializeRunes(availableRunes));

      updateResults(availableRunes);
    }
  });

  // listeners on filter controls
  filterChipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    const cat = chip.dataset.category;
    if (selectedCategories.has(cat)) {
      selectedCategories.delete(cat);
    } else {
      selectedCategories.add(cat);
    }
    updateResults(availableRunes);
  });

  resultsTable.addEventListener('click', (e) => {
    const tag = e.target.closest('.category-tag');
    if (tag) {
      const cat = tag.dataset.category;
      if (selectedCategories.has(cat)) {
        selectedCategories.delete(cat);
      } else {
        selectedCategories.add(cat);
      }
      updateResults(availableRunes);
      return;
    }

    const header = e.target.closest('.category-group-header');
    if (header) {
      const cat = header.dataset.groupCategory;
      if (collapsedGroups.has(cat)) {
        collapsedGroups.delete(cat);
      } else {
        collapsedGroups.add(cat);
      }
      updateResults(availableRunes);
    }
  });

  clearFiltersBtn.addEventListener('click', () => {
    selectedCategories.clear();
    updateResults(availableRunes);
  });

  smartMatchCheckbox.addEventListener('change', () => {
    smartMatch = smartMatchCheckbox.checked;
    localStorage.smartMatch = smartMatch;
    updateResults(availableRunes);
  });

  groupByCategoryCheckbox.addEventListener('change', () => {
    groupByCategory = groupByCategoryCheckbox.checked;
    localStorage.groupByCategory = groupByCategory;
    updateResults(availableRunes);
  });

  function buildRunewordRow(runeword, availableRunes, markMissing) {
    const cats = getRunewordCategories(runeword);

    const tr = document.createElement('tr');
    if (runeword.ladderOnly) {
      tr.classList.add('ladder-only');
    }
    if (runeword.nonLadderOnly) {
      tr.classList.add('non-ladder-only');
    }

    const tdName = document.createElement('td');

    const h2 = document.createElement('h2');
    h2.textContent = runeword.name;
    tdName.appendChild(h2);

    const runeSpanWrapper = document.createElement('span');
    runeSpanWrapper.className = 'rune';
    runeword.runes.forEach(rune => {
      const runeSpan = document.createElement('span');
      runeSpan.textContent = rune + ' ';
      if (!availableRunes[rune]) {
        markMissing();
        runeSpan.classList.add('missing');
      }
      runeSpanWrapper.appendChild(runeSpan);
    });
    tdName.appendChild(runeSpanWrapper);
    tdName.appendChild(document.createElement('br'));

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'category-tags';
    cats.forEach(cat => {
      const tag = document.createElement('span');
      tag.className = 'category-tag' + (selectedCategories.has(cat) ? ' active' : '');
      tag.dataset.category = cat;
      tag.title = `Filter by ${cat} (${runeword.itemType})`;
      tag.textContent = cat;
      tagsDiv.appendChild(tag);
    });
    tdName.appendChild(tagsDiv);

    const levelSpan = document.createElement('span');
    levelSpan.textContent = 'Level: ' + runeword.level;
    tdName.appendChild(levelSpan);

    if (runeword.ladderOnly) {
      tdName.appendChild(document.createElement('br'));
      tdName.appendChild(document.createElement('br'));
      const em = document.createElement('em');
      em.textContent = 'LADDER ONLY';
      tdName.appendChild(em);
    }
    if (runeword.nonLadderOnly) {
      tdName.appendChild(document.createElement('br'));
      tdName.appendChild(document.createElement('br'));
      const em = document.createElement('em');
      em.textContent = 'NON-LADDER ONLY';
      tdName.appendChild(em);
    }

    const tdAttributes = document.createElement('td');
    tdAttributes.className = 'stats';
    tdAttributes.appendChild(renderAttributes(runeword.attributes));

    tr.appendChild(tdName);
    tr.appendChild(tdAttributes);

    return tr;
  }

  function renderAttributes(attributes) {
    if (!attributes.some(Array.isArray)) {
      const ul = document.createElement('ul');
      attributes.forEach(attr => {
        const li = document.createElement('li');
        li.innerHTML = highlightStats(attr);
        ul.appendChild(li);
      });
      return ul;
    }
    const container = document.createElement('div');
    for (const attr of attributes) {
      if (Array.isArray(attr)) {
        container.appendChild(renderAttributes(attr));
      } else {
        const div = document.createElement('div');
        div.innerHTML = highlightStats(attr);
        container.appendChild(div);
      }
    }
    return container;
  }

  function updateResults(availableRunes) {
    console.time('updateResults');
    let missingSome = false;
    const markMissing = () => { missingSome = true; };

    const craftable = possibleRunewords(availableRunes);
    renderFilterChips(craftable);

    const activeFilterList = ALL_CATEGORIES.filter(cat => selectedCategories.has(cat));
    const filtered = activeFilterList.length === 0
      ? craftable
      : craftable.filter(rw => activeFilterList.some(cat => matchesCategory(rw, cat, smartMatch)));

    if (craftable.length > 0) {
      if (activeFilterList.length > 0) {
        resultsCountSpan.textContent = `Showing ${filtered.length} of ${craftable.length} runewords`;
      } else {
        resultsCountSpan.textContent = `${craftable.length} runeword${craftable.length === 1 ? '' : 's'}`;
      }
    } else {
      resultsCountSpan.textContent = '';
    }

    if (craftable.length > 1) {
      sortContainer.style.display = '';
    } else {
      sortContainer.style.display = 'none';
    }

    resultsTable.textContent = '';

    if (filtered.length === 0) {
      const msg = craftable.length === 0
        ? '- none -'
        : '- no runewords match the selected category filter(s) -';
      const em = document.createElement('em');
      em.textContent = msg;
      resultsTable.appendChild(em);
    } else if (groupByCategory) {
      const groupCategories = activeFilterList.length > 0 ? activeFilterList : ALL_CATEGORIES;
      const fragment = document.createDocumentFragment();

      groupCategories.forEach(cat => {
        const groupItems = activeFilterList.length > 0
          ? filtered.filter(rw => matchesCategory(rw, cat, smartMatch))
          : filtered.filter(rw => getRunewordCategories(rw).includes(cat));

        if (groupItems.length === 0) return;

        const isCollapsed = collapsedGroups.has(cat);

        const headerRow = document.createElement('tr');
        headerRow.className = 'category-group-header';
        headerRow.dataset.groupCategory = cat;

        const headerTd = document.createElement('td');
        headerTd.colSpan = 2;

        const headerTitle = document.createElement('div');
        headerTitle.className = 'category-group-title';

        const collapseIcon = document.createElement('span');
        collapseIcon.className = 'collapse-icon';
        collapseIcon.textContent = isCollapsed ? '▶' : '▼';
        headerTitle.appendChild(collapseIcon);

        const h3 = document.createElement('h3');
        h3.textContent = cat;
        headerTitle.appendChild(h3);

        const groupCount = document.createElement('span');
        groupCount.className = 'group-count';
        groupCount.textContent = `(${groupItems.length})`;
        headerTitle.appendChild(groupCount);

        headerTd.appendChild(headerTitle);
        headerRow.appendChild(headerTd);
        fragment.appendChild(headerRow);

        if (!isCollapsed) {
          groupItems.forEach(rw => {
            fragment.appendChild(buildRunewordRow(rw, availableRunes, markMissing));
          });
        }
      });
      resultsTable.appendChild(fragment);
    } else {
      const fragment = document.createDocumentFragment();
      filtered.forEach(rw => {
        fragment.appendChild(buildRunewordRow(rw, availableRunes, markMissing));
      });
      resultsTable.appendChild(fragment);
    }

    redNote.style.display = missingSome ? '' : 'none';
    console.timeEnd('updateResults');
  }

  function highlightStats(attr) {
    return attr.split(RANGE_REGEX).map(part => {
      if (RANGE_REGEX.test(part)) {
        return `<span class="range">${part}</span>`;
      } else {
        return part;
      }
    }).join('');
  }

  // listener on sort dropdown
  sortSelect.addEventListener('input', () => {
    switch (sortSelect.value) {
      case 'high':
        runewords.sort((a, b) => (b.level - a.level) || (a.name > b.name ? 1 : -1));
        break;
      case 'low':
        runewords.sort((a, b) => (a.level - b.level) || (a.name > b.name ? 1 : -1));
        break;
      case 'most':
        runewords.sort((a, b) => b.runes.length - a.runes.length);
        break;
      case 'least':
        runewords.sort((a, b) => a.runes.length - b.runes.length);
        break;
      case 'az':
        runewords.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      case 'rand':
        shuffle(runewords);
        break;
    }
    updateResults(availableRunes);
  });

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; --i) {
      let j = rand(i + 1);
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  function rand(n) {
    return Math.floor(Math.random() * n);
  }
});
