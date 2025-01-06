$(document).ready(function() {
  'use strict';

  let availableRunes = JSON.parse(localStorage.availableRunes || '{}');

  let horadricCube = new HoradricCube();

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
    $('#inputs').empty().append(runes.map(rune => {
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
  });


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
        .append( $('<b>').text(runeword.name) ).append('<br>')
        .append( $('<span>').append($runes) ).append('<br>')
        .append( $('<span>').text(runeword.itemType) ).append('<br>')
        .append( $('<span>').text('Character Level: ' + runeword.level) )

      if (runeword.ladderOnly) {
        $name.append('<br>').append('<br>').append( $('<em>').text('LADDER ONLY') );
      }

      let $attributes = $('<td>').append( $('<ul>')
        .append(runeword.attributes.map(attr => $('<li>').text(attr)))
      );

      return $('<tr>')
        .append($name)
        .append($attributes)
        .addClass(runeword.ladderOnly ? 'ladder-only' : '');
    });

    if ($possible.length === 0) {
      $possible = $('<em>').text('- none -');
    }

    $('#results').empty().append($possible);

    if (missingSome) {
      $('#red-note').show();
    } else {
      $('#red-note').hide();
    }
  }

});
