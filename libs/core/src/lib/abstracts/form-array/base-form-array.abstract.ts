import { FormGroup, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class IFormArrayService {
  abstract getFormArrayItems(keyName: string, fg: FormGroup): FormArray;
  abstract addItemToFormArray(keyName: string, fg: FormGroup, fc: any): void;
  abstract removeItemFromFormArray(keyName: string, fg: FormGroup, index: number): void;
  abstract clearFormArray(keyName: string, fg: FormGroup): void;
}
