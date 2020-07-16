// initialize server
let system = server.registerSystem(1, 0);

let forbiddenItems = ["tnt", "ender_crystal"];

// called on startup
system.initialize = function () {

	// Enable error logging
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
	loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	// register for "entity_carried_item_changed" event
	// see https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation#Server_Events for all events and returned "eventData"
	// the actual data is in "eventData.data"!
	this.listenForEvent("minecraft:entity_carried_item_changed", (eventData) => {
		// get actual eventData
		let eventData_data = eventData.data;
		// check if entity is a player
		if (eventData_data.entity.__identifier__ == "minecraft:player") {
			// get player name
			let playername = this.getComponent(eventData_data.entity, "minecraft:nameable").data.name;
			// get carried item id
			let item = eventData_data.carried_item.item;
			if (item != "minecraft:undefined") {
				// get item id without namespace
				let itemname = item.split(":")[1];
				if (forbiddenItems.includes(itemname)) {
					system.executeCommand("/clear " + playername + " " + itemname, function () { });
					system.executeCommand("/title " + playername + " title §4§lNot Allowed§r!!", function () { });
				}
			}
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