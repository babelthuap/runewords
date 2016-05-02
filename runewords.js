var runewords = [
{name:"Ancient's Pledge",runes:["Ral","Ort","Tal"],level:"21",itemType:"Shields",attributes:["+50% Enhanced Defense","+48% Resistance to Fire, Lightning, Poison","+43% Resistance to Cold","10% of Damage goes to Mana"]},
{name:"Black",runes:["Thul","Io","Nef"],level:"35",itemType:"Clubs, Hammers, Maces",attributes:["+120% to Enhanced Defense","40% Chance of Crushing Blow","+200 to Attack Rating","Adds 3-14 Cold Damage for 3 seconds","+10 to Vitality","15% increased Attack Speed","Magic Damage Reduced by 2","Level 4 Corpse Explosion (12 charges)","Knockback"]},
{name:"Fury",runes:["Jah","Gul","Eth"],level:"65",itemType:"Melee Weapons",attributes:["+209% Enhanced Damage","40% Increased Attack Speed","Prevent Monster Heal","66% Chance of Open Wounds","33% Chance of Deadly Strike","-25% Target Defense","20% to Attack Rating","6% Life stolen per hit","Ignores Targets Defense","+5 to Frenzy (Barbarian only)"]},
{name:"Holy Thunder",runes:["Eth","Ral","Ort","Tal"],level:"21",itemType:"Scepters",attributes:["+60% Enhanced Damage","-25% Target Defense","Adds 5-30 Fire Damage","Adds 21-110 Lightning Damage","+75 Poison Damage for 5 seconds","+10 to Maximum Damage","+60% Lightning Resistance","+5 to Maximum Lightning Resistance","+3 to Holy Shock (Paladin only)","Level 7 Chain Lightning (60 charges)"]},
{name:"Honor",runes:["Amn","El","Ith","Tir","Sol"],level:"27",itemType:"Melee Weapons",attributes:["+160% Enhanced Damage","+9 to minimum Damage","+9 to maximum Damage","25% Deadly Strike","+250 to Attack Rating","+1 to All Skills","7% Life Stolen per hit","+10 Replenish Life","+10 to Strength","+1 to Light Radius","+2 to Mana per Kill"]},
{name:"King's Grace",runes:["Amn","Ral","Thul"],level:"25",itemType:"Swords, Scepters",attributes:["+100% Enhanced Damage","+100% Damage against Demons","+50% Damage against Undead","Adds 5-30 Fire Damage","Adds 3-14 Cold Damage for 3 seconds","+150 to Attack Rating","+100 to Attack Rating against Demons","+100 to Attack Rating against Undead","7% Life Stolen per hit"]},
{name:"Leaf",runes:["Tir","Ral"],level:"19",itemType:"Staves (not Orbs)",attributes:["Adds 5-30 Fire Damage","+3 to Fire Skills","+3 to Fire Bolt (Sorceress only)","+3 to Inferno (Sorceress only)","+3 to Warmth (Sorceress only)","+ 2 to Mana per kill","+ 2 per character level to Defense","+33% Cold Resist"]},
{name:"Lionheart",runes:["Hel","Lum","Fal"],level:"41",itemType:"Body Armor",attributes:["+20% Enhanced Damage","-15% to Requirements","+25 to Strength","+10 to Energy","+20 to Vitality","+15 to Dexterity","+50 to Life","+30% to All Resistances"]},
{name:"Lore",runes:["Ort","Sol"],level:"27",itemType:"Helms",attributes:["+1 to All Skill Levels","+10 to Energy","+2 to Mana per Kill","+30% Lightning Resist","Damage reduced by 7","+2 to Light Radius"]},
{name:"Malice",runes:["Ith","El","Eth"],level:"15",itemType:"Melee Weapons",attributes:["+33% Enhanced Damage","+9 to maximum Damage","100% chance of Open Wounds","-25% Target Defense","-100 Monster Defense per hit","Prevent Monster Heal","+50 to Attack Rating","-5 Drain Life"]},
{name:"Melody",runes:["Shael","Ko","Nef"],level:"39",itemType:"Missile Weapons",attributes:["+50% Enhanced Damage","300% Damage against Undead","+3 to Bow and Crossbow Skills (Amazon only)","+3 to Critical Strike (Amazon only)","+3 to Dodge (Amazon only)","+3 to Slow Missiles (Amazon only)","20% increased Attack Speed","+10 to Dexterity","Knockback"]},
{name:"Memory",runes:["Lum","Io","Sol","Eth"],level:"37",itemType:"Staves (not Orbs)",attributes:["+3 to Sorceress Skills","33% Faster Cast rate","20% increased maximum Mana","+3 Energy Shield (Sorceress only)","+2 Static Field (Sorceress only)","+10 to Energy","+10 to Vitality","+9 to minimum Damage","-25% Target Defense","Magic Damage reduced by 7","+50% Enhanced Defense"]},
{name:"Nadir",runes:["Nef","Tir"],level:"13",itemType:"Helms",attributes:["+50% Enhanced Defense","+10 to Defense","+30 Defense against Missile","Level 13 Cloak of Shadows (9 charges)","+2 Mana per kill","+5 to Strength","-33% extra gold from Monsters","-3 to Light Radius"]},
{name:"Radiance",runes:["Nef","Sol","Ith"],level:"27",itemType:"Helms",attributes:["+75% Enhanced Defense","+30 Defense against Missiles","+10 to Energy","+10 to Vitality","15% Damage goes to Mana","Magic Damage reduced by 3","+33 to Mana","Damage reduced by 7","+5 to Light Radius"]},
{name:"Rhyme",runes:["Shael","Eth"],level:"29",itemType:"Shields",attributes:["20% increased chance of Blocking","40% faster Block Rate","+25 to All Resistances","15% Regenerate Mana","Cannot be Frozen","50% extra Gold from Monsters","25% better chance of getting Magic Items"]},
{name:"Silence",runes:["Dol","Eld","Hel","Ist","Tir","Vex"],level:"55",itemType:"Weapons",attributes:["200% Enhanced Damage","+75% Damage against Undead","-20% Requirements","20% increased Attack Speed","+50 to Attack Rating against Undead","+2 to all Skill Levels","+75 to All Resistances","20% Faster Hit Recoverty","11% Mana stolen per Hit","25% Hit Causes Monster to Flee","+33 Hit Blinds Target","+2 to Mana per Kill","30% better chance of getting Magic Items"]},
{name:"Smoke",runes:["Nef","Lum"],level:"37",itemType:"Body Armor",attributes:["+75% Enhanced Defense","+280 Defense against Missiles","+50 to All Resistances","20% Faster Hit Recovery","Level 6 Weaken (18 charges)","+10 to Energy","-1 to Light Radius"]},
{name:"Stealth",runes:["Tal","Eth"],level:"17",itemType:"Body Armor",attributes:["Magic Damage reduced by 3","+6 to Dexterity","+15 to maximum Stamina","+30% Poison Resist","15% Regenerate Mana","25% Faster run/walk","25% Faster Cast Rate","25% Faster Hit Recovery"]},
{name:"Steel",runes:["Tir","El"],level:"13",itemType:"Swords, Axes, Maces",attributes:["20% Enhanced Damage","+3 to minimum Damage","+3 to maximum Damage","+50 to Attack Rating","50% chance of Open Wounds","25% Increased Attack Speed","+2 to Mana per Kill","+1 to Light Radius","NOTE: Maces doesn't mean all Mace class weapons. When a mace is called for in a Runeword recipe, you can use a Mace, Morning Star, Flail and Exceptional/Elite versions only."]},
{name:"Strength",runes:["Amn","Tir"],level:"25",itemType:"Melee Weapons",attributes:["35% Enhanced Damage","25% chance of Crushing Blow","7% Life stolen per Hit","+2 to Mana per Kill","+20 to Strength","+10 to Vitality"]},
{name:"Venom",runes:["Tal","Dol","Mal"],level:"49",itemType:"Weapons",attributes:["25% Hit Causes Monsters to Flee","Prevent Monster Heal","Ignore Target's Defense","7% Mana Steal per hit","Level 15 Poison Explosion (27 charges)","Level 13 Poison Nova (11 charges)","+273 Poison Damage for 6 seconds"]},
{name:"Wealth",runes:["Lem","Ko","Tir"],level:"43",itemType:"Body Armor",attributes:["300% extra Gold from Monsters","100% better chance of getting Magic Items","+2 to Mana per Kill","+10 to Dexterity"]},
{name:"White",runes:["Dol","Io"],level:"35",itemType:"Wands",attributes:["25% Hit causes Monsters to Flee","+10 to Vitality","+3 to Poison and Bone Skills (Necromancer only)","+3 to Bone Armor (Necromancer only)","+2 to Bone Spear (Necromancer only)","+4 to Skeleton Mastery (Necromancer only)","Magic Damage reduced by 4","20% Faster Cast Rate","+13 to Mana"]},
{name:"Zephyr",runes:["Ort","Eth"],level:"21",itemType:"Missile Weapons",attributes:["+33% Enhanced Damage","+66 to Attack Rating","Adds 1-50 Lightning Damage","-25% Target Defense","+25 Defense","25% Faster run/walk","25% Increased Attack Speed","7% chance to cast level 1 Twister when hit"]},
{name:"Beast",runes:["Ber","Tir","Um","Mal","Lum"],level:"49",itemType:"Axes, Scepters, Hammers",attributes:["Level 9 Fanaticism Aura When Equipped","+40% Increased Attack Speed","+240-270% Enhanced Damage","20% Chance of Crushing Blow","25% Chance of Open Wounds","+3 To Werebear","+3 To Lycanthropy","Prevent Monster Heal","+25-40 To Strength","+10 To Energy","+2 To Mana After Each Kill","5 Charges Level 13 Summon Grizzly"]},
{name:"Bramble",runes:["Ral","Ohm","Sur","Eth"],level:"61",itemType:"Body Armor",attributes:["Level 15-21 Thorns Aura When Equipped","+50% Faster Hit Recovery","+25-50% To Poison Skill Damage","+300 Defense","+5% Increased Maximum Mana","+15% Regenerate Mana","+5% To Maximum Cold Resist","+30% Fire Resist","+100% Poison Resist","+13 Life After Each Kill","33 Charges Level 13 Spirit of Barbs"]},
{name:"Breath of the Dying",runes:["Vex","Hel","El","Eld","Zod","Eth"],level:"69",itemType:"Weapons",attributes:["50% Chance To Cast Level 20 Poison Nova When You Kill An Enemy","Indestructible","+60% Increased Attack Speed","+350-400% Enhanced Damage","+200% Damage To Undead","-25% Target Defense","+50 To Attack Rating","+50 To Attack Rating Against Undead","7% Mana Stolen Per Hit","12-15% Life Stolen Per Hit","Prevent Monster Heal","+30 To All Attributes","+1 To Light Radius","-20% Requirements"]},
{name:"Call To Arms",runes:["Amn","Ral","Mal","Ist","Ohm"],level:"51",itemType:"Weapons",attributes:["+1 To All Skills","+40% Increased Attack Speed","+250-290% Enhanced Damage","Adds 5-30 Fire Damage","7% Life Stolen Per Hit","+2-6 To Battle Command","+1-6 To Battle Orders","+1-4 To Battle Cry","Prevent Monster Heal","+12 Replenish Life","30% Better Chance of Getting Magic Items","NOTE: Barbarians are capped at +3 to the skills Battle Command, Battle Orders and Battle Cry."]},
{name:"Chains of Honor",runes:["Dol","Um","Ber","Ist"],level:"63",itemType:"Body Armor",attributes:["+2 To All Skills","+200% Damage To Demons","+100% Damage To Undead","8% Life Stolen Per Hit","+70% Enhanced Defense","+20 To Strength","+7 to Replenish Life","+65 to all Resistances","Damage Reduced By 8%","25% Better Chance of Getting Magic Items"]},
{name:"Chaos",runes:["Fal","Ohm","Um"],level:"57",itemType:"Claws",attributes:["9% Chance To Cast Level 11 Frozen Orb On Striking","11% Chance To Cast Level 9 Charged Bolt On Striking","+35% Increased Attacked Speed","+290-340% Enhanced Damage","Adds 216-471 Magic Damage","25% Chance of Open Wounds","+1 To Whirlwind","+10 To Strength","+15 Life After Each Demon Kill"]},
{name:"Crescent Moon",runes:["Shael","Um","Tir"],level:"47",itemType:"Axes, Swords, Polearms",attributes:["10% Chance To Cast Level 17 Chain Lightning On Striking","7% Chance To Cast Level 13 Static Field On Striking","+20% Increased Attack Speed","+180-220% Enhanced Damage","Ignore Target's Defense","-35% To Enemy Lightning Resistance","25% Chance of Open Wounds","+9-11 Magic Absorb","+2 To Mana After Each Kill","30 Charges Level 18 Summon Spirit Wolf"]},
{name:"Delirium",runes:["Lem","Ist","Io"],level:"51",itemType:"Helms",attributes:["1% Chance To Cast Level 50 Delirium When Struck","6% Chance To Cast Level 14 Mind Blast When Struck","14% Chance To Cast Level 13 Terror When Struck","11% Chance To Cast Level 18 Confuse On Striking","+2 To All Skills","+261 Defense","+10 To Vitality","50% Extra Gold From Monsters","25% Better Chance of Getting Magic Items","60 Charges Level 17 Attract", "NOTE: This ability morphs your character into a Bone Fetish for about 1 minute. Once morphed, you can do normal attacks in the form of a headbutt."]},
{name:"Doom",runes:["Hel","Ohm","Um","Lo","Cham"],level:"67",itemType:"Axes, Polearms, Hammers",attributes:["5% Chance To Cast Level 18 Volcano On Striking","Level 12 Holy Freeze Aura When Equipped","+2 To All Skills","+45% Increased Attack Speed","+330-370% Enhanced Damage","-40-60% To Enemy Cold Resistance","20% Deadly Strike","25% Chance of Open Wounds","Prevent Monster Heal","+3 Freezes Target","-20% Requirements"]},
{name:"Duress",runes:["Shael","Um","Thul"],level:"?",itemType:"Body Armor",attributes:["+40% Faster Hit Recovery","+10-20% Enhanced Damage","+37-133 Cold Damage over 2 seconds","15% chance of Crushing Blow","33% chance of Open Wounds","+150-200% Enhanced Defense","-20% slower Stamina Drain","+45% Cold Resist","+15% Lightning Resist","+15% Fire Resist","+15% Poison Resist"]},
{name:"Enigma",runes:["Jah","Ith","Ber"],level:"65",itemType:"Body Armor",attributes:["+2 To All Skills","+45% Faster Run/Walk","+1 To Teleport","+750-775 Defense","+ (0.75 Per Character Level) To Strength","Increase Maximum Life 5%","Damage Reduced By 8%","+14 Life After Each Kill","15% Damage Taken Goes To Mana","+ (1 Per Character Level) Better Chance of Getting Magic Items"]},
{name:"Eternity",runes:["Amn","Ber","Ist","Sol","Sur"],level:"63",itemType:"Melee Weapons",attributes:["Indestructible","+260-310% Enhanced Damage","+9 To Minimum Damage","7% Life Stolen Per Hit","20% Chance of Crushing Blow","Hit Blinds Target","Slows Target By 33%","+16 Replenish Life","16% Replenish Mana","Cannot Be Frozen","30% Better Chance Of Getting Magic Items","88 Charges Level 8 Revive"]},
{name:"Exile",runes:["Vex","Ohm","Ist","Dol"],level:"57",itemType:"Paladin Shields",attributes:["15% Chance To Cast Level 5 Life Tap On Striking","Level 13-16 Defiance Aura When Equipped","+2 To Offensive Auras (Paladin Only)","+30% Faster Block Rate","Freezes Target","+220-260% Enhanced Defense","+7 Replenish Life","+5% To Maximum Cold Resist","+5% To Maximum Fire Resist","25% Better Chance Of Getting Magic Items","Repairs 1 Durability in 4 Seconds"]},
{name:"Famine",runes:["Fal","Ohm","Ort","Jah"],level:"65",itemType:"Axes, Hammers",attributes:["+30% Increased Attack Speed","+320-370% Enhanced Damage","Ignore Target's Defense","Adds 180-200 Magic Damage","Adds 50-200 Fire Damage","Adds 51-250 Lightning Damage","Adds 50-200 Cold Damage","12% Life Stolen Per Hit","Prevent Monster Heal","+10 To Strength"]},
{name:"Gloom",runes:["Fal","Um","Pul"],level:"47",itemType:"Body Armor",attributes:["15% Chance To Cast Level 3 Dim Vision When Struck","+10% Faster Hit Recovery","+200-260% Enhanced Defense","+10 To Strength","+45 to all Resistances","Half Freeze Duration","5% Damage Taken Goes To Mana","-3 To Light Radius"]},
{name:"Hand of Justice",runes:["Sur","Cham","Amn","Lo"],level:"67",itemType:"Weapons",attributes:["100% Chance To Cast Level 36 Blaze When You Level-Up","100% Chance To Cast Level 48 Meteor When You Die","Level 16 Holy Fire Aura When Equipped","+33% Increased Attack Speed","+280-330% Enhanced Damage","Ignore Target's Defense","7% Life Stolen Per Hit","-20% To Enemy Fire Resistance","20% Deadly Strike","Hit Blinds Target","+3 Freezes Target"]},
{name:"Heart of the Oak",runes:["Ko","Vex","Pul","Thul"],level:"55",itemType:"Staves, Maces",attributes:["+3 To All Skills","+40% Faster Cast Rate","+75% Damage To Demons","+100 To Attack Rating Against Demons","Adds 3-14 Cold Damage for 3 seconds","7% Mana Stolen Per Hit","+10 To Dexterity","+20 Replenish Life","15% Increased Maximum Mana","+30-40 to all Resistances","25 Charges Level 4 Oak Sage","60 Charges Level 14 Raven","Maces doesn't mean all Mace class weapons. When a mace is called for in a Runeword recipe, you can use a Mace, Morning Star, Flail and Exceptional/Elite versions only."]},
{name:"Kingslayer",runes:["Mal","Um","Gul","Fal"],level:"53",itemType:"Swords, Axes",attributes:["+30% Increased Attack Speed","+230-270% Enhanced Damage","-25% Target Defense","20% Bonus To Attack Rating","33% Chance of Crushing Blow","50% Chance of Open Wounds","+1 To Vengeance","Prevent Monster Heal","+10 To Strength","40% Extra Gold From Monsters"]},
{name:"Passion",runes:["Dol","Ort","Eld","Lem"],level:"43",itemType:"Weapons",attributes:["+25% Increased Attack Speed","+160-210% Enhanced Damage","50-80% Bonus To Attack Rating","+75% Damage To Undead","+50 To Attack Rating Against Undead","Adds 1-50 Lightning Damage","+1 To Berserk","+1 To Zeal","+10 Hit Blinds Target","25% Hit Causes Monster To Flee","75% Extra Gold From Monsters","12 Charges Level 3 Heart of Wolverine"]},
{name:"Prudence",runes:["Mal","Tir"],level:"?",itemType:"Body Armor",attributes:["+25% Faster Hit Recovery","+140-170% Enhanced Defense","+25-35 to all Resistances","Damage reduced by 3","Magic damage reduced by 17","+2 to Mana after each kill","+1 to Light Radius","Repairs 1 Durability in 4 seconds"]},
{name:"Sanctuary",runes:["Ko","Ko","Mal"],level:"49",itemType:"Shields",attributes:["+20% Faster Hit Recovery","+20% Faster Block Rate","20% Increased Chance of Blocking","+130-160% Enhanced Defense","+250 Defense vs. Missile","+20 To Dexterity","+50-70 to all Resistances","Magic Damage Reduced By 7","60 Charges Level 12 Slow Missiles"]},
{name:"Splendor",runes:["Eth","Lum"],level:"?",itemType:"Shields",attributes:["+1 to all Skills","+10% Faster Cast Rate","+20% Faster Block Rate","+60-100% Enhanced Defense","+10 to Energy","15% Regenerate Mana","50% extra Gold from Monsters","20% better chance of getting Magic items","+3 to Light Radius"]},
{name:"Stone",runes:["Shael","Um","Pul","Lum"],level:"47",itemType:"Body Armor",attributes:["+60% Faster Hit Recovery","+250-290% Enhanced Defense","+300 Defense Vs. Missile","+16 To Strength","+16 To Vitality","+10 To Energy","+15 to all Resistances","80 Charges Level 16 Molten Boulder","16 Charges Level 16 Clay Golem"]},
{name:"Wind",runes:["Sur","El"],level:"?",itemType:"Melee Weapons Armor",attributes:["10% chance to cast level 9 Tornado on striking","+20% Faster Run/Walk","+40% Increased Attack Speed","+15% Faster Hit Recovery","+120-160% Enhanced Damage","-50% Target Defense","+50 to Attack Rating","Hit Blinds Target","+1 to Light Radius","127 Charges Level 13 Twister"]},
{name:"Bone (Necromancer)",runes:["Sol","Um","Um"],level:"47",itemType:"Body Armor",attributes:["15% Chance to cast level 10 Bone Armor when struck","15% Chance to cast level 10 Bone Spear on striking","+2 to Necromancer Skill Levels","+100-150 to mana","+30 to All Resistances","Damage Reduced by 7"]},
{name:"Enlightenment (Sorceress)",runes:["Pul","Ral","Sol"],level:"45",itemType:"Body Armor",attributes:["5% Chance to cast level 15 Blaze when struck","5% Chance to cast level 15 Fire Ball on striking","+2 to Sorceress Skill Levels","+1 to Warmth","+30% Enhanced Defense","+30% Fire Resist","Damage Reduced by 7"]},
{name:"Myth (Barbarian)",runes:["Hel","Amn","Nef"],level:"24",itemType:"Body Armor",attributes:["3% Chance to cast level 1 Howl when struck","10% Chance to cast level 1 Taunt on striking","+2 to Barbarian Skill Levels","+30 Defense vs. Missle","+10 Replenish Life","Attacker takes Damage of 14","Requirements -15%"]},
{name:"Peace (Amazon)",runes:["Shael","Thul","Amn"],level:"29",itemType:"Body Armor",attributes:["4% Chance to cast level 5 Slow Missles when struck","2% Chance to cast level 15 Valkyrie on striking","+2 to Amazon Skill Levels","+20% Faster Hit Recovery","+2 to Critical Strike","+30% Cold Resist","Attacker Takes Damage of 14"]},
{name:"Principle (Paladin)",runes:["Ral","Gul","Eld"],level:"53",itemType:"Body Armor",attributes:["100% Chance to cast level 5 Holy Bolt on striking","+2 to Paladin Skill Levels","15% Slower Stamina Drain","+5% to Maximum Poison Resist","+30% Fire Resist"]},
{name:"Rain (Druid)",runes:["Ort","Mal","Ith"],level:"49",itemType:"Body Armor",attributes:["5% Chance to cast level 15 Cyclone Armor when struck","5% Chance to cast level 15 Twister on striking","+2 to Druid Skills","+100-150 to Mana","Lightning Resist +30%","Magic Damage Reduced by 7","15% Damage Taken Goes To Mana"]},
{name:"Treachery (Assassin)",runes:["Shael","Thul","Lem"],level:"43",itemType:"Body Armor",attributes:["5% Chance to cast level 15 Fade when struck","25% Chance to cast level 15 Venom on striking","+2 to Assassin Skills","+45% Increased Attack Speed","+20% Faster Hit Recovery","+30% Cold Resist","50% Extra Gold from Monsters"]}
];
