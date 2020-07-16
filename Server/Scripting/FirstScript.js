// initialize server
let system = server.registerSystem(1, 0);

// called on startup
system.initialize = function () {

	// Enable error logging
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
	loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	// register for "entity_created" event
	// see https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation#Server_Events for all events and returned "eventData"
	// the actual data is in "eventData.data"!
	this.listenForEvent("minecraft:entity_created", (eventData) => {
		// Send serialized eventData to chat
		this.SendChatMsg(this.ObjToStr(eventData));
		// Do something
	});
};

let ticks = 0;
// called every tick
system.update = function () {
	ticks++;
	this.SendChatMsg(ticks);
};

// called at shutdown
system.shutdown = function () {
	// Do something
};

/// Custom functions

system.myCustomFunction = function (param1) {
	// Do something
};

system.SendChatMsg = function (msg) {
	// native chat send function
	// use the tellPlayer function for a better looking
	let eventData = this.createEventData("minecraft:display_chat_event");
	eventData.data.message = msg;
	this.broadcastEvent("minecraft:display_chat_event", eventData);
};

system.ObjToStr = function (obj) {
	return JSON.stringify(obj, null, "    ");
};

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information