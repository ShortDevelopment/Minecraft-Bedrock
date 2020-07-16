# Custom Commands
## Possible workaround<br/>
Create Function witch sets a specific scoreboard value.<br/>
Server querys for all players and checks if player has scoreboard value by parsing result of /scoreboard players x list<br/>
<br/>
This way is not really fast and I hope there will be better ways in the future.<br/>
## Second workaround
It is also possible to create a custom item and subscribe to the entity_use_item event.