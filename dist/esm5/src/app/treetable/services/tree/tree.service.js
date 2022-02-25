/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { some, none } from 'fp-ts/lib/Option';
import * as i0 from "@angular/core";
var TreeService = /** @class */ (function () {
    function TreeService() {
    }
    /**
     * Traverse a tree data structure and applies the provided @param f function
     * to all nodes
     * @param root the tree to be traversed
     * @param f the function to be applied to all nodes
     * N.B. this function modifies the existing tree
     */
    /**
     * Traverse a tree data structure and applies the provided \@param f function
     * to all nodes
     * @template T, K
     * @param {?} root the tree to be traversed
     * @param {?} f the function to be applied to all nodes
     * N.B. this function modifies the existing tree
     * @return {?}
     */
    TreeService.prototype.traverse = /**
     * Traverse a tree data structure and applies the provided \@param f function
     * to all nodes
     * @template T, K
     * @param {?} root the tree to be traversed
     * @param {?} f the function to be applied to all nodes
     * N.B. this function modifies the existing tree
     * @return {?}
     */
    function (root, f) {
        this._traverse(root, function (node) {
            f(node);
            return true;
        });
    };
    /**
     * Search a tree for a node with the provided @param id
     * @param root the tree to be searched
     * @param id the id of the node to be retrieved
     */
    /**
     * Search a tree for a node with the provided \@param id
     * @template T, K
     * @param {?} root the tree to be searched
     * @param {?} id the id of the node to be retrieved
     * @return {?}
     */
    TreeService.prototype.searchById = /**
     * Search a tree for a node with the provided \@param id
     * @template T, K
     * @param {?} root the tree to be searched
     * @param {?} id the id of the node to be retrieved
     * @return {?}
     */
    function (root, id) {
        /** @type {?} */
        var matchingNode;
        /** @type {?} */
        var pathToRoot = {};
        this._traverse(root, function (node) {
            node.children.forEach(function (child) {
                pathToRoot[child.id] = node;
            });
            if (node.id === id) {
                matchingNode = node;
            }
            return node.id !== id;
        });
        return matchingNode ? some({
            id: matchingNode.id,
            value: matchingNode.value,
            children: matchingNode.children,
            pathToRoot: this.buildPath(id, pathToRoot)
        }) : none;
    };
    /**
     * Internal function that can be used to traverse or search the tree
     * @param root the tree to be scanned
     * @param f an optional function to be applied to all nodes
     */
    /**
     * Internal function that can be used to traverse or search the tree
     * @template T, K
     * @param {?} root the tree to be scanned
     * @param {?} f an optional function to be applied to all nodes
     * @return {?}
     */
    TreeService.prototype._traverse = /**
     * Internal function that can be used to traverse or search the tree
     * @template T, K
     * @param {?} root the tree to be scanned
     * @param {?} f an optional function to be applied to all nodes
     * @return {?}
     */
    function (root, f) {
        var _this = this;
        if (!f(root)) {
            return;
        }
        root.children.forEach(function (c) { return _this._traverse(c, f); });
    };
    /**
     * Given a @param root tree and a @param node node, calculate the
     * depth of the node in the tree
     * @param root the tree
     * @param node the node we want to calculate the depth of
     */
    /**
     * Given a \@param root tree and a \@param node node, calculate the
     * depth of the node in the tree
     * @template T, K
     * @param {?} root the tree
     * @param {?} node the node we want to calculate the depth of
     * @return {?}
     */
    TreeService.prototype.getNodeDepth = /**
     * Given a \@param root tree and a \@param node node, calculate the
     * depth of the node in the tree
     * @template T, K
     * @param {?} root the tree
     * @param {?} node the node we want to calculate the depth of
     * @return {?}
     */
    function (root, node) {
        return this.searchById(root, node.id).fold(-1, function (n) { return n.pathToRoot.length; });
    };
    /**
     * Flatten a @param root tree into a list of its nodes
     * @param root the tree to be flattened
     */
    /**
     * Flatten a \@param root tree into a list of its nodes
     * @template T, K
     * @param {?} root the tree to be flattened
     * @return {?}
     */
    TreeService.prototype.flatten = /**
     * Flatten a \@param root tree into a list of its nodes
     * @template T, K
     * @param {?} root the tree to be flattened
     * @return {?}
     */
    function (root) {
        /** @type {?} */
        var result = [cloneDeep(root)];
        for (var i = 0; i < result.length; i++) {
            /** @type {?} */
            var node = result[i];
            if (node.children) {
                result.splice.apply(result, tslib_1.__spread([result.indexOf(node) + 1, 0], (/** @type {?} */ (node.children))));
            }
        }
        return result;
    };
    /**
     * Internal function used to build the pathToRoot of a node in a tree
     * @param id the id of the node
     * @param pathMap the pathMap returned by searchById
     */
    /**
     * Internal function used to build the pathToRoot of a node in a tree
     * @template T, K
     * @param {?} id the id of the node
     * @param {?} pathMap the pathMap returned by searchById
     * @return {?}
     */
    TreeService.prototype.buildPath = /**
     * Internal function used to build the pathToRoot of a node in a tree
     * @template T, K
     * @param {?} id the id of the node
     * @param {?} pathMap the pathMap returned by searchById
     * @return {?}
     */
    function (id, pathMap) {
        /** @type {?} */
        var pathToRoot = [];
        /** @type {?} */
        var key = id;
        while (key) {
            if (pathMap[key]) {
                pathToRoot.push(pathMap[key]);
                key = pathMap[key].id;
            }
            else {
                key = null;
            }
        }
        return pathToRoot;
    };
    TreeService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ TreeService.ngInjectableDef = i0.defineInjectable({ factory: function TreeService_Factory() { return new TreeService(); }, token: TreeService, providedIn: "root" });
    return TreeService;
}());
export { TreeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWwtdHJlZXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FwcC90cmVldGFibGUvc2VydmljZXMvdHJlZS90cmVlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFVLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFdEQ7SUFBQTtLQW9HQztJQS9GQzs7Ozs7O09BTUc7Ozs7Ozs7Ozs7SUFDSCw4QkFBUTs7Ozs7Ozs7O0lBQVIsVUFBK0IsSUFBTyxFQUFFLENBQW9CO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQUMsSUFBTztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDUixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsZ0NBQVU7Ozs7Ozs7SUFBVixVQUEyQyxJQUFPLEVBQUUsRUFBVTs7WUFDeEQsWUFBZTs7WUFDYixVQUFVLEdBQXFCLEVBQUU7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFPO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDekIsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNsQixZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekIsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQ25CLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztZQUN6QixRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVE7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQztTQUMzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNaLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNLLCtCQUFTOzs7Ozs7O0lBQWpCLFVBQXdDLElBQU8sRUFBRSxDQUF1QjtRQUF4RSxpQkFLQztRQUpDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSCxrQ0FBWTs7Ozs7Ozs7SUFBWixVQUE2QyxJQUFPLEVBQUUsSUFBTztRQUMzRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCw2QkFBTzs7Ozs7O0lBQVAsVUFBOEIsSUFBTzs7WUFDN0IsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDaEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixNQUFNLENBQUMsTUFBTSxPQUFiLE1BQU0sb0JBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFLLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sR0FBRTthQUNyRTtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssK0JBQVM7Ozs7Ozs7SUFBakIsVUFBa0QsRUFBVSxFQUFFLE9BQXlCOztZQUMvRSxVQUFVLEdBQUcsRUFBRTs7WUFDakIsR0FBRyxHQUFHLEVBQUU7UUFDWixPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ1o7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7O2dCQWxHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7c0JBUEQ7Q0F5R0MsQUFwR0QsSUFvR0M7U0FqR1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGUsIFNlYXJjaGFibGVOb2RlLCBOb2RlSW5UcmVlIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IGNsb25lRGVlcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBPcHRpb24sIHNvbWUsIG5vbmUgfSBmcm9tICdmcC10cy9saWIvT3B0aW9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBUcmF2ZXJzZSBhIHRyZWUgZGF0YSBzdHJ1Y3R1cmUgYW5kIGFwcGxpZXMgdGhlIHByb3ZpZGVkIEBwYXJhbSBmIGZ1bmN0aW9uXG4gICAqIHRvIGFsbCBub2Rlc1xuICAgKiBAcGFyYW0gcm9vdCB0aGUgdHJlZSB0byBiZSB0cmF2ZXJzZWRcbiAgICogQHBhcmFtIGYgdGhlIGZ1bmN0aW9uIHRvIGJlIGFwcGxpZWQgdG8gYWxsIG5vZGVzXG4gICAqIE4uQi4gdGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgZXhpc3RpbmcgdHJlZVxuICAgKi9cbiAgdHJhdmVyc2U8VCwgSyBleHRlbmRzIE5vZGU8VD4+KHJvb3Q6IEssIGY6IChub2RlOiBLKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fdHJhdmVyc2Uocm9vdCwgKG5vZGU6IEspID0+IHtcbiAgICAgIGYobm9kZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggYSB0cmVlIGZvciBhIG5vZGUgd2l0aCB0aGUgcHJvdmlkZWQgQHBhcmFtIGlkXG4gICAqIEBwYXJhbSByb290IHRoZSB0cmVlIHRvIGJlIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIG5vZGUgdG8gYmUgcmV0cmlldmVkXG4gICAqL1xuICBzZWFyY2hCeUlkPFQsIEsgZXh0ZW5kcyBTZWFyY2hhYmxlTm9kZTxUPj4ocm9vdDogSywgaWQ6IHN0cmluZyk6IE9wdGlvbjxOb2RlSW5UcmVlPFQ+PiB7XG4gICAgbGV0IG1hdGNoaW5nTm9kZTogSztcbiAgICBjb25zdCBwYXRoVG9Sb290OiB7W2s6IHN0cmluZ106IEt9ID0ge307XG4gICAgdGhpcy5fdHJhdmVyc2Uocm9vdCwgKG5vZGU6IEspID0+IHtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIHBhdGhUb1Jvb3RbY2hpbGQuaWRdID0gbm9kZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5vZGUuaWQgPT09IGlkKSB7XG4gICAgICAgIG1hdGNoaW5nTm9kZSA9IG5vZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS5pZCAhPT0gaWQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoaW5nTm9kZSA/IHNvbWUoe1xuICAgICAgaWQ6IG1hdGNoaW5nTm9kZS5pZCxcbiAgICAgIHZhbHVlOiBtYXRjaGluZ05vZGUudmFsdWUsXG4gICAgICBjaGlsZHJlbjogbWF0Y2hpbmdOb2RlLmNoaWxkcmVuLFxuICAgICAgcGF0aFRvUm9vdDogdGhpcy5idWlsZFBhdGgoaWQsIHBhdGhUb1Jvb3QpXG4gICAgfSkgOiBub25lO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmFsIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gdHJhdmVyc2Ugb3Igc2VhcmNoIHRoZSB0cmVlXG4gICAqIEBwYXJhbSByb290IHRoZSB0cmVlIHRvIGJlIHNjYW5uZWRcbiAgICogQHBhcmFtIGYgYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gYmUgYXBwbGllZCB0byBhbGwgbm9kZXNcbiAgICovXG4gIHByaXZhdGUgX3RyYXZlcnNlPFQsIEsgZXh0ZW5kcyBOb2RlPFQ+Pihyb290OiBLLCBmOiAobm9kZTogSykgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghZihyb290KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb290LmNoaWxkcmVuLmZvckVhY2goYyA9PiB0aGlzLl90cmF2ZXJzZShjLCBmKSk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBAcGFyYW0gcm9vdCB0cmVlIGFuZCBhIEBwYXJhbSBub2RlIG5vZGUsIGNhbGN1bGF0ZSB0aGVcbiAgICogZGVwdGggb2YgdGhlIG5vZGUgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIHJvb3QgdGhlIHRyZWVcbiAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgd2Ugd2FudCB0byBjYWxjdWxhdGUgdGhlIGRlcHRoIG9mXG4gICAqL1xuICBnZXROb2RlRGVwdGg8VCwgSyBleHRlbmRzIFNlYXJjaGFibGVOb2RlPFQ+Pihyb290OiBLLCBub2RlOiBLKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hCeUlkKHJvb3QsIG5vZGUuaWQpLmZvbGQoLTEsIG4gPT4gbi5wYXRoVG9Sb290Lmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogRmxhdHRlbiBhIEBwYXJhbSByb290IHRyZWUgaW50byBhIGxpc3Qgb2YgaXRzIG5vZGVzXG4gICAqIEBwYXJhbSByb290IHRoZSB0cmVlIHRvIGJlIGZsYXR0ZW5lZFxuICAgKi9cbiAgZmxhdHRlbjxULCBLIGV4dGVuZHMgTm9kZTxUPj4ocm9vdDogSyk6IEtbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW2Nsb25lRGVlcChyb290KV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5pbmRleE9mKG5vZGUpICsgMSwgMCwgLi4ubm9kZS5jaGlsZHJlbiBhcyBLW10pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmFsIGZ1bmN0aW9uIHVzZWQgdG8gYnVpbGQgdGhlIHBhdGhUb1Jvb3Qgb2YgYSBub2RlIGluIGEgdHJlZVxuICAgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSBwYXRoTWFwIHRoZSBwYXRoTWFwIHJldHVybmVkIGJ5IHNlYXJjaEJ5SWRcbiAgICovXG4gIHByaXZhdGUgYnVpbGRQYXRoPFQsIEsgZXh0ZW5kcyBTZWFyY2hhYmxlTm9kZTxUPj4oaWQ6IHN0cmluZywgcGF0aE1hcDoge1trOiBzdHJpbmddOiBLfSk6IEtbXSB7XG4gICAgY29uc3QgcGF0aFRvUm9vdCA9IFtdO1xuICAgIGxldCBrZXkgPSBpZDtcbiAgICB3aGlsZSAoa2V5KSB7XG4gICAgICBpZiAocGF0aE1hcFtrZXldKSB7XG4gICAgICAgIHBhdGhUb1Jvb3QucHVzaChwYXRoTWFwW2tleV0pO1xuICAgICAgICBrZXkgPSBwYXRoTWFwW2tleV0uaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aFRvUm9vdDtcbiAgfVxuXG59XG4iXX0=