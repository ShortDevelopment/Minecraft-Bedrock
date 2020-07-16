// initialize server
let system = server.registerSystem(1, 0);

// called on startup
system.initialize = function () {

	// Enable error logging
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
	loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	// register for "block_destruction_started" event
	// see https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation#Server_Events for all events and returned "eventData"
	// the actual data is in "eventData.data"!
	this.listenForEvent("minecraft:block_destruction_started", (eventData) => {
		// get player JS object
		let player = eventData.data.player;
		// get player name
		let playername = this.getComponent(player, "minecraft:nameable").data.name;
		// get temp tickingarea around player
		let tickingArea = this.getComponent(player, "minecraft:tick_world").data.ticking_area;
		// get block JS object
		let block = this.getBlock(tickingArea, tickingArea);
		// get block nbt data
		let blockstateComponent = this.getComponent(block, "minecraft:blockstate");
		// send infos to chat
		this.tellPlayer("@a", playername + " tries to destruct '" + block.__identifier__ + "' in survival. NBT Data: " + this.ObjToStr(blockstateComponent.data));
	});
};

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information