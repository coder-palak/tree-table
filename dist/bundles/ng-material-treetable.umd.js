(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/material/table'), require('@angular/material/icon'), require('fp-ts/lib/Option'), require('@angular/material'), require('@angular/core'), require('lodash-es'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-material-treetable', ['exports', '@angular/common', '@angular/material/table', '@angular/material/icon', 'fp-ts/lib/Option', '@angular/material', '@angular/core', 'lodash-es', 'rxjs'], factory) :
    (factory((global['ng-material-treetable'] = {}),global.ng.common,global.ng.material.table,global.ng.material.icon,global.Option,global.ng.material,global.ng.core,global.lodashEs,global.rxjs));
}(this, (function (exports,common,table,icon,Option,material,i0,lodashEs,rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
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
                return matchingNode ? Option.some({
                    id: matchingNode.id,
                    value: matchingNode.value,
                    children: matchingNode.children,
                    pathToRoot: this.buildPath(id, pathToRoot)
                }) : Option.none;
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
                var result = [lodashEs.cloneDeep(root)];
                for (var i = 0; i < result.length; i++) {
                    /** @type {?} */
                    var node = result[i];
                    if (node.children) {
                        result.splice.apply(result, __spread([result.indexOf(node) + 1, 0], ( /** @type {?} */(node.children))));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ TreeService.ngInjectableDef = i0.defineInjectable({ factory: function TreeService_Factory() { return new TreeService(); }, token: TreeService, providedIn: "root" });
        return TreeService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
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
                var xorN = lodashEs.xor(Object.keys(node.value), customColumnOrder);
                return {
                    valid: lodashEs.isEmpty(xorN),
                    xor: xorN
                };
            };
        ValidatorService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ ValidatorService.ngInjectableDef = i0.defineInjectable({ factory: function ValidatorService_Factory() { return new ValidatorService(); }, token: ValidatorService, providedIn: "root" });
        return ValidatorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
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
                var treeClone = ( /** @type {?} */(lodashEs.cloneDeep(tree)));
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
                var treeClone = ( /** @type {?} */(lodashEs.cloneDeep(tree)));
                this.treeService.traverse(treeClone, function (node) {
                    node.depth = _this.treeService.getNodeDepth(treeClone, node);
                    node.isExpanded = true;
                    node.isVisible = true;
                });
                return treeClone;
            };
        ConverterService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ConverterService.ctorParameters = function () {
            return [
                { type: TreeService }
            ];
        };
        /** @nocollapse */ ConverterService.ngInjectableDef = i0.defineInjectable({ factory: function ConverterService_Factory() { return new ConverterService(i0.inject(TreeService)); }, token: ConverterService, providedIn: "root" });
        return ConverterService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultOptions = {
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
            get: /**
             * @return {?}
             */ function () {
                throw new Error("Input '" + property + "' is required. Have you forgotten to add [" + property + "] = ... in your template?");
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                Object.defineProperty(target, property, {
                    value: value,
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
    var TreetableComponent = /** @class */ (function () {
        function TreetableComponent(treeService, validatorService, converterService, elem) {
            this.treeService = treeService;
            this.validatorService = validatorService;
            this.converterService = converterService;
            this.options = {};
            this.nodeClicked = new rxjs.Subject();
            /** @type {?} */
            var tagName = elem.nativeElement.tagName.toLowerCase();
            if (tagName === 'ng-treetable') {
                console.warn("DEPRECATION WARNING: \n The 'ng-treetable' selector is being deprecated. Please use the new 'treetable' selector");
            }
        }
        /**
         * @return {?}
         */
        TreetableComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
                this.options = this.parseOptions(defaultOptions);
                /** @type {?} */
                var customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0], this.options.customColumnOrder);
                if (this.options.customColumnOrder && !customOrderValidator.valid) {
                    throw new Error("\n        Properties " + customOrderValidator.xor.map(function (x) { return "'" + x + "'"; }).join(', ') + " incorrect or missing in customColumnOrder");
                }
                this.displayedColumns = this.options.customColumnOrder
                    ? this.options.customColumnOrder
                    : this.extractNodeProps(this.tree[0]);
                this.searchableTree = this.tree.map(function (t) { return _this.converterService.toSearchableTree(t); });
                /** @type {?} */
                var treeTableTree = this.searchableTree.map(function (st) { return _this.converterService.toTreeTableTree(st); });
                this.treeTable = lodashEs.flatMap(treeTableTree, this.treeService.flatten);
                this.dataSource = this.generateDataSource();
            };
        /**
         * @param {?} tree
         * @return {?}
         */
        TreetableComponent.prototype.extractNodeProps = /**
         * @param {?} tree
         * @return {?}
         */
            function (tree) {
                return Object.keys(tree.value).filter(function (x) { return typeof tree.value[x] !== 'object'; });
            };
        /**
         * @return {?}
         */
        TreetableComponent.prototype.generateDataSource = /**
         * @return {?}
         */
            function () {
                return new material.MatTableDataSource(this.treeTable.filter(function (x) { return x.isVisible; }));
            };
        /**
         * @param {?} node
         * @param {?=} step
         * @return {?}
         */
        TreetableComponent.prototype.formatIndentation = /**
         * @param {?} node
         * @param {?=} step
         * @return {?}
         */
            function (node, step) {
                if (step === void 0) {
                    step = 5;
                }
                return '&nbsp;'.repeat(node.depth * step);
            };
        /**
         * @return {?}
         */
        TreetableComponent.prototype.formatElevation = /**
         * @return {?}
         */
            function () {
                return "mat-elevation-z" + this.options.elevation;
            };
        /**
         * @param {?} clickedNode
         * @return {?}
         */
        TreetableComponent.prototype.onNodeClick = /**
         * @param {?} clickedNode
         * @return {?}
         */
            function (clickedNode) {
                var _this = this;
                clickedNode.isExpanded = !clickedNode.isExpanded;
                this.treeTable.forEach(function (el) {
                    el.isVisible = _this.searchableTree.every(function (st) {
                        return _this.treeService.searchById(st, el.id).
                            fold([], function (n) { return n.pathToRoot; })
                            .every(function (p) { return _this.treeTable.find(function (x) { return x.id === p.id; }).isExpanded; });
                    });
                });
                this.dataSource = this.generateDataSource();
                this.nodeClicked.next(clickedNode);
            };
        // Overrides default options with those specified by the user
        // Overrides default options with those specified by the user
        /**
         * @param {?} defaultOpts
         * @return {?}
         */
        TreetableComponent.prototype.parseOptions =
            // Overrides default options with those specified by the user
            /**
             * @param {?} defaultOpts
             * @return {?}
             */
            function (defaultOpts) {
                return lodashEs.defaults(this.options, defaultOpts);
            };
        TreetableComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-treetable, treetable',
                        // 'ng-treetable' is currently being deprecated
                        template: "<table mat-table [dataSource]=\"dataSource\" [ngClass]=\"formatElevation()\">\n\n  <div *ngFor=\"let column of displayedColumns; first as isFirst;\">\n    <ng-container matColumnDef=\"{{column}}\">\n      <th mat-header-cell *matHeaderCellDef [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        {{options.capitalisedHeader ? (column | titlecase) : column}}\n      </th>\n      <td mat-cell *matCellDef=\"let element\" [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        <div *ngIf=\"isFirst\">\n          <div class=\"value-cell\">\n            <div [innerHTML]=\"formatIndentation(element)\"></div>\n            <mat-icon [ngStyle]=\"{'visibility': element.children.length ? 'visible' : 'hidden'}\" (click)=\"onNodeClick(element)\">\n              {{element.isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}}\n            </mat-icon>\n            <div>{{element.value[column]}}</div>\n          </div>\n        </div>\n        <div *ngIf=\"!isFirst\">\n          {{element.value[column]}}\n        </div>\n      </td>\n    </ng-container>\n  </div>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row [ngClass]=\"{'highlight-on-hover': options.highlightRowOnHover}\" *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n</table>\n",
                        styles: ["table{width:100%}.value-cell{display:flex;align-items:center}mat-icon{cursor:pointer}.highlight-on-hover:hover{background-color:#f0f0f5}td[class*=' mat-column']{width:10vw;min-width:10vw;max-width:10vw}.mat-cell,.mat-header-cell{padding:10px}.vertical-separator{border-left:1px solid #f0f0f5}td div{word-break:break-all}"]
                    }] }
        ];
        /** @nocollapse */
        TreetableComponent.ctorParameters = function () {
            return [
                { type: TreeService },
                { type: ValidatorService },
                { type: ConverterService },
                { type: i0.ElementRef }
            ];
        };
        TreetableComponent.propDecorators = {
            tree: [{ type: i0.Input }],
            options: [{ type: i0.Input }],
            nodeClicked: [{ type: i0.Output }]
        };
        __decorate([
            Required,
            __metadata("design:type", Object)
        ], TreetableComponent.prototype, "tree", void 0);
        return TreetableComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var TreetableModule = /** @class */ (function () {
        function TreetableModule() {
        }
        TreetableModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            TreetableComponent
                        ],
                        imports: [
                            common.CommonModule,
                            table.MatTableModule,
                            icon.MatIconModule
                        ],
                        exports: [
                            TreetableComponent
                        ]
                    },] }
        ];
        return TreetableModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.TreetableModule = TreetableModule;
    exports.ɵa = TreetableComponent;
    exports.ɵb = Required;
    exports.ɵe = ConverterService;
    exports.ɵc = TreeService;
    exports.ɵd = ValidatorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-material-treetable.umd.js.map