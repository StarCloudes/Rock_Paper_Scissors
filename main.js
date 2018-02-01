'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    frame: false
  })

  // load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './client/index.html'),
    protocol: 'file:',
    slashes: true
  }))

 // Open the DevTools.
 //mainWindow.webContents.openDevTools()

//set up close window

 mainWindow.on('closed', function () {
    mainWindow = null
   })
}

//create window when the app is ready
app.on('ready', createWindow)

// quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// reopen the app
app.on('activate', function () {
   if (mainWindow === null) {
    createWindow()
  }
})

