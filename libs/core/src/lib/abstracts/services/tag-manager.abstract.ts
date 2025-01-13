import { Injectable } from '@angular/core';
import { LinkDefinition, ScriptDefinition } from '../../models/types';

@Injectable()
export abstract class ITagManagerService {
  abstract addTag(tag: LinkDefinition): void;
  abstract removeTag(id: string): void;
  abstract addScript(tag: ScriptDefinition): void;
  abstract removeScript(id: string): void;
}
