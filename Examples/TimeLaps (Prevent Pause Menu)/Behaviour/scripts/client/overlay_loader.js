var system = client.registerSystem(2, 0);

system.initialize = function () {

    const loglevelChangevent = this.createEventData('minecraft:script_logger_config');
    loglevelChangevent.data = { log_errors: true, log_warnings: true, log_information: true };
    this.broadcastEvent('minecraft:script_logger_config', loglevelChangevent);   
    
    this.registerEventData("camoverlay:request", { player: {} });

    this.listenForEvent("minecraft:client_entered_world", (eventData) => this.onNewPlayer(eventData));
    this.listenForEvent("camoverlay:result", (eventData) => {
        let NewPlayer = eventData.data.player.__unique_id__;
        let localPlayer = client.local_player.__unique_id__;
        if (this.CompareIDs(localPlayer, NewPlayer)) { // Player is Current Player
            this.SendChatMsg("Okay!!");
            this.ShowScreen("time_laps_overlay.html");
        }
    });
};

system.CompareIDs = function (id1, id2) {
    if (id1["64bit_low"] === id2["64bit_low"] && id1["64bit_heigh"] === id2["64bit_heigh"]) {
        return true;
    }
    return false;
};

system.SendChatMsg = function (msg) {
    let eventData = this.createEventData("minecraft:display_chat_event");
    eventData.data.message = msg;
    this.broadcastEvent("minecraft:display_chat_event", eventData);
};

system.ObjToStr = function (obj) {
    return JSON.stringify(obj, null, "    ");
};

system.ShowScreen = function (name) {
    let loadEventData = this.createEventData("minecraft:load_ui");
    loadEventData.data.path = name;
    loadEventData.data.options.is_showing_menu = true;
    loadEventData.data.options.always_accepts_input = true;
    loadEventData.data.options.render_only_when_topmost = true;
    this.broadcastEvent("minecraft:load_ui", loadEventData);
};

system.onNewPlayer = function (eventData) {
    let NewPlayer = eventData.data.player.__unique_id__;
    let localPlayer = client.local_player.__unique_id__;
    this.SendChatMsg("New Player!");
    if (this.CompareIDs(localPlayer, NewPlayer)) { // Player is Current Player
        this.SendChatMsg("Send Event!!");
        let data2send = this.createEventData('camoverlay:request');
        data2send.data.player = client.local_player;
        this.broadcastEvent('camoverlay:request', data2send);
    }
};