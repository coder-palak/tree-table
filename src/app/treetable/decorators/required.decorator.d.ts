/**
 * Decorator that sets an Input() propertiy as required, will
 * throw an error if the property is not specified in the template.
 * I.e. @Input() @Required myProp: number;
 */
export declare function Required(target: Object, property: string): void;
