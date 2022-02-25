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
const uuidv4 = require('uuid/v4');
export class ConverterService {
    /**
     * @param {?} treeService
     */
    constructor(treeService) {
        this.treeService = treeService;
    }
    /**
     * Clone a Node<T> object and convert it to a SearchableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    toSearchableTree(tree) {
        /** @type {?} */
        const treeClone = (/** @type {?} */ (cloneDeep(tree)));
        this.treeService.traverse(treeClone, (node) => {
            node.id = node.id ? node.id : uuidv4();
        });
        return treeClone;
    }
    /**
     * Clone a SearchableNode<T> object and convert it to a TreeTableNode<T>
     * @template T
     * @param {?} tree the node to be converted
     * @return {?}
     */
    toTreeTableTree(tree) {
        /** @type {?} */
        const treeClone = (/** @type {?} */ (cloneDeep(tree)));
        this.treeService.traverse(treeClone, (node) => {
            node.depth = this.treeService.getNodeDepth(treeClone, node);
            node.isExpanded = true;
            node.isVisible = true;
        });
        return treeClone;
    }
}
ConverterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ConverterService.ctorParameters = () => [
    { type: TreeService }
];
/** @nocollapse */ ConverterService.ngInjectableDef = i0.defineInjectable({ factory: function ConverterService_Factory() { return new ConverterService(i0.inject(i1.TreeService)); }, token: ConverterService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ConverterService.prototype.treeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC10cmVldGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3RyZWV0YWJsZS9zZXJ2aWNlcy9jb252ZXJ0ZXIvY29udmVydGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7TUFDaEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFLakMsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUUzQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7Ozs7Ozs7SUFNakQsZ0JBQWdCLENBQUksSUFBYTs7Y0FDekIsU0FBUyxHQUFHLG1CQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBcUI7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBdUIsRUFBRSxFQUFFO1lBQy9ELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBTUQsZUFBZSxDQUFJLElBQXVCOztjQUNsQyxTQUFTLEdBQUcsbUJBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFvQjtRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFzQixFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7WUEvQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUFEsV0FBVzs7Ozs7SUFVTix1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlU2VydmljZSB9IGZyb20gJy4uL3RyZWUvdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vZGUsIFNlYXJjaGFibGVOb2RlLCBUcmVlVGFibGVOb2RlIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IGNsb25lRGVlcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5jb25zdCB1dWlkdjQgPSByZXF1aXJlKCd1dWlkL3Y0Jyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbnZlcnRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZVNlcnZpY2U6IFRyZWVTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQ2xvbmUgYSBOb2RlPFQ+IG9iamVjdCBhbmQgY29udmVydCBpdCB0byBhIFNlYXJjaGFibGVOb2RlPFQ+XG4gICAqIEBwYXJhbSB0cmVlIHRoZSBub2RlIHRvIGJlIGNvbnZlcnRlZFxuICAgKi9cbiAgdG9TZWFyY2hhYmxlVHJlZTxUPih0cmVlOiBOb2RlPFQ+KTogU2VhcmNoYWJsZU5vZGU8VD4ge1xuICAgIGNvbnN0IHRyZWVDbG9uZSA9IGNsb25lRGVlcCh0cmVlKSBhcyBTZWFyY2hhYmxlTm9kZTxUPjtcbiAgICB0aGlzLnRyZWVTZXJ2aWNlLnRyYXZlcnNlKHRyZWVDbG9uZSwgKG5vZGU6IFNlYXJjaGFibGVOb2RlPFQ+KSA9PiB7XG4gICAgICBub2RlLmlkID0gbm9kZS5pZCA/IG5vZGUuaWQgOiB1dWlkdjQoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJlZUNsb25lO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lIGEgU2VhcmNoYWJsZU5vZGU8VD4gb2JqZWN0IGFuZCBjb252ZXJ0IGl0IHRvIGEgVHJlZVRhYmxlTm9kZTxUPlxuICAgKiBAcGFyYW0gdHJlZSB0aGUgbm9kZSB0byBiZSBjb252ZXJ0ZWRcbiAgICovXG4gIHRvVHJlZVRhYmxlVHJlZTxUPih0cmVlOiBTZWFyY2hhYmxlTm9kZTxUPik6IFRyZWVUYWJsZU5vZGU8VD4ge1xuICAgIGNvbnN0IHRyZWVDbG9uZSA9IGNsb25lRGVlcCh0cmVlKSBhcyBUcmVlVGFibGVOb2RlPFQ+O1xuICAgIHRoaXMudHJlZVNlcnZpY2UudHJhdmVyc2UodHJlZUNsb25lLCAobm9kZTogVHJlZVRhYmxlTm9kZTxUPikgPT4ge1xuICAgICAgbm9kZS5kZXB0aCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Tm9kZURlcHRoKHRyZWVDbG9uZSwgbm9kZSk7XG4gICAgICBub2RlLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgbm9kZS5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiB0cmVlQ2xvbmU7XG4gIH1cblxufVxuIl19