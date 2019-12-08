const vscode = require('vscode');
const Color = require('./color');
let Disco = {};

let defaults = {
  "activityBar.background": "#ffffff16",
  "activityBar.foreground": "#e7e7e7",
  "activityBar.inactiveForeground": "#e7e7e799",
  "activityBarBadge.background": "#e03f84",
  "activityBarBadge.foreground": "#e7e7e7",
  "titleBar.activeBackground": "#103362",
  "titleBar.inactiveBackground": "#10336299",
  "titleBar.activeForeground": "#e7e7e7",
  "titleBar.inactiveForeground": "#e7e7e799",
  "statusBar.background": "#ffffff16",
  "statusBarItem.hoverBackground": "#174a8e",
  "statusBar.foreground": "#e7e7e7"
};

let configuration = vscode.workspace.getConfiguration();

Disco.startDisco = async function () {
  vscode._state = ''; // to stop while if running
  // await Disco.reset();
  await _delay(1000);
  vscode._state = 'startDisco';
  return updateColors();
}


Disco.reset = function () {
  vscode._state = '';
  return configuration.update("workbench.colorCustomizations", {
    "activityBar.background": defaults['activityBar.background']
  }, vscode.workspace.name === undefined)
    .then((data) => {
      return true;
    }).then(() => {
      vscode.window.showInformationMessage('Disco default theme applied!');
      return true;
    }).catch((e) => {
      vscode.window.showInformationMessage('Error in setting default theme!');
      return false;
    });
}

let _delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let updateColors = async function () {
  while (1) {
    if (vscode._state !== 'startDisco') {
      break;
    }
    try {
      await configuration.update("workbench.colorCustomizations", {
        "activityBar.background": Color.getRandomColor()
      }, vscode.workspace.name === undefined);
      await _delay(vscode._discoIntervalValue);
    } catch (e) {
      vscode.window.showInformationMessage('Error in starting disco!');
    }
  }
}

module.exports = Disco;