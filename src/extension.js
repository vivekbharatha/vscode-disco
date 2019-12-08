// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Disco = require('./disco');

vscode._discoInterval;
vscode._discoIntervalValue = 100;
vscode._state = '';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-disco" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let r_startDisco = vscode.commands.registerCommand('extension.startDisco', function () {
		Disco.startDisco();
	});

	let r_stopDisco = vscode.commands.registerCommand('extension.stopDisco', function () {
		vscode._state = '';
		clearInterval(vscode._discoInterval);
		vscode.window.showInformationMessage('Disco stoped!');
	});

	let r_increaseDiscoIntervalTime = vscode.commands.registerCommand('extension.increaseDiscoIntervalTime', function () {
		vscode._discoIntervalValue += 100;
		vscode.window.showInformationMessage(`Disco interval: ${vscode._discoIntervalValue}`);
		if (typeof Disco[vscode._state] === 'function') {
			Disco[vscode._state]();
		}
	});
	
	let r_decreaseDiscoIntervalTime = vscode.commands.registerCommand('extension.decreaseDiscoIntervalTime', function () {
		if (vscode._discoIntervalValue - 100 < 100) {
			vscode.window.showInformationMessage('Minimum value is 100ms');
			return;
		}
		vscode._discoIntervalValue -= 100;
		vscode.window.showInformationMessage(`Disco interval: ${vscode._discoIntervalValue}`);
		if (typeof Disco[vscode._state] === 'function') {
			Disco[vscode._state]();
		}
	});

	let r_defaultDisco = vscode.commands.registerCommand('extension.stopDisco', function () {
		vscode._state = '';
		clearInterval(vscode._discoInterval);
		vscode.window.showInformationMessage('Disco default theme applied!');
	});

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
