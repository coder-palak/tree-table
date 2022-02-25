import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { __decorate, __metadata } from 'tslib';
import { some, none } from 'fp-ts/lib/Option';
import { MatTableDataSource } from '@angular/material';
import { Injectable, Component, ElementRef, Input, Output, defineInjectable, inject, NgModule } from '@angular/core';
import { cloneDeep, isEmpty, xor, flatMap, defaults } from 'lodash-es';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TreeService {
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
/** @nocollapse */ TreeService.ngInjectableDef = defineInjectable({ factory: function TreeService_Factory() { return new TreeService(); }, token: TreeService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ValidatorService {
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
/** @nocollapse */ ValidatorService.ngInjectableDef = defineInjectable({ factory: function ValidatorService_Factory() { return new ValidatorService(); }, token: ValidatorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const uuidv4 = require('uuid/v4');
class ConverterService {
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
/** @nocollapse */ ConverterService.ngInjectableDef = defineInjectable({ factory: function ConverterService_Factory() { return new ConverterService(inject(TreeService)); }, token: ConverterService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultOptions = {
    verticalSeparator: true,
    highlightRowOnHover: true,
    elevation: 5
};

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
function Required(target, property) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class TreetableComponent {
    /**
     * @param {?} treeService
     * @param {?} validatorService
     * @param {?} converterService
     * @param {?} elem
     */
    constructor(treeService, validatorService, converterService, elem) {
        this.treeService = treeService;
        this.validatorService = validatorService;
        this.converterService = converterService;
        this.options = {};
        this.nodeClicked = new Subject();
        /** @type {?} */
        const tagName = elem.nativeElement.tagName.toLowerCase();
        if (tagName === 'ng-treetable') {
            console.warn(`DEPRECATION WARNING: \n The 'ng-treetable' selector is being deprecated. Please use the new 'treetable' selector`);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
        this.options = this.parseOptions(defaultOptions);
        /** @type {?} */
        const customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0], this.options.customColumnOrder);
        if (this.options.customColumnOrder && !customOrderValidator.valid) {
            throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`);
        }
        this.displayedColumns = this.options.customColumnOrder
            ? this.options.customColumnOrder
            : this.extractNodeProps(this.tree[0]);
        this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
        /** @type {?} */
        const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
        this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
        this.dataSource = this.generateDataSource();
    }
    /**
     * @param {?} tree
     * @return {?}
     */
    extractNodeProps(tree) {
        return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
    }
    /**
     * @return {?}
     */
    generateDataSource() {
        return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
    }
    /**
     * @param {?} node
     * @param {?=} step
     * @return {?}
     */
    formatIndentation(node, step = 5) {
        return '&nbsp;'.repeat(node.depth * step);
    }
    /**
     * @return {?}
     */
    formatElevation() {
        return `mat-elevation-z${this.options.elevation}`;
    }
    /**
     * @param {?} clickedNode
     * @return {?}
     */
    onNodeClick(clickedNode) {
        clickedNode.isExpanded = !clickedNode.isExpanded;
        this.treeTable.forEach(el => {
            el.isVisible = this.searchableTree.every(st => {
                return this.treeService.searchById(st, el.id).
                    fold([], n => n.pathToRoot)
                    .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
            });
        });
        this.dataSource = this.generateDataSource();
        this.nodeClicked.next(clickedNode);
    }
    // Overrides default options with those specified by the user
    /**
     * @param {?} defaultOpts
     * @return {?}
     */
    parseOptions(defaultOpts) {
        return defaults(this.options, defaultOpts);
    }
}
TreetableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-treetable, treetable',
                // 'ng-treetable' is currently being deprecated
                template: "<table mat-table [dataSource]=\"dataSource\" [ngClass]=\"formatElevation()\">\n\n  <div *ngFor=\"let column of displayedColumns; first as isFirst;\">\n    <ng-container matColumnDef=\"{{column}}\">\n      <th mat-header-cell *matHeaderCellDef [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        {{options.capitalisedHeader ? (column | titlecase) : column}}\n      </th>\n      <td mat-cell *matCellDef=\"let element\" [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        <div *ngIf=\"isFirst\">\n          <div class=\"value-cell\">\n            <div [innerHTML]=\"formatIndentation(element)\"></div>\n            <mat-icon [ngStyle]=\"{'visibility': element.children.length ? 'visible' : 'hidden'}\" (click)=\"onNodeClick(element)\">\n              {{element.isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}}\n            </mat-icon>\n            <div>{{element.value[column]}}</div>\n          </div>\n        </div>\n        <div *ngIf=\"!isFirst\">\n          {{element.value[column]}}\n        </div>\n      </td>\n    </ng-container>\n  </div>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row [ngClass]=\"{'highlight-on-hover': options.highlightRowOnHover}\" *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n</table>\n",
                styles: ["table{width:100%}.value-cell{display:flex;align-items:center}mat-icon{cursor:pointer}.highlight-on-hover:hover{background-color:#f0f0f5}td[class*=' mat-column']{width:10vw;min-width:10vw;max-width:10vw}.mat-cell,.mat-header-cell{padding:10px}.vertical-separator{border-left:1px solid #f0f0f5}td div{word-break:break-all}"]
            }] }
];
/** @nocollapse */
TreetableComponent.ctorParameters = () => [
    { type: TreeService },
    { type: ValidatorService },
    { type: ConverterService },
    { type: ElementRef }
];
TreetableComponent.propDecorators = {
    tree: [{ type: Input }],
    options: [{ type: Input }],
    nodeClicked: [{ type: Output }]
};
__decorate([
    Required,
    __metadata("design:type", Object)
], TreetableComponent.prototype, "tree", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class TreetableModule {
}
TreetableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TreetableComponent
                ],
                imports: [
                    CommonModule,
                    MatTableModule,
                    MatIconModule
                ],
                exports: [
                    TreetableComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { TreetableModule, TreetableComponent as ɵa, Required as ɵb, ConverterService as ɵe, TreeService as ɵc, ValidatorService as ɵd };

//# sourceMappingURL=ng-material-treetable.js.map