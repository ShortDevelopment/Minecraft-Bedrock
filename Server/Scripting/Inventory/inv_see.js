// [...]

/// Currently there is no nice way to call this from Client
/// See ..\Custom Commands\README.md for more details and possible workarounds

// get entity(player) JS object from somewhere
let player = ???;

// get player inventory
// From gamepedia:
//This component represents the inventory contents of an entity.
//The component contains an array of ItemStack JS API Objects representing each slot in the inventory.
//NOTE: Currently items and containers are read-only.
// For a workaround see inv_change.js
//Slot 0-8 is the hotbar, 9-16 is the top row of the player's inventory, 17-24 is the middle row, 25-32 is the bottom row
let inventory = this.getComponent(player, "minecraft:inventory_container");

// send infos to chat
this.tellPlayer("@a", this.ObjToStr(inventory.data));

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information