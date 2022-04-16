import { app, App, BrowserWindow } from 'electron';
import { resolve } from 'path';

class AsCodeApplication {
  private mainWindow: BrowserWindow | null = null;
  private entryPointURL = `file://${resolve(__dirname, '../client/page/index.html')}`;

  constructor(private app: App) {
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('ready', () => this.ready());
    this.app.on('activate', () => this.activate());
  }
  activate(): void {
    throw new Error('Method not implemented.');
  }
  ready(): void {
    this.mainWindow = new BrowserWindow({
      width: 500,
      height: 400,
      acceptFirstMouse: true,
    });
    this.mainWindow.on('closed', () => this.mainWindow = null);
    this.mainWindow.loadURL(this.entryPointURL);
  }
  onWindowAllClosed() {
    this.app.quit();
  }
}

const instance = new AsCodeApplication(app);
