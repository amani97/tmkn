import {
  Injectable,
  RendererFactory2,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ScriptDefinition, LinkDefinition } from '../models/types';
import { ITagManagerService } from '../abstracts/services';

@Injectable()
export class TagManagerService implements ITagManagerService {
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  removeTag(id: string): void {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {},
      });

      const head = this.document.head;

      if (head === null) {
        throw new Error('<head> not found within DOCUMENT.');
      }
      const tag = this.document.getElementById(id);

      if (!tag) return;

      renderer.removeChild(head, tag);
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  removeScript(id: string): void {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {},
      });

      const body = this.document.body;

      if (body === null) {
        throw new Error('<body> not found within DOCUMENT.');
      }
      const tag = this.document.getElementById(id);

      if (!tag) return;

      renderer.removeChild(body, tag);
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  addTag(tag: LinkDefinition): void {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {},
      });

      const link = renderer.createElement('link');
      const head = this.document.head;
      // const selector = this._parseSelector(tag);

      if (head === null) {
        throw new Error('<head> not found within DOCUMENT.');
      }

      Object.keys(tag).forEach((prop: string) => {
        return renderer.setAttribute(link, prop, tag[prop]);
      });

      // [TODO]: get them to update the existing one (if it exists) ?
      renderer.appendChild(head, link);
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  addScript(tag: ScriptDefinition): void {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {},
      });

      const script = renderer.createElement('script');
      const body = this.document.body;

      if (body === null) {
        throw new Error('<body> not found within DOCUMENT.');
      }

      Object.keys(tag).forEach((prop: string) => {
        return renderer.setAttribute(script, prop, tag[prop]);
      });

      // [TODO]: get them to update the existing one (if it exists) ?
      renderer.appendChild(body, script);
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  private _parseSelector(tag: LinkDefinition): string {
    // Possibly re-work this
    const attr: string = tag.rel ? 'rel' : 'hreflang';
    return `${attr}="${tag[attr]}"`;
  }
}
