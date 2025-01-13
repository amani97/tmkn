export const TM_FORM_CUSTOM_ERROR = {
  required: () => 'This field is required',
  minlength: (rangeValues: { requiredLength: number; actualLength: number }) =>
    `Expect ${rangeValues.requiredLength} but got ${rangeValues.actualLength}.`,
  invalidPhoneNumber: () => 'Invalid phone number.',
};
