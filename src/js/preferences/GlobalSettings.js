/*
 Created by Freshek on 31.10.2017
 */

class GlobalSettings {
  constructor() {
    var self = this;

    let defaultSettings = {
      headerColor: "#191919",
      headerOpacity: "0.9",
      windowColor: "#191919",
      windowOpacity: "0.8",
      timerTick: 300,
      showRuntime: false,
      speedFormat: 'hour',
      windowsToTabs: false,
      minimapShow: true,
      attackDetailsShow: true,
      generalSettingsShow: true,
      autolockShow: true,
      npcSettingsShow: true,
      statisticShow: true,
    };

    chrome.storage.local.get(null, items => {

      let _settings = Object.assign(defaultSettings, items);

      self._settings = _settings;

      Object.keys(_settings).forEach((obj)=> {

        Object.defineProperty(self, obj, {
          get: function () {
            return this._settings[obj];
          }
        });

      });

    });

  }
}
