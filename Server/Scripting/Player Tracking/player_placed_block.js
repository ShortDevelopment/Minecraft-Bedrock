// initialize server
let system = server.registerSystem(1, 0);

let restrictedBlocks = ["structure_block", "barrier"];

// called on startup
system.initialize = function () {

	// Enable error logging
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
	loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	// register for "player_placed_block" event
	// see https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation#Server_Events for all events and returned "eventData"
	// the actual data is in "eventData.data"!
	this.listenForEvent("minecraft:player_placed_block", (eventData) => {
		// get player name
		let player_name = this.getComponent(eventData.data.player, "minecraft:nameable").data.name;
		// get player position
		let pos = eventData.data.block_position;
		// check what item player has in hand
		// this has to the block he has placed
		let item = this.getComponent(eventData.data.player, "minecraft:hand_container").data[0].item;
		// get item id without namespace
		let itemname = item.split(":")[1];
		// check if block is restricted
		if (restrictedBlocks.includes(itemname)) {
			this.tellPlayer("@a", player_name + " has placed " + '"§4' + item + '§f"' + " at " + pos.x + ' ' + pos.y + ' ' + pos.z + "!");
		}
	});
};

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information