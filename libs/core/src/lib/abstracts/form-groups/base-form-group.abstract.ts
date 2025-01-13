import { FormGroup } from '@angular/forms';
import { OnDestroy, Injectable } from '@angular/core';
import { isEqual } from '@tmkn/utilities';


@Injectable()
export abstract class BaseFormGroupService<T> implements OnDestroy {
	_formGroup?: FormGroup;
	initialValue?: T;

	public get formGroup() {
		return this._formGroup;
	}

	public isValid(): boolean {
		return this._formGroup?.valid ?? false;
	}

	public isDisabled(): boolean {
		return this._formGroup?.disabled ?? false;
	}

	public isUpdated(): boolean {
		return !isEqual(this.initialValue, this._formGroup?.value);
	}

	// Builds the form group with an initial value.
	protected abstract build(initialValue?: T): FormGroup;

	// Get the value of the form group.
	public getValue(): T {
		return this._formGroup?.getRawValue() as T;
	}

	/**
	 * Initialize and create a form group.
	 * @param initialValue The initial value of the form group.
	 * @returns an instance of {@link FormGroup}
	 */
	public initialize(initialValue?: T): FormGroup {
		this.initialValue = initialValue;
		this._formGroup = this.build(this.initialValue);
		return this._formGroup;
	}

	ngOnDestroy(): void {
		this._formGroup?.reset();
		this.initialValue = null as T;
	}
}
