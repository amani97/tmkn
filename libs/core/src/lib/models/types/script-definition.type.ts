export declare type ScriptDefinition = {
  id?: string;
  async?: string;
  src: string;
  type?: string;
  'custom-element'?: string;
  'data-cfasync'?: string;
} & {
  [prop: string]: string;
};
