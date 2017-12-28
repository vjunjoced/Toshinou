/*
Created by Freshek on 10.10.2017
*/

class ShipCreateHandler {
  static get ID() {
    return 14290;
  }

  constructor() {
    this._handler = function (e, a) {
      e.detail = e.wholeMessage.split("|").slice(1).join("");

      var shipCreateCmd = JSON.parse(e.detail);
      a.ships[shipCreateCmd.userId] = new Ship(shipCreateCmd.x, shipCreateCmd.y, shipCreateCmd.userId, shipCreateCmd.npc, shipCreateCmd.userName, shipCreateCmd.factionId);
      a.ships[shipCreateCmd.userId].clanDiplomacy = shipCreateCmd[Variables.clanDiplomacy].type;
    }
  }

  get handler() {
    return this._handler;
  }
}