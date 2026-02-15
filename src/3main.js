$(document).ready(function() {
  'use strict';

  const RANGE_REGEX = /(\(\d+-\d+\))/;

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
  $('#available').on('input', 'input', function() {
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

  function updateResults(availableRunes) {
    let missingSome = false;

    let $possible = possibleRunewords(availableRunes).map(runeword => {
      let $runes = runeword.runes.map(rune => {
        let $rune = $('<span>').text(rune + ' ');
        if (!availableRunes[rune]) {
          missingSome = true;
          $rune.addClass('missing');
        }
        return $rune;
      });

      let $name = $('<td>')
        .append( $('<h2>').text(runeword.name) )
        .append( $('<span>').addClass('rune').append($runes) ).append('<br>')
        .append( $('<span>').text(runeword.itemType) ).append('<br>')
        .append( $('<span>').text('Level: ' + runeword.level) )

      if (runeword.ladderOnly) {
        $name.append('<br>').append('<br>').append( $('<em>').text('LADDER ONLY') );
      }

      let $attributes = $('<td>').addClass('stats').append( $('<ul>')
        .append(runeword.attributes.map(attr => $('<li>').html(highlightStats(attr))))
      );

      return $('<tr>')
        .append($name)
        .append($attributes)
        .addClass(runeword.ladderOnly ? 'ladder-only' : '');
    });

    if ($possible.length === 0) {
      $possible = $('<em>').text('- none -');
    }
    if ($possible.length > 1) {
      $('.sort').show();
    } else {
      $('.sort').hide();
    }

    $('#results').empty().append($possible);

    if (missingSome) {
      $('#red-note').show();
    } else {
      $('#red-note').hide();
    }
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
