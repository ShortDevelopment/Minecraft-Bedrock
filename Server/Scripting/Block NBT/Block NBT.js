// [...]

/// Currently there is no nice way to call this from Client
/// See ..\Custom Commands\README.md for more details and possible workarounds

/// See "..\Player Tracking\block_destruction_started.js" for fully implementation

// get block JS object
let block = this.getBlock(tickingArea, block_position);
// get block nbt
let blockstateComponent = this.getComponent(block, "minecraft:blockstate");
// send infos to chat
this.tellPlayer("@a", this.ObjToStr(blockstateComponent.data));

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information