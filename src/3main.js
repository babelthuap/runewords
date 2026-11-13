$(document).ready(function() {
  'use strict';

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

  $('#smart-match').prop('checked', smartMatch);
  $('#group-by-category').prop('checked', groupByCategory);

  let horadricCube = new HoradricCube();

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
    const $container = $('#filter-chips').empty();

    CATEGORY_GROUPS.forEach(group => {
      const $row = $('<div>').addClass('filter-group-row');
      $row.append($('<span>').addClass('filter-group-label').text(group.label));

      const $chips = $('<div>').addClass('filter-group-chips');
      group.categories.forEach(cat => {
        const count = craftableRunewords.filter(rw => matchesCategory(rw, cat, smartMatch)).length;
        const isActive = selectedCategories.has(cat);

        const $chip = $('<button>')
          .attr('type', 'button')
          .addClass('filter-chip')
          .toggleClass('active', isActive)
          .toggleClass('zero-count', count === 0 && !isActive)
          .attr('data-category', cat)
          .append($('<span>').text(cat))
          .append($('<span>').addClass('chip-count').text(`(${count})`));

        $chips.append($chip);
      });

      $row.append($chips);
      $container.append($row);
    });

    if (selectedCategories.size > 0) {
      $('#clear-filters').show();
    } else {
      $('#clear-filters').hide();
    }
  }

  // create inputs and initialize values
  function initializeInputs(availableRunes) {
    $('#inputs').empty().append(RUNES.map(rune => {
      let $input = $('<input>')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('value', availableRunes[rune] || 0);

      return $('<tr>')
        .append( $('<td>').text(rune) )
        .append( $('<td>').append($input) );
    }));
    updateResults(availableRunes);
  }

  initializeInputs(availableRunes);

  $('#clear').click(function() {
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
  $('#inputs').on('input', 'input', function() {
    let rune = $(this).closest('td').prev().text();
    let num = Number($(this).val()) || 0;
    if (num == 0) {
      delete availableRunes[rune];
    } else {
      availableRunes[rune] = num;
    }

    localStorage.availableRunes = JSON.stringify(availableRunes);
    replaceRunesParam(horadricCube.serializeRunes(availableRunes));

    updateResults(availableRunes);
  });

  // listeners on filter controls
  $('#filter-chips').on('click', '.filter-chip', function() {
    const cat = $(this).attr('data-category');
    if (selectedCategories.has(cat)) {
      selectedCategories.delete(cat);
    } else {
      selectedCategories.add(cat);
    }
    updateResults(availableRunes);
  });

  $('#results').on('click', '.category-tag', function() {
    const cat = $(this).attr('data-category');
    if (selectedCategories.has(cat)) {
      selectedCategories.delete(cat);
    } else {
      selectedCategories.add(cat);
    }
    updateResults(availableRunes);
  });

  $('#results').on('click', '.category-group-header', function() {
    const cat = $(this).attr('data-group-category');
    if (collapsedGroups.has(cat)) {
      collapsedGroups.delete(cat);
    } else {
      collapsedGroups.add(cat);
    }
    updateResults(availableRunes);
  });

  $('#clear-filters').click(function() {
    selectedCategories.clear();
    updateResults(availableRunes);
  });

  $('#smart-match').on('change', function() {
    smartMatch = $(this).is(':checked');
    localStorage.smartMatch = smartMatch;
    updateResults(availableRunes);
  });

  $('#group-by-category').on('change', function() {
    groupByCategory = $(this).is(':checked');
    localStorage.groupByCategory = groupByCategory;
    updateResults(availableRunes);
  });

  function buildRunewordRow(runeword, availableRunes, markMissing) {
    let $runes = runeword.runes.map(rune => {
      let $rune = $('<span>').text(rune + ' ');
      if (!availableRunes[rune]) {
        markMissing();
        $rune.addClass('missing');
      }
      return $rune;
    });

    const cats = getRunewordCategories(runeword);
    const $tags = $('<div>').addClass('category-tags');
    cats.forEach(cat => {
      $tags.append(
        $('<span>')
          .addClass('category-tag')
          .toggleClass('active', selectedCategories.has(cat))
          .attr('data-category', cat)
          .attr('title', `Filter by ${cat} (${runeword.itemType})`)
          .text(cat)
      );
    });

    let $name = $('<td>')
      .append( $('<h2>').text(runeword.name) )
      .append( $('<span>').addClass('rune').append($runes) ).append('<br>')
      .append( $tags )
      .append( $('<span>').text('Level: ' + runeword.level) );

    if (runeword.ladderOnly) {
      $name.append('<br>').append('<br>').append( $('<em>').text('LADDER ONLY') );
    }
    if (runeword.nonLadderOnly) {
      $name.append('<br>').append('<br>').append( $('<em>').text('NON-LADDER ONLY') );
    }

    let $attributes = $('<td>').addClass('stats').append( $('<ul>')
      .append(runeword.attributes.map(attr => $('<li>').html(highlightStats(attr))))
    );

    return $('<tr>')
      .append($name)
      .append($attributes)
      .addClass(runeword.ladderOnly ? 'ladder-only' : '')
      .addClass(runeword.nonLadderOnly ? 'non-ladder-only' : '');
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
        $('#results-count').text(`Showing ${filtered.length} of ${craftable.length} runewords`);
      } else {
        $('#results-count').text(`${craftable.length} runeword${craftable.length === 1 ? '' : 's'}`);
      }
    } else {
      $('#results-count').text('');
    }

    if (craftable.length > 1) {
      $('.sort').show();
    } else {
      $('.sort').hide();
    }

    let $rows = [];

    if (filtered.length === 0) {
      const msg = craftable.length === 0
        ? '- none -'
        : '- no runewords match the selected category filter(s) -';
      $rows = $('<em>').text(msg);
    } else if (groupByCategory) {
      const groupCategories = activeFilterList.length > 0 ? activeFilterList : ALL_CATEGORIES;

      groupCategories.forEach(cat => {
        const groupItems = activeFilterList.length > 0
          ? filtered.filter(rw => matchesCategory(rw, cat, smartMatch))
          : filtered.filter(rw => getRunewordCategories(rw).includes(cat));

        if (groupItems.length === 0) return;

        const isCollapsed = collapsedGroups.has(cat);
        const $headerTitle = $('<div>')
          .addClass('category-group-title')
          .append($('<span>').addClass('collapse-icon').text(isCollapsed ? '▶' : '▼'))
          .append($('<h3>').text(cat))
          .append($('<span>').addClass('group-count').text(`(${groupItems.length})`));

        const $headerRow = $('<tr>')
          .addClass('category-group-header')
          .attr('data-group-category', cat)
          .append($('<td>').attr('colspan', '2').append($headerTitle));

        $rows.push($headerRow);

        if (!isCollapsed) {
          groupItems.forEach(rw => {
            $rows.push(buildRunewordRow(rw, availableRunes, markMissing));
          });
        }
      });
    } else {
      $rows = filtered.map(rw => buildRunewordRow(rw, availableRunes, markMissing));
    }

    $('#results').empty().append($rows);

    if (missingSome) {
      $('#red-note').show();
    } else {
      $('#red-note').hide();
    }
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
  $('#sortby').on('input', function() {
    switch ($(this).val()) {
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
  };

  function rand(n) {
    return Math.floor(Math.random() * n);
  }
});
