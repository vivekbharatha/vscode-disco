module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/color.js":
/*!**********************!*\
  !*** ./src/color.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

let Color = {};

Color.getClockColor = function () {
    let now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        formattedHours = (hours > 9) ? hours : '0' + hours,
        formattedMinutes = (minutes > 9) ? minutes : '0' + minutes,
        formattedSeconds = (seconds > 9) ? seconds : '0' + seconds;
    
    return '#' + formattedHours + formattedMinutes + formattedSeconds;
}

Color.getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = Color;

/***/ }),

/***/ "./src/disco.js":
/*!**********************!*\
  !*** ./src/disco.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const Color = __webpack_require__(/*! ./color */ "./src/color.js");
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
    "statusBar.background": "#103362",
    "statusBarItem.hoverBackground": "#174a8e",
    "statusBar.foreground": "#e7e7e7"
};

Disco.startDisco = function () {
    vscode._state = 'startDisco';
    clearInterval(vscode._discoInterval);
    let configuration = vscode.workspace.getConfiguration();
    // new Promise((resolve, reject) => {
    //     vscode._discoInterval = setInterval(async () => {
    //       if (vscode._state === '') {
    //         return clearInterval(vscode._discoInterval);
    //       }
    //       await configuration.update("workbench.colorCustomizations", {
    //           "activityBar.background": Color.getRandomColor()
    //       }, vscode.workspace.name === undefined).then((data) => {
              
    //           resolve();
    //       }).catch((e) => {
    //           vscode.window.showInformationMessage('Error in starting disco!');
    //       });
    //     }, vscode._discoIntervalValue);
    // }).then(() => {
    //     vscode.window.showInformationMessage('Disco started!');
    // });
    while(1) {

    }
}


Disco.reset = function () {
    vscode._state = '';
    clearInterval(vscode._discoInterval);
    let configuration = vscode.workspace.getConfiguration();
    new Promise((resolve, reject) => {
      let k = configuration;
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

let updateColors = async function() { 
  while(vscode._state !== 'startDisco') {
    await configuration.update("workbench.colorCustomizations", {
              "activityBar.background": Color.getRandomColor()
          }, vscode.workspace.name === undefined).then((data) => {
              
              resolve();
          }).catch((e) => {
              vscode.window.showInformationMessage('Error in starting disco!');
          });
  }
}

module.exports = Disco;

/***/ }),

/***/ "./src/extension.js":
/*!**************************!*\
  !*** ./src/extension.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(/*! vscode */ "vscode");
const Disco = __webpack_require__(/*! ./disco */ "./src/disco.js");

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

	let r_reset = vscode.commands.registerCommand('extension.resetColors', function () {
		Disco.reset();
	});

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map