$(document).ready(function() {
  'use strict';

  let availableRunes = JSON.parse(localStorage.availableRunes || '{}');

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

    return Object.keys(counts).every(rune => this[rune] >= counts[rune]);
  }

  function possibleRunewords(available) {
    return runewords.filter( canMakeRuneword.bind(available) );
  }


  // create inputs and initialize values
  let allRunes = new Set();
  runewords.forEach(runeword =>
    runeword.runes.forEach(rune => allRunes.add(rune))
  );

  $('#inputs').append([...allRunes].sort().map(rune => {
    let $input = $('<input>')
      .attr('type', 'number')
      .attr('min', '0')
      .attr('value', availableRunes[rune] || 0);

    return $('<tr>')
      .append( $('<td>').text(rune) )
      .append( $('<td>').append($input) );
  }));

  updateResults(availableRunes);


  // listeners on inputs
  $('#available').on('input', 'input', function() {
    let rune = $(this).closest('td').prev().text();
    let num = Number($(this).val()) || 0;
    availableRunes[rune] = num;

    localStorage.availableRunes = JSON.stringify(availableRunes);

    updateResults(availableRunes);
  });

  function updateResults(availableRunes) {
    let $possible = possibleRunewords(availableRunes).map(runeword => {
      let $name = $('<td>')
        .append( $('<b>').text(runeword.name) ).append('<br>')
        .append( $('<span>').text(runeword.runes.join(' + ')) ).append('<br>')
        .append( $('<span>').text(runeword.itemType) ).append('<br>')
        .append( $('<span>').text('Character Level: ' + runeword.level) )

      let $attributes = $('<td>').append( $('<ul>')
        .append(runeword.attributes.map(attr => $('<li>').text(attr)))
      );

      return $('<tr>').append($name).append($attributes);
    });

    if ($possible.length === 0) {
      $possible = $('<em>').text('- none -');
    }

    $('#results').empty().append($possible);
  }

});
