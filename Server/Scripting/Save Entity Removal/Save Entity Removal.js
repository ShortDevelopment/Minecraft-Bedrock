// initialize server
let system = server.registerSystem(1, 0);

let forbiddenEntities = ["wither", "tnt", "ender_crystal", "creeper", "blaze", "fireball", "tnt_minecart"];
let removeScheduledEntities = [];

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
		// get create entity JS object
		let entity = eventData.data.entity;
		// get entity id without namespace
		let entityname = entity.__identifier__.split(":")[1];
		// check if entity should be deletet
		if (forbiddenEntities.includes(entityname)) {
			// check if entity is valid
			if (this.isValidEntity(entity)) {
				let health = null;
				// get health component or generate it
				if (this.hasComponent(entity, "minecraft:health")) {
					health = this.getComponent(entity, "minecraft:health");
				} else {
					health = this.createComponent(entity, "minecraft:health");
				}
				if (health != null) {
					// set health to 10 so that the entity wont die (wither would die with an explosion => unwanted)
					health.data.value = 10;
					health.data.max = 10;
					// save health changes
					this.applyComponentChanges(entity, health);
				}
				// schedule entity for removal (see tick function below)
				globalVars.removeScheduledEntities.push({ "id": entityname, "data": entity });
			}
		}
	});
};

let ticks = 0;
// called every tick
system.update = function () {
	ticks++;
	// loop through all scheduled entities
	while (globalVars.removeScheduledEntities.length != 0) {
		// get last entity in list and remove it from list
		let item = globalVars.removeScheduledEntities.pop();
		// destroy entity without death animation / effect ect (e.g. Wither => no explanation)
		if (this.destroyEntity(item.data)) {
			this.SendChatMsg('"§2' + item.id + '§f"' + " was successfully removed!");
		}
	}
};

system.tellPlayer = function (playername, text) {
	// You can customize this command just like in Minecraft chat
	// Replace every " with '
	let body = text.split('"').join("'");
	system.executeCommand("/tellraw " + playername + ' {"rawtext":[{ "text": "[§3Server§f]: ' + body + '" } ]}', function (data) { });
};

// See https://minecraft.gamepedia.com/Bedrock_Edition_beta_scripting_documentation for more information