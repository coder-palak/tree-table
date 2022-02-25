/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { some, none } from 'fp-ts/lib/Option';
import * as i0 from "@angular/core";
export class TreeService {
    /**
     * Traverse a tree data structure and applies the provided \@param f function
     * to all nodes
     * @template T, K
     * @param {?} root the tree to be traversed
     * @param {?} f the function to be applied to all nodes
     * N.B. this function modifies the existing tree
     * @return {?}
     */
    traverse(root, f) {
        this._traverse(root, (node) => {
            f(node);
            return true;
        });
    }
    /**
     * Search a tree for a node with the provided \@param id
     * @template T, K
     * @param {?} root the tree to be searched
     * @param {?} id the id of the node to be retrieved
     * @return {?}
     */
    searchById(root, id) {
        /** @type {?} */
        let matchingNode;
        /** @type {?} */
        const pathToRoot = {};
        this._traverse(root, (node) => {
            node.children.forEach(child => {
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
    }
    /**
     * Internal function that can be used to traverse or search the tree
     * @template T, K
     * @param {?} root the tree to be scanned
     * @param {?} f an optional function to be applied to all nodes
     * @return {?}
     */
    _traverse(root, f) {
        if (!f(root)) {
            return;
        }
        root.children.forEach(c => this._traverse(c, f));
    }
    /**
     * Given a \@param root tree and a \@param node node, calculate the
     * depth of the node in the tree
     * @template T, K
     * @param {?} root the tree
     * @param {?} node the node we want to calculate the depth of
     * @return {?}
     */
    getNodeDepth(root, node) {
        return this.searchById(root, node.id).fold(-1, n => n.pathToRoot.length);
    }
    /**
     * Flatten a \@param root tree into a list of its nodes
     * @template T, K
     * @param {?} root the tree to be flattened
     * @return {?}
     */
    flatten(root) {
        /** @type {?} */
        const result = [cloneDeep(root)];
        for (let i = 0; i < result.length; i++) {
            /** @type {?} */
            const node = result[i];
            if (node.children) {
                result.splice(result.indexOf(node) + 1, 0, ...(/** @type {?} */ (node.children)));
            }
        }
        return result;
    }
    /**
     * Internal function used to build the pathToRoot of a node in a tree
     * @template T, K
     * @param {?} id the id of the node
     * @param {?} pathMap the pathMap returned by searchById
     * @return {?}
     */
    buildPath(id, pathMap) {
        /** @type {?} */
        const pathToRoot = [];
        /** @type {?} */
        let key = id;
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
    }
}
TreeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ TreeService.ngInjectableDef = i0.defineInjectable({ factory: function TreeService_Factory() { return new TreeService(); }, token: TreeService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWwtdHJlZXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FwcC90cmVldGFibGUvc2VydmljZXMvdHJlZS90cmVlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQVUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQUt0RCxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7OztJQVN0QixRQUFRLENBQXVCLElBQU8sRUFBRSxDQUFvQjtRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQU8sRUFBRSxFQUFFO1lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNSLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQU9ELFVBQVUsQ0FBaUMsSUFBTyxFQUFFLEVBQVU7O1lBQ3hELFlBQWU7O2NBQ2IsVUFBVSxHQUFxQixFQUFFO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBTyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDbEIsWUFBWSxHQUFHLElBQUksQ0FBQzthQUNyQjtZQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3pCLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUNuQixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7WUFDekIsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUM7U0FDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDWixDQUFDOzs7Ozs7OztJQU9PLFNBQVMsQ0FBdUIsSUFBTyxFQUFFLENBQXVCO1FBQ3RFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7Ozs7O0lBUUQsWUFBWSxDQUFpQyxJQUFPLEVBQUUsSUFBTztRQUMzRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7Ozs7SUFNRCxPQUFPLENBQXVCLElBQU87O2NBQzdCLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ2hDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPLENBQUMsQ0FBQzthQUNyRTtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7Ozs7SUFPTyxTQUFTLENBQWlDLEVBQVUsRUFBRSxPQUF5Qjs7Y0FDL0UsVUFBVSxHQUFHLEVBQUU7O1lBQ2pCLEdBQUcsR0FBRyxFQUFFO1FBQ1osT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLElBQUksQ0FBQzthQUNaO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7WUFsR0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9kZSwgU2VhcmNoYWJsZU5vZGUsIE5vZGVJblRyZWUgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCB7IE9wdGlvbiwgc29tZSwgbm9uZSB9IGZyb20gJ2ZwLXRzL2xpYi9PcHRpb24nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlIGEgdHJlZSBkYXRhIHN0cnVjdHVyZSBhbmQgYXBwbGllcyB0aGUgcHJvdmlkZWQgQHBhcmFtIGYgZnVuY3Rpb25cbiAgICogdG8gYWxsIG5vZGVzXG4gICAqIEBwYXJhbSByb290IHRoZSB0cmVlIHRvIGJlIHRyYXZlcnNlZFxuICAgKiBAcGFyYW0gZiB0aGUgZnVuY3Rpb24gdG8gYmUgYXBwbGllZCB0byBhbGwgbm9kZXNcbiAgICogTi5CLiB0aGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBleGlzdGluZyB0cmVlXG4gICAqL1xuICB0cmF2ZXJzZTxULCBLIGV4dGVuZHMgTm9kZTxUPj4ocm9vdDogSywgZjogKG5vZGU6IEspID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl90cmF2ZXJzZShyb290LCAobm9kZTogSykgPT4ge1xuICAgICAgZihub2RlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBhIHRyZWUgZm9yIGEgbm9kZSB3aXRoIHRoZSBwcm92aWRlZCBAcGFyYW0gaWRcbiAgICogQHBhcmFtIHJvb3QgdGhlIHRyZWUgdG8gYmUgc2VhcmNoZWRcbiAgICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgbm9kZSB0byBiZSByZXRyaWV2ZWRcbiAgICovXG4gIHNlYXJjaEJ5SWQ8VCwgSyBleHRlbmRzIFNlYXJjaGFibGVOb2RlPFQ+Pihyb290OiBLLCBpZDogc3RyaW5nKTogT3B0aW9uPE5vZGVJblRyZWU8VD4+IHtcbiAgICBsZXQgbWF0Y2hpbmdOb2RlOiBLO1xuICAgIGNvbnN0IHBhdGhUb1Jvb3Q6IHtbazogc3RyaW5nXTogS30gPSB7fTtcbiAgICB0aGlzLl90cmF2ZXJzZShyb290LCAobm9kZTogSykgPT4ge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgcGF0aFRvUm9vdFtjaGlsZC5pZF0gPSBub2RlO1xuICAgICAgfSk7XG4gICAgICBpZiAobm9kZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgbWF0Y2hpbmdOb2RlID0gbm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLmlkICE9PSBpZDtcbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hpbmdOb2RlID8gc29tZSh7XG4gICAgICBpZDogbWF0Y2hpbmdOb2RlLmlkLFxuICAgICAgdmFsdWU6IG1hdGNoaW5nTm9kZS52YWx1ZSxcbiAgICAgIGNoaWxkcmVuOiBtYXRjaGluZ05vZGUuY2hpbGRyZW4sXG4gICAgICBwYXRoVG9Sb290OiB0aGlzLmJ1aWxkUGF0aChpZCwgcGF0aFRvUm9vdClcbiAgICB9KSA6IG5vbmU7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byB0cmF2ZXJzZSBvciBzZWFyY2ggdGhlIHRyZWVcbiAgICogQHBhcmFtIHJvb3QgdGhlIHRyZWUgdG8gYmUgc2Nhbm5lZFxuICAgKiBAcGFyYW0gZiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBiZSBhcHBsaWVkIHRvIGFsbCBub2Rlc1xuICAgKi9cbiAgcHJpdmF0ZSBfdHJhdmVyc2U8VCwgSyBleHRlbmRzIE5vZGU8VD4+KHJvb3Q6IEssIGY6IChub2RlOiBLKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFmKHJvb3QpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvb3QuY2hpbGRyZW4uZm9yRWFjaChjID0+IHRoaXMuX3RyYXZlcnNlKGMsIGYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIEBwYXJhbSByb290IHRyZWUgYW5kIGEgQHBhcmFtIG5vZGUgbm9kZSwgY2FsY3VsYXRlIHRoZVxuICAgKiBkZXB0aCBvZiB0aGUgbm9kZSBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gcm9vdCB0aGUgdHJlZVxuICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgZGVwdGggb2ZcbiAgICovXG4gIGdldE5vZGVEZXB0aDxULCBLIGV4dGVuZHMgU2VhcmNoYWJsZU5vZGU8VD4+KHJvb3Q6IEssIG5vZGU6IEspOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaEJ5SWQocm9vdCwgbm9kZS5pZCkuZm9sZCgtMSwgbiA9PiBuLnBhdGhUb1Jvb3QubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGF0dGVuIGEgQHBhcmFtIHJvb3QgdHJlZSBpbnRvIGEgbGlzdCBvZiBpdHMgbm9kZXNcbiAgICogQHBhcmFtIHJvb3QgdGhlIHRyZWUgdG8gYmUgZmxhdHRlbmVkXG4gICAqL1xuICBmbGF0dGVuPFQsIEsgZXh0ZW5kcyBOb2RlPFQ+Pihyb290OiBLKTogS1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSBbY2xvbmVEZWVwKHJvb3QpXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IHJlc3VsdFtpXTtcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0LmluZGV4T2Yobm9kZSkgKyAxLCAwLCAuLi5ub2RlLmNoaWxkcmVuIGFzIEtbXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuYWwgZnVuY3Rpb24gdXNlZCB0byBidWlsZCB0aGUgcGF0aFRvUm9vdCBvZiBhIG5vZGUgaW4gYSB0cmVlXG4gICAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHBhdGhNYXAgdGhlIHBhdGhNYXAgcmV0dXJuZWQgYnkgc2VhcmNoQnlJZFxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFBhdGg8VCwgSyBleHRlbmRzIFNlYXJjaGFibGVOb2RlPFQ+PihpZDogc3RyaW5nLCBwYXRoTWFwOiB7W2s6IHN0cmluZ106IEt9KTogS1tdIHtcbiAgICBjb25zdCBwYXRoVG9Sb290ID0gW107XG4gICAgbGV0IGtleSA9IGlkO1xuICAgIHdoaWxlIChrZXkpIHtcbiAgICAgIGlmIChwYXRoTWFwW2tleV0pIHtcbiAgICAgICAgcGF0aFRvUm9vdC5wdXNoKHBhdGhNYXBba2V5XSk7XG4gICAgICAgIGtleSA9IHBhdGhNYXBba2V5XS5pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoVG9Sb290O1xuICB9XG5cbn1cbiJdfQ==