# JSON Formatting in Minecraft Bedrock
Use it for signs or `/tellraw` or `/titleraw`...

[See Also](https://minecraft.gamepedia.com/Raw_JSON_text_format#Bedrock_Edition)

## Simple Text
```json
{ "rawtext": [ { "text": "§4hallo!" } ] }
```

## Scoreboard
`/scoreboard objectives add mc_test dummy "§4Test:"`
```json
{ "rawtext": [ { "score": { "name": "@p", "objective": "mc_test" } } ] }
```

## Selectors

### Current Reader
```json
{ "rawtext": [ { "selector": "*" } ] }
```

### Other Selectors
```json
{ "rawtext": [ { "selector": "@p" } ] }
```

## Translation
```json
{ "rawtext": [ { "translate": "commands.op.success" } ] }
```

### Parameters
```json
{ "rawtext": [ { "translate": "commands.op.success", "with":  { "rawtext": [ { "translate": "item.apple.name" } ] } } ] }
```

```json
{ "rawtext": [ { "translate": "commands.op.success", "with":  { "rawtext": [ { "selector": "*" } ] } } ] }
```