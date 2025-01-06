'use strict';

const runes = ['El', 'Eld', 'Tir', 'Nef', 'Eth', 'Ith', 'Tal', 'Ral', 'Ort', 'Thul', 'Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem', 'Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber', 'Jah', 'Cham', 'Zod'];

function HoradricCube() {
  let rank = {};
  runes.forEach((rune, i) => rank[rune] = i);

  function runesToArray(runeObj) {
    let runeArr = Array(33).fill(0);
    for (let rune in runeObj) {
      runeArr[rank[rune]] = runeObj[rune];
    };
    return runeArr;
  }

  function arrayToRunes(runeArr) {
    let runeObj = {};
    runeArr.forEach((n, i) => n && (runeObj[runes[i]] = n));
    return runeObj;
  }

  function upgradeAll(runeArr) {
    function rollUp(i, n) {
      if (runeArr[i] < n) return;
      let numToMove = runeArr[i] - runeArr[i] % n;
      runeArr[i] -= numToMove;
      runeArr[i + 1] += numToMove / n;
    }
    for (let i = 0; i < rank['Pul']; ++i) {
      rollUp(i, 3);
    }
    for (let i = rank['Pul']; i < runeArr.length - 1; ++i) {
      rollUp(i, 2);
    }
    return runeArr;
  }

  this.upgradeRunes = runeObj => arrayToRunes(upgradeAll(runesToArray(runeObj)));

  this.canUpgradeToMakeWord = (runeObj, wordObj) => {
    let runeArr = runesToArray(runeObj);
    for (let rune in wordObj) {
      runeArr[rank[rune]] -= wordObj[rune];
    }
    runeArr = upgradeAll(runeArr);
    return Object.keys(wordObj).every(rune => runeArr[rank[rune]] >= 0);
  }
}

// FOR FUN:
// (3 ** 20) * (2 ** 12) = 14,281,868,906,496 El  =>  1 Zod
// 28,561,994,420,791 El  =>  1 of each
