const vscode = require('vscode');
const Color = require('./color');
let Disco = {};

let defaults = {
    "activityBar.background": "#174a8e",
    "activityBar.foreground": "#e7e7e7",
    "activityBar.inactiveForeground": "#e7e7e799",
    "activityBarBadge.background": "#e03f84",
    "activityBarBadge.foreground": "#e7e7e7",
    "titleBar.activeBackground": "#103362",
    "titleBar.inactiveBackground": "#10336299",
    "titleBar.activeForeground": "#e7e7e7",
    "titleBar.inactiveForeground": "#e7e7e799",
    "statusBar.background": "#103362",
    "statusBarItem.hoverBackground": "#174a8e",
    "statusBar.foreground": "#e7e7e7"
};

Disco.startDisco = function () {
    vscode._state = 'startDisco';
    clearInterval(vscode._discoInterval);
    let configuration = vscode.workspace.getConfiguration();
    new Promise((resolve, reject) => {
        vscode._discoInterval = setInterval(() => {
            configuration.update("workbench.colorCustomizations", {
                "activityBar.background": Color.getRandomColor()
            }, vscode.workspace.name === undefined).then((data) => {
                
                resolve();
            }).catch((e) => {
                vscode.window.showInformationMessage('Error in starting disco!');
            });
        }, vscode._discoIntervalValue);
    }).then(() => {
        vscode.window.showInformationMessage('Disco started!');
    });
}


Disco.default = function () {
    vscode._state = '';
    clearInterval(vscode._discoInterval);
    let configuration = vscode.workspace.getConfiguration();
    new Promise((resolve, reject) => {
            configuration.update("workbench.colorCustomizations", {
                "activityBar.background": defaults['activityBar.background']
            }, vscode.workspace.name === undefined).then((data) => {
                
                resolve();
            }).catch((e) => {
                vscode.window.showInformationMessage('Error in setting default theme!');
            });
    }).then(() => {
        vscode.window.showInformationMessage('Disco default theme applied!');
    });
}

module.exports = Disco;