// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

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
	let disposable = vscode.commands.registerCommand('extension.startDisco', function () {
		// The code you place here will be executed every time your command is executed
		startDisco().then(() => {});
	});

	context.subscriptions.push(disposable);
}

/**
 *  {
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
	}
 */

function startDisco() {
	let configuration = vscode.workspace.getConfiguration();
	return new Promise((resolve, reject) => {
		setInterval(() => {
			configuration.update("workbench.colorCustomizations", {
				"activityBar.background": randomColor()
			}, vscode.workspace.name === undefined).then((data) => {
				resolve();
			});
		}, 2000); // TODO :: configurable
	});
}

function randomColor() {
	var letters = '0123456789ABCDEF';
  	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
  	return color;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
