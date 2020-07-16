// initialize server
let system = server.registerSystem(1, 0);

// called on startup
system.initialize = function () {

	// Enable error logging
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
	loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	// register for "player_attacked_entity" event
	// see https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation#Server_Events for all events and returned "eventData"
	// the actual data is in "eventData.data"!
	this.listenForEvent("minecraft:player_attacked_entity", (eventData) => {
		// get victim entity JS object
		let victim = eventData.data.attacked_entity.__identifier__;
		// get attacking entity(player) JS object
		let killer = this.getComponent(eventData.data.player, "minecraft:nameable");
		// send infos to chat
		this.tellPlayer("@a", killer.data.name + " has attacket " + '"' + victim + '"' + "!");
	});
};

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information