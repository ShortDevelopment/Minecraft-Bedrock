# NPC / Tellraw Example
Example using the ["Jurassic World"](https://www.minecraft.net/de-de/pdp?id=90c165f8-b39e-446c-af7f-f0b1226b59a2) World from the Minecraft Marketplace.   

### Dialog-Text
```json
{"rawtext":[{"text": "Hallo, "}, {"selector": "@p"}, {"text":"!\nLukas hat mir Ausrüstung für dich gegeben!\nBediene dich!\n\nViel Erfolg!"}]}
```

### Command
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Hallo, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
```

### Button1
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Einmal §5Dino-Schutz§3 für dich, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
/replaceitem entity @p slot.armor.head 0 diamond_helmet
/replaceitem entity @p slot.armor.chest 0 diamond_chestplate
/replaceitem entity @p slot.armor.legs 0 diamond_leggings
/replaceitem entity @p slot.armor.feet 0 diamond_boots
```

### Button2
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Einmal §5Narkose-Ausrüstung§3 für dich, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
/give @p crossbow
/give @p arrow 64
```

### Button3
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Eine §5Elytra§3 für dich, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
/replaceitem entity @p slot.armor.chest 0 elytra
/give @p firework_rocket 64
```

### Button4
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Eine §5Transport-Box§3 für dich, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
/give @p spawn_egg 1 34
```

### Button5
```json
/tellraw @p {"rawtext":[{"text": "§f[§eAusrüstung§f]: §3Einmal §5"Flügel"§3 für dich, §f"}, {"selector": "@p"}, {"text":"§3!§f"}]}
/ability @p mayfly true
```

