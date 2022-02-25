/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef } from '@angular/core';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material';
import { ValidatorService } from '../services/validator/validator.service';
import { ConverterService } from '../services/converter/converter.service';
import { defaultOptions } from '../default.options';
import { flatMap, defaults } from 'lodash-es';
import { Required } from '../decorators/required.decorator';
import { Subject } from 'rxjs';
/**
 * @template T
 */
var TreetableComponent = /** @class */ (function () {
    function TreetableComponent(treeService, validatorService, converterService, elem) {
        this.treeService = treeService;
        this.validatorService = validatorService;
        this.converterService = converterService;
        this.options = {};
        this.nodeClicked = new Subject();
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
        this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
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
        return new MatTableDataSource(this.treeTable.filter(function (x) { return x.isVisible; }));
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
        if (step === void 0) { step = 5; }
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
        return defaults(this.options, defaultOpts);
    };
    TreetableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-treetable, treetable',
                    // 'ng-treetable' is currently being deprecated
                    template: "<table mat-table [dataSource]=\"dataSource\" [ngClass]=\"formatElevation()\">\n\n  <div *ngFor=\"let column of displayedColumns; first as isFirst;\">\n    <ng-container matColumnDef=\"{{column}}\">\n      <th mat-header-cell *matHeaderCellDef [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        {{options.capitalisedHeader ? (column | titlecase) : column}}\n      </th>\n      <td mat-cell *matCellDef=\"let element\" [ngClass]=\"{'vertical-separator': options.verticalSeparator}\">\n        <div *ngIf=\"isFirst\">\n          <div class=\"value-cell\">\n            <div [innerHTML]=\"formatIndentation(element)\"></div>\n            <mat-icon [ngStyle]=\"{'visibility': element.children.length ? 'visible' : 'hidden'}\" (click)=\"onNodeClick(element)\">\n              {{element.isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}}\n            </mat-icon>\n            <div>{{element.value[column]}}</div>\n          </div>\n        </div>\n        <div *ngIf=\"!isFirst\">\n          {{element.value[column]}}\n        </div>\n      </td>\n    </ng-container>\n  </div>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row [ngClass]=\"{'highlight-on-hover': options.highlightRowOnHover}\" *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n</table>\n",
                    styles: ["table{width:100%}.value-cell{display:flex;align-items:center}mat-icon{cursor:pointer}.highlight-on-hover:hover{background-color:#f0f0f5}td[class*=' mat-column']{width:10vw;min-width:10vw;max-width:10vw}.mat-cell,.mat-header-cell{padding:10px}.vertical-separator{border-left:1px solid #f0f0f5}td div{word-break:break-all}"]
                }] }
    ];
    /** @nocollapse */
    TreetableComponent.ctorParameters = function () { return [
        { type: TreeService },
        { type: ValidatorService },
        { type: ConverterService },
        { type: ElementRef }
    ]; };
    TreetableComponent.propDecorators = {
        tree: [{ type: Input }],
        options: [{ type: Input }],
        nodeClicked: [{ type: Output }]
    };
    tslib_1.__decorate([
        Required,
        tslib_1.__metadata("design:type", Object)
    ], TreetableComponent.prototype, "tree", void 0);
    return TreetableComponent;
}());
export { TreetableComponent };
if (false) {
    /** @type {?} */
    TreetableComponent.prototype.tree;
    /** @type {?} */
    TreetableComponent.prototype.options;
    /** @type {?} */
    TreetableComponent.prototype.nodeClicked;
    /** @type {?} */
    TreetableComponent.prototype.searchableTree;
    /** @type {?} */
    TreetableComponent.prototype.treeTable;
    /** @type {?} */
    TreetableComponent.prototype.displayedColumns;
    /** @type {?} */
    TreetableComponent.prototype.dataSource;
    /** @type {?} */
    TreetableComponent.prototype.treeService;
    /** @type {?} */
    TreetableComponent.prototype.validatorService;
    /** @type {?} */
    TreetableComponent.prototype.converterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLXRyZWV0YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdHJlZXRhYmxlL2NvbXBvbmVudC90cmVldGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRS9CO0lBY0UsNEJBQ1UsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUMxQyxJQUFnQjtRQUhSLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVZuQyxZQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQThCLElBQUksT0FBTyxFQUFFLENBQUM7O1lBWXpELE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDeEQsSUFBSSxPQUFPLEtB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QUFXO2dCQUVYLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUxrQixVQUFVOzs7dUJBaUJsRCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsTUFBTTs7SUFGWTtRQUFULFFBQVE7O29EQUEyQjtJQXdFL0MseUJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQXpFWSxrQkFBa0I7OztJQUM3QixrQ0FBNkM7O0lBQzdDLHFDQUFrQzs7SUFDbEMseUNBQWlFOztJQUNqRSw0Q0FBNEM7O0lBQzVDLHVDQUFzQzs7SUFDdEMsOENBQTJCOztJQUMzQix3Q0FBaUQ7O0lBRy9DLHlDQUFnQzs7SUFDaEMsOENBQTBDOztJQUMxQyw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9kZSwgVHJlZVRhYmxlTm9kZSwgT3B0aW9ucywgU2VhcmNoYWJsZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgVHJlZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmVlL3RyZWUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBWYWxpZGF0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdmFsaWRhdG9yL3ZhbGlkYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb252ZXJ0ZXIvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuLi9kZWZhdWx0Lm9wdGlvbnMnO1xuaW1wb3J0IHsgZmxhdE1hcCwgZGVmYXVsdHMgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgUmVxdWlyZWQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL3JlcXVpcmVkLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXRyZWV0YWJsZSwgdHJlZXRhYmxlJywgLy8gJ25nLXRyZWV0YWJsZScgaXMgY3VycmVudGx5IGJlaW5nIGRlcHJlY2F0ZWRcbiAgdGVtcGxhdGVVcmw6ICcuL3RyZWV0YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWV0YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyZWV0YWJsZUNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIEBSZXF1aXJlZCB0cmVlOiBOb2RlPFQ+IHwgTm9kZTxUPltdO1xuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zPFQ+ID0ge307XG4gIEBPdXRwdXQoKSBub2RlQ2xpY2tlZDogU3ViamVjdDxUcmVlVGFibGVOb2RlPFQ+PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgc2VhcmNoYWJsZVRyZWU6IFNlYXJjaGFibGVOb2RlPFQ+W107XG4gIHByaXZhdGUgdHJlZVRhYmxlOiBUcmVlVGFibGVOb2RlPFQ+W107XG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8VHJlZVRhYmxlTm9kZTxUPj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmVlU2VydmljZTogVHJlZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JTZXJ2aWNlOiBWYWxpZGF0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZSxcbiAgICBlbGVtOiBFbGVtZW50UmVmXG4gICkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0YWdOYW1lID09PSAnbmctdHJlZXRhYmxlJykge1xuICAgICAgY29uc29sZS53YXJuKGBERVBSRUNBVElPTiBXQVJOSU5HOiBcXG4gVGhlICduZy10cmVldGFibGUnIHNlbGVjdG9yIGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdGhlIG5ldyAndHJlZXRhYmxlJyBzZWxlY3RvcmApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudHJlZSA9IEFycmF5LmlzQXJyYXkodGhpcy50cmVlKSA/IHRoaXMudHJlZSA6IFt0aGlzLnRyZWVdO1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMucGFyc2VPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcbiAgICBjb25zdCBjdXN0b21PcmRlclZhbGlkYXRvciA9IHRoaXMudmFsaWRhdG9yU2VydmljZS52YWxpZGF0ZUN1c3RvbU9yZGVyKHRoaXMudHJlZVswXSwgdGhpcy5vcHRpb25zLmN1c3RvbUNvbHVtbk9yZGVyKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmN1c3RvbUNvbHVtbk9yZGVyICYmICFjdXN0b21PcmRlclZhbGlkYXRvci52YWxpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgUHJvcGVydGllcyAke2N1c3RvbU9yZGVyVmFsaWRhdG9yLnhvci5tYXAoeCA9PiBgJyR7eH0nYCkuam9pbignLCAnKX0gaW5jb3JyZWN0IG9yIG1pc3NpbmcgaW4gY3VzdG9tQ29sdW1uT3JkZXJgXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLm9wdGlvbnMuY3VzdG9tQ29sdW1uT3JkZXJcbiAgICAgID8gdGhpcy5vcHRpb25zLmN1c3RvbUNvbHVtbk9yZGVyXG4gICAgICA6IHRoaXMuZXh0cmFjdE5vZGVQcm9wcyh0aGlzLnRyZWVbMF0pO1xuICAgIHRoaXMuc2VhcmNoYWJsZVRyZWUgPSB0aGlzLnRyZWUubWFwKHQgPT4gdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnRvU2VhcmNoYWJsZVRyZWUodCkpO1xuICAgIGNvbnN0IHRyZWVUYWJsZVRyZWUgPSB0aGlzLnNlYXJjaGFibGVUcmVlLm1hcChzdCA9PiB0aGlzLmNvbnZlcnRlclNlcnZpY2UudG9UcmVlVGFibGVUcmVlKHN0KSk7XG4gICAgdGhpcy50cmVlVGFibGUgPSBmbGF0TWFwKHRyZWVUYWJsZVRyZWUsIHRoaXMudHJlZVNlcnZpY2UuZmxhdHRlbik7XG4gICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5nZW5lcmF0ZURhdGFTb3VyY2UoKTtcbiAgfVxuXG4gIGV4dHJhY3ROb2RlUHJvcHModHJlZTogTm9kZTxUPiAmIHsgdmFsdWU6IHsgW2s6IHN0cmluZ106IGFueSB9IH0pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRyZWUudmFsdWUpLmZpbHRlcih4ID0+IHR5cGVvZiB0cmVlLnZhbHVlW3hdICE9PSAnb2JqZWN0Jyk7XG4gIH1cblxuICBnZW5lcmF0ZURhdGFTb3VyY2UoKTogTWF0VGFibGVEYXRhU291cmNlPFRyZWVUYWJsZU5vZGU8VD4+IHtcbiAgICByZXR1cm4gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSh0aGlzLnRyZWVUYWJsZS5maWx0ZXIoeCA9PiB4LmlzVmlzaWJsZSkpO1xuICB9XG5cbiAgZm9ybWF0SW5kZW50YXRpb24obm9kZTogVHJlZVRhYmxlTm9kZTxUPiwgc3RlcDogbnVtYmVyID0gNSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcmbmJzcDsnLnJlcGVhdChub2RlLmRlcHRoICogc3RlcCk7XG4gIH1cblxuXHRmb3JtYXRFbGV2YXRpb24oKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gYG1hdC1lbGV2YXRpb24teiR7dGhpcy5vcHRpb25zLmVsZXZhdGlvbn1gO1xuXHR9XG5cbiAgb25Ob2RlQ2xpY2soY2xpY2tlZE5vZGU6IFRyZWVUYWJsZU5vZGU8VD4pOiB2b2lkIHtcbiAgICBjbGlja2VkTm9kZS5pc0V4cGFuZGVkID0gIWNsaWNrZWROb2RlLmlzRXhwYW5kZWQ7XG4gICAgdGhpcy50cmVlVGFibGUuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5pc1Zpc2libGUgPSB0aGlzLnNlYXJjaGFibGVUcmVlLmV2ZXJ5KHN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZVNlcnZpY2Uuc2VhcmNoQnlJZChzdCwgZWwuaWQpLlxuICAgICAgICAgIGZvbGQoW10sIG4gPT4gbi5wYXRoVG9Sb290KVxuICAgICAgICAgIC5ldmVyeShwID0+IHRoaXMudHJlZVRhYmxlLmZpbmQoeCA9PiB4LmlkID09PSBwLmlkKS5pc0V4cGFuZGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZ2VuZXJhdGVEYXRhU291cmNlKCk7XG4gICAgdGhpcy5ub2RlQ2xpY2tlZC5uZXh0KGNsaWNrZWROb2RlKTtcbiAgfVxuXG4gIC8vIE92ZXJyaWRlcyBkZWZhdWx0IG9wdGlvbnMgd2l0aCB0aG9zZSBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgcGFyc2VPcHRpb25zKGRlZmF1bHRPcHRzOiBPcHRpb25zPFQ+KTogT3B0aW9uczxUPiB7XG4gICAgcmV0dXJuIGRlZmF1bHRzKHRoaXMub3B0aW9ucywgZGVmYXVsdE9wdHMpO1xuICB9XG5cbn1cbiJdfQ==