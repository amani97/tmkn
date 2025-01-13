import { FormGroup, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IFormArrayService } from '../abstracts/form-array/base-form-array.abstract';

@Injectable()
export class FormArrayService extends IFormArrayService {
  public getFormArrayItems(keyName: string, fg: FormGroup): FormArray {
    try {
      return fg?.get(keyName) as FormArray;
    } catch (e) {
      return new FormArray([] as any[]);
    }
  }

  public addItemToFormArray(keyName: string, fg: FormGroup, fc: any) {
    this.getFormArrayItems(keyName, fg).push(fc);
  }

  public removeItemFromFormArray(keyName: string, fg: FormGroup, index: number) {
    this.getFormArrayItems(keyName, fg).removeAt(index);
  }

  public clearFormArray(keyName: string, fg: FormGroup) {
    const formArray = this.getFormArrayItems(keyName, fg);
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}
