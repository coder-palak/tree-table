/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isEmpty, xor } from 'lodash-es';
import * as i0 from "@angular/core";
export class ValidatorService {
    /**
     * @template T, K
     * @param {?} node
     * @param {?} customColumnOrder
     * @return {?}
     */
    validateCustomOrder(node, customColumnOrder) {
        /** @type {?} */
        const xorN = xor(Object.keys(node.value), customColumnOrder);
        return {
            valid: isEmpty(xorN),
            xor: xorN
        };
    }
}
ValidatorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ValidatorService.ngInjectableDef = i0.defineInjectable({ factory: function ValidatorService_Factory() { return new ValidatorService(); }, token: ValidatorService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC10cmVldGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3RyZWV0YWJsZS9zZXJ2aWNlcy92YWxpZGF0b3IvdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBS3pDLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7SUFFM0IsbUJBQW1CLENBQXVCLElBQU8sRUFBRSxpQkFBNEM7O2NBQ3ZGLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsaUJBQWlCLENBQUM7UUFDNUQsT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztJQUNKLENBQUM7OztZQVhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNFbXB0eSwgeG9yIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yU2VydmljZSB7XG5cbiAgdmFsaWRhdGVDdXN0b21PcmRlcjxULCBLIGV4dGVuZHMgTm9kZTxUPj4obm9kZTogSywgY3VzdG9tQ29sdW1uT3JkZXI6IEFycmF5PGtleW9mIFQ+ICYgc3RyaW5nW10pOiB7IHZhbGlkOiBib29sZWFuLCB4b3I6IHN0cmluZ1tdIH0ge1xuICAgIGNvbnN0IHhvck4gPSB4b3IoT2JqZWN0LmtleXMobm9kZS52YWx1ZSksIGN1c3RvbUNvbHVtbk9yZGVyKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IGlzRW1wdHkoeG9yTiksXG4gICAgICB4b3I6IHhvck5cbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==