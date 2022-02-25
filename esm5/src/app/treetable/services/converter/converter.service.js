/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TreeService } from '../tree/tree.service';
import { cloneDeep } from 'lodash-es';
import * as i0 from "@angular/core";
import * as i1 from "../tree/tree.service";
/** @type {?} */
var uuidv4 = require('uuid/v4');
var ConverterService = /** @class */ (function () {
    function ConverterService(treeService) {
        this.treeService = treeService;
    }
    /**
     * Clone a Node<T> object and convert it to a SearchableNode<T>
     * @param tree the node to be converted
     */
    /**
     * Clone a Node<T> object and convert it to a SearchableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    ConverterService.prototype.toSearchableTree = /**
     * Clone a Node<T> object and convert it to a SearchableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    function (tree) {
        /** @type {?} */
        var treeClone = (/** @type {?} */ (cloneDeep(tree)));
        this.treeService.traverse(treeClone, function (node) {
            node.id = node.id ? node.id : uuidv4();
        });
        return treeClone;
    };
    /**
     * Clone a SearchableNode<T> object and convert it to a TreeTableNode<T>
     * @param tree the node to be converted
     */
    /**
     * Clone a SearchableNode<T> object and convert it to a TreeTableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    ConverterService.prototype.toTreeTableTree = /**
     * Clone a SearchableNode<T> object and convert it to a TreeTableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    function (tree) {
        var _this = this;
        /** @type {?} */
        var treeClone = (/** @type {?} */ (cloneDeep(tree)));
        this.treeService.traverse(treeClone, function (node) {
            node.depth = _this.treeService.getNodeDepth(treeClone, node);
            node.isExpanded = true;
            node.isVisible = true;
        });
        return treeClone;
    };
    ConverterService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ConverterService.ctorParameters = function () { return [
        { type: TreeService }
    ]; };
    /** @nocollapse */ ConverterService.ngInjectableDef = i0.defineInjectable({ factory: function ConverterService_Factory() { return new ConverterService(i0.inject(i1.TreeService)); }, token: ConverterService, providedIn: "root" });
    return ConverterService;
}());
export { ConverterService };
if (false) {
    /** @type {?} */
    ConverterService.prototype.treeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC10cmVldGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3RyZWV0YWJsZS9zZXJ2aWNlcy9jb252ZXJ0ZXIvY29udmVydGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7SUFDaEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFFakM7SUFLRSwwQkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBSSxDQUFDO0lBRWpEOzs7T0FHRzs7Ozs7OztJQUNILDJDQUFnQjs7Ozs7O0lBQWhCLFVBQW9CLElBQWE7O1lBQ3pCLFNBQVMsR0FBRyxtQkFBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQXFCO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFDLElBQXVCO1lBQzNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsMENBQWU7Ozs7OztJQUFmLFVBQW1CLElBQXVCO1FBQTFDLGlCQVFDOztZQVBPLFNBQVMsR0FBRyxtQkFBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQW9CO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFDLElBQXNCO1lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Z0JBL0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUFEsV0FBVzs7OzJCQURwQjtDQXVDQyxBQWpDRCxJQWlDQztTQTlCWSxnQkFBZ0I7OztJQUVmLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVTZXJ2aWNlIH0gZnJvbSAnLi4vdHJlZS90cmVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm9kZSwgU2VhcmNoYWJsZU5vZGUsIFRyZWVUYWJsZU5vZGUgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoLWVzJztcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoJ3V1aWQvdjQnKTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ29udmVydGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlU2VydmljZTogVHJlZVNlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBDbG9uZSBhIE5vZGU8VD4gb2JqZWN0IGFuZCBjb252ZXJ0IGl0IHRvIGEgU2VhcmNoYWJsZU5vZGU8VD5cbiAgICogQHBhcmFtIHRyZWUgdGhlIG5vZGUgdG8gYmUgY29udmVydGVkXG4gICAqL1xuICB0b1NlYXJjaGFibGVUcmVlPFQ+KHRyZWU6IE5vZGU8VD4pOiBTZWFyY2hhYmxlTm9kZTxUPiB7XG4gICAgY29uc3QgdHJlZUNsb25lID0gY2xvbmVEZWVwKHRyZWUpIGFzIFNlYXJjaGFibGVOb2RlPFQ+O1xuICAgIHRoaXMudHJlZVNlcnZpY2UudHJhdmVyc2UodHJlZUNsb25lLCAobm9kZTogU2VhcmNoYWJsZU5vZGU8VD4pID0+IHtcbiAgICAgIG5vZGUuaWQgPSBub2RlLmlkID8gbm9kZS5pZCA6IHV1aWR2NCgpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cmVlQ2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmUgYSBTZWFyY2hhYmxlTm9kZTxUPiBvYmplY3QgYW5kIGNvbnZlcnQgaXQgdG8gYSBUcmVlVGFibGVOb2RlPFQ+XG4gICAqIEBwYXJhbSB0cmVlIHRoZSBub2RlIHRvIGJlIGNvbnZlcnRlZFxuICAgKi9cbiAgdG9UcmVlVGFibGVUcmVlPFQ+KHRyZWU6IFNlYXJjaGFibGVOb2RlPFQ+KTogVHJlZVRhYmxlTm9kZTxUPiB7XG4gICAgY29uc3QgdHJlZUNsb25lID0gY2xvbmVEZWVwKHRyZWUpIGFzIFRyZWVUYWJsZU5vZGU8VD47XG4gICAgdGhpcy50cmVlU2VydmljZS50cmF2ZXJzZSh0cmVlQ2xvbmUsIChub2RlOiBUcmVlVGFibGVOb2RlPFQ+KSA9PiB7XG4gICAgICBub2RlLmRlcHRoID0gdGhpcy50cmVlU2VydmljZS5nZXROb2RlRGVwdGgodHJlZUNsb25lLCBub2RlKTtcbiAgICAgIG5vZGUuaXNFeHBhbmRlZCA9IHRydWU7XG4gICAgICBub2RlLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyZWVDbG9uZTtcbiAgfVxuXG59XG4iXX0=