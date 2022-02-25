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
        get: /**
         * @return {?}
         */
        function () {
            throw new Error("Input '" + property + "' is required. Have you forgotten to add [" + property + "] = ... in your template?");
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            Object.defineProperty(target, property, {
                value: value,
                writable: true,
                configurable: true
            });
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWwtdHJlZXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FwcC90cmVldGFibGUvZGVjb3JhdG9ycy9yZXF1aXJlZC5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7SUFDdkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO1FBQ3RDLEdBQUc7Ozs7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVUsUUFBUSxrREFBNkMsUUFBUSw4QkFBMkIsQ0FBQyxDQUFDO1FBQ3RILENBQUM7UUFDRCxHQUFHOzs7O2tCQUFDLEtBQUs7WUFDUCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0JBQ3RDLEtBQUssT0FBQTtnQkFDTCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVjb3JhdG9yIHRoYXQgc2V0cyBhbiBJbnB1dCgpIHByb3BlcnRpeSBhcyByZXF1aXJlZCwgd2lsbFxuICogdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBzcGVjaWZpZWQgaW4gdGhlIHRlbXBsYXRlLlxuICogSS5lLiBASW5wdXQoKSBAUmVxdWlyZWQgbXlQcm9wOiBudW1iZXI7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSZXF1aXJlZCh0YXJnZXQ6IE9iamVjdCwgcHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwge1xuICAgIGdldCgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgJyR7cHJvcGVydHl9JyBpcyByZXF1aXJlZC4gSGF2ZSB5b3UgZm9yZ290dGVuIHRvIGFkZCBbJHtwcm9wZXJ0eX1dID0gLi4uIGluIHlvdXIgdGVtcGxhdGU/YCk7XG4gICAgfSxcbiAgICBzZXQodmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiJdfQ==