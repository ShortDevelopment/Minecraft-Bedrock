let system = server.registerSystem(1, 0);

system.initialize = function() {
	
	const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
    loglevelChangevent.data = {log_errors: true, log_warnings: true, log_information: true};
	this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);

	this.registerEventData("camoverlay:result", { player: {} });
	this.listenForEvent("camoverlay:request", (eventData) => {
		let player = eventData.data.player;
		this.SendChatMsg(this.ObjToStr(eventData));
		let raw = this.getComponent(player, "minecraft:nameable");
		let playername = "";
		if (raw != null) {
			playername = raw.data.name;
        }
		if (playername == "CamAccount") {
			this.SendChatMsg("Wow, I'm a CamAccount!!");
			let senddata = this.createEventData('camoverlay:result');
			senddata.data.player = player;
			this.broadcastEvent('camoverlay:result', senddata);
		}		
	});
};
system.SendChatMsg = function (msg) {
	let eventData = this.createEventData("minecraft:display_chat_event");
	eventData.data.message = msg;
	this.broadcastEvent("minecraft:display_chat_event", eventData);
};
system.ObjToStr = function (obj) {
	return JSON.stringify(obj, null, "    ");
};