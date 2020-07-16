// [...]

/// Currently there is no nice way to call this from Client
/// See ..\Custom Commands\README.md for more details and possible workarounds

// get entity(player) JS object from somewhere
let player = ???;
// get player name
let playername = this.getComponent(player, "minecraft:nameable").data.name;
// set slot number
let slot = 1;
// set item id
let item = "dirt";
// change inventory (enderchest is also possible)
system.executeCommand("/replaceitem entity " + playername + " slot.inventory " + slot + " " + item, function () { });

// for more options see https://minecraft.gamepedia.com/Commands/replaceitem

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information