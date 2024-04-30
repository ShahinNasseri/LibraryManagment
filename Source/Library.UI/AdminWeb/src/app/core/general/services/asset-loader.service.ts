import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class assetLoaderService {
  private scripts: string[] = [];
  private styles: string[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadScripts(paths: string[]): Promise<void[]> {
    const promises: Promise<void>[] = paths.map((path) =>
      this.loadScript(path)
    );
    return Promise.all(promises);
  }

  loadScript(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.scripts.includes(path)) {
        resolve();
      } else {
        const script = this.document.createElement('script');
        script.src = path;
        script.onload = () => {
          this.scripts.push(path);
          resolve();
        };
        script.onerror = (error: any) => {
          reject(error);
        };
        this.document.head.appendChild(script);
      }
    });
  }

  loadStyles(paths: string[]): Promise<void[]> {
    const promises: Promise<void>[] = paths.map((path) => this.loadStyle(path));
    return Promise.all(promises);
  }

  loadStyle(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.styles.includes(path)) {
        resolve();
      } else {
        const style = this.document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = path;
        style.onload = () => {
          this.styles.push(path);
          resolve();
        };
        style.onerror = (error: any) => {
          reject(error);
        };
        this.document.head.appendChild(style);
      }
    });
  }
}
