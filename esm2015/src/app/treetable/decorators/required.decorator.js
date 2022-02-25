/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Decorator that sets an Input() propertiy as required, will
 * throw an error if the property is not specified in the template.
 * I.e. \@Input() \@Required myProp: number;
 * @param {?} target
 * @param {?} property
 * @return {?}
 */
export function Required(target, property) {
    Object.defineProperty(target, property, {
        /**
         * @return {?}
         */
        get() {
            throw new Error(`Input '${property}' is required. Have you forgotten to add [${property}] = ... in your template?`);
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set(value) {
            Object.defineProperty(target, property, {
                value,
                writable: true,
                configurable: true
            });
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWwtdHJlZXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FwcC90cmVldGFibGUvZGVjb3JhdG9ycy9yZXF1aXJlZC5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7SUFDdkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFOzs7O1FBQ3RDLEdBQUc7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsUUFBUSw2Q0FBNkMsUUFBUSwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3RILENBQUM7Ozs7O1FBQ0QsR0FBRyxDQUFDLEtBQUs7WUFDUCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0JBQ3RDLEtBQUs7Z0JBQ0wsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlY29yYXRvciB0aGF0IHNldHMgYW4gSW5wdXQoKSBwcm9wZXJ0aXkgYXMgcmVxdWlyZWQsIHdpbGxcbiAqIHRocm93IGFuIGVycm9yIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3Qgc3BlY2lmaWVkIGluIHRoZSB0ZW1wbGF0ZS5cbiAqIEkuZS4gQElucHV0KCkgQFJlcXVpcmVkIG15UHJvcDogbnVtYmVyO1xuICovXG5leHBvcnQgZnVuY3Rpb24gUmVxdWlyZWQodGFyZ2V0OiBPYmplY3QsIHByb3BlcnR5OiBzdHJpbmcpOiB2b2lkIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICBnZXQoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYElucHV0ICcke3Byb3BlcnR5fScgaXMgcmVxdWlyZWQuIEhhdmUgeW91IGZvcmdvdHRlbiB0byBhZGQgWyR7cHJvcGVydHl9XSA9IC4uLiBpbiB5b3VyIHRlbXBsYXRlP2ApO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4iXX0=