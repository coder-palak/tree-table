/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isEmpty, xor } from 'lodash-es';
import * as i0 from "@angular/core";
var ValidatorService = /** @class */ (function () {
    function ValidatorService() {
    }
    /**
     * @template T, K
     * @param {?} node
     * @param {?} customColumnOrder
     * @return {?}
     */
    ValidatorService.prototype.validateCustomOrder = /**
     * @template T, K
     * @param {?} node
     * @param {?} customColumnOrder
     * @return {?}
     */
    function (node, customColumnOrder) {
        /** @type {?} */
        var xorN = xor(Object.keys(node.value), customColumnOrder);
        return {
            valid: isEmpty(xorN),
            xor: xorN
        };
    };
    ValidatorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ ValidatorService.ngInjectableDef = i0.defineInjectable({ factory: function ValidatorService_Factory() { return new ValidatorService(); }, token: ValidatorService, providedIn: "root" });
    return ValidatorService;
}());
export { ValidatorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC10cmVldGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3RyZWV0YWJsZS9zZXJ2aWNlcy92YWxpZGF0b3IvdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBRXpDO0lBQUE7S0FhQzs7Ozs7OztJQVJDLDhDQUFtQjs7Ozs7O0lBQW5CLFVBQTBDLElBQU8sRUFBRSxpQkFBNEM7O1lBQ3ZGLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsaUJBQWlCLENBQUM7UUFDNUQsT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztJQUNKLENBQUM7O2dCQVhGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzsyQkFORDtDQWlCQyxBQWJELElBYUM7U0FWWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IGlzRW1wdHksIHhvciB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvclNlcnZpY2Uge1xuXG4gIHZhbGlkYXRlQ3VzdG9tT3JkZXI8VCwgSyBleHRlbmRzIE5vZGU8VD4+KG5vZGU6IEssIGN1c3RvbUNvbHVtbk9yZGVyOiBBcnJheTxrZXlvZiBUPiAmIHN0cmluZ1tdKTogeyB2YWxpZDogYm9vbGVhbiwgeG9yOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCB4b3JOID0geG9yKE9iamVjdC5rZXlzKG5vZGUudmFsdWUpLCBjdXN0b21Db2x1bW5PcmRlcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiBpc0VtcHR5KHhvck4pLFxuICAgICAgeG9yOiB4b3JOXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=