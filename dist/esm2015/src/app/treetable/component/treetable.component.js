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
export class TreetableComponent {
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
tslib_1.__decorate([
    Required,
    tslib_1.__metadata("design:type", Object)
], TreetableComponent.prototype, "tree", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLXRyZWV0YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdHJlZXRhYmxlL2NvbXBvbmVudC90cmVldGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBTy9CLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7SUFTN0IsWUFDVSxXQUF3QixFQUN4QixnQkFBa0MsRUFDbEMsZ0JBQWtDLEVBQzFDLElBQWdCO1FBSFIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVm5DLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBOEIsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7Y0FZekQsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcs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OztJQUN0Qyw4Q0FBMkI7O0lBQzNCLHdDQUFpRDs7SUFHL0MseUNBQWdDOztJQUNoQyw4Q0FBMEM7O0lBQzFDLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb2RlLCBUcmVlVGFibGVOb2RlLCBPcHRpb25zLCBTZWFyY2hhYmxlTm9kZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBUcmVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyZWUvdHJlZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFZhbGlkYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy92YWxpZGF0b3IvdmFsaWRhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbnZlcnRlci9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4uL2RlZmF1bHQub3B0aW9ucyc7XG5pbXBvcnQgeyBmbGF0TWFwLCBkZWZhdWx0cyB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBSZXF1aXJlZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvcmVxdWlyZWQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdHJlZXRhYmxlLCB0cmVldGFibGUnLCAvLyAnbmctdHJlZXRhYmxlJyBpcyBjdXJyZW50bHkgYmVpbmcgZGVwcmVjYXRlZFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZXRhYmxlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJlZXRhYmxlQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgQFJlcXVpcmVkIHRyZWU6IE5vZGU8VD4gfCBOb2RlPFQ+W107XG4gIEBJbnB1dCgpIG9wdGlvbnM6IE9wdGlvbnM8VD4gPSB7fTtcbiAgQE91dHB1dCgpIG5vZGVDbGlja2VkOiBTdWJqZWN0PFRyZWVUYWJsZU5vZGU8VD4+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzZWFyY2hhYmxlVHJlZTogU2VhcmNoYWJsZU5vZGU8VD5bXTtcbiAgcHJpdmF0ZSB0cmVlVGFibGU6IFRyZWVUYWJsZU5vZGU8VD5bXTtcbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIGRhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTxUcmVlVGFibGVOb2RlPFQ+PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBUcmVlU2VydmljZSxcbiAgICBwcml2YXRlIHZhbGlkYXRvclNlcnZpY2U6IFZhbGlkYXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb252ZXJ0ZXJTZXJ2aWNlOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIGVsZW06IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IGVsZW0ubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRhZ05hbWUgPT09ICduZy10cmVldGFibGUnKSB7XG4gICAgICBjb25zb2xlLndhcm4oYERFUFJFQ0FUSU9OIFdBUk5JTkc6IFxcbiBUaGUgJ25nLXRyZWV0YWJsZScgc2VsZWN0b3IgaXMgYmVpbmcgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0aGUgbmV3ICd0cmVldGFibGUnIHNlbGVjdG9yYCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50cmVlID0gQXJyYXkuaXNBcnJheSh0aGlzLnRyZWUpID8gdGhpcy50cmVlIDogW3RoaXMudHJlZV07XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5wYXJzZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xuICAgIGNvbnN0IGN1c3RvbU9yZGVyVmFsaWRhdG9yID0gdGhpcy52YWxpZGF0b3JTZXJ2aWNlLnZhbGlkYXRlQ3VzdG9tT3JkZXIodGhpcy50cmVlWzBdLCB0aGlzLm9wdGlvbnMuY3VzdG9tQ29sdW1uT3JkZXIpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY3VzdG9tQ29sdW1uT3JkZXIgJiYgIWN1c3RvbU9yZGVyVmFsaWRhdG9yLnZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICBQcm9wZXJ0aWVzICR7Y3VzdG9tT3JkZXJWYWxpZGF0b3IueG9yLm1hcCh4ID0+IGAnJHt4fSdgKS5qb2luKCcsICcpfSBpbmNvcnJlY3Qgb3IgbWlzc2luZyBpbiBjdXN0b21Db2x1bW5PcmRlcmBcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMub3B0aW9ucy5jdXN0b21Db2x1bW5PcmRlclxuICAgICAgPyB0aGlzLm9wdGlvbnMuY3VzdG9tQ29sdW1uT3JkZXJcbiAgICAgIDogdGhpcy5leHRyYWN0Tm9kZVByb3BzKHRoaXMudHJlZVswXSk7XG4gICAgdGhpcy5zZWFyY2hhYmxlVHJlZSA9IHRoaXMudHJlZS5tYXAodCA9PiB0aGlzLmNvbnZlcnRlclNlcnZpY2UudG9TZWFyY2hhYmxlVHJlZSh0KSk7XG4gICAgY29uc3QgdHJlZVRhYmxlVHJlZSA9IHRoaXMuc2VhcmNoYWJsZVRyZWUubWFwKHN0ID0+IHRoaXMuY29udmVydGVyU2VydmljZS50b1RyZWVUYWJsZVRyZWUoc3QpKTtcbiAgICB0aGlzLnRyZWVUYWJsZSA9IGZsYXRNYXAodHJlZVRhYmxlVHJlZSwgdGhpcy50cmVlU2VydmljZS5mbGF0dGVuKTtcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmdlbmVyYXRlRGF0YVNvdXJjZSgpO1xuICB9XG5cbiAgZXh0cmFjdE5vZGVQcm9wcyh0cmVlOiBOb2RlPFQ+ICYgeyB2YWx1ZTogeyBbazogc3RyaW5nXTogYW55IH0gfSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModHJlZS52YWx1ZSkuZmlsdGVyKHggPT4gdHlwZW9mIHRyZWUudmFsdWVbeF0gIT09ICdvYmplY3QnKTtcbiAgfVxuXG4gIGdlbmVyYXRlRGF0YVNvdXJjZSgpOiBNYXRUYWJsZURhdGFTb3VyY2U8VHJlZVRhYmxlTm9kZTxUPj4ge1xuICAgIHJldHVybiBuZXcgTWF0VGFibGVEYXRhU291cmNlKHRoaXMudHJlZVRhYmxlLmZpbHRlcih4ID0+IHguaXNWaXNpYmxlKSk7XG4gIH1cblxuICBmb3JtYXRJbmRlbnRhdGlvbihub2RlOiBUcmVlVGFibGVOb2RlPFQ+LCBzdGVwOiBudW1iZXIgPSA1KTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyZuYnNwOycucmVwZWF0KG5vZGUuZGVwdGggKiBzdGVwKTtcbiAgfVxuXG5cdGZvcm1hdEVsZXZhdGlvbigpOiBzdHJpbmcge1xuXHRcdHJldHVybiBgbWF0LWVsZXZhdGlvbi16JHt0aGlzLm9wdGlvbnMuZWxldmF0aW9ufWA7XG5cdH1cblxuICBvbk5vZGVDbGljayhjbGlja2VkTm9kZTogVHJlZVRhYmxlTm9kZTxUPik6IHZvaWQge1xuICAgIGNsaWNrZWROb2RlLmlzRXhwYW5kZWQgPSAhY2xpY2tlZE5vZGUuaXNFeHBhbmRlZDtcbiAgICB0aGlzLnRyZWVUYWJsZS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmlzVmlzaWJsZSA9IHRoaXMuc2VhcmNoYWJsZVRyZWUuZXZlcnkoc3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlU2VydmljZS5zZWFyY2hCeUlkKHN0LCBlbC5pZCkuXG4gICAgICAgICAgZm9sZChbXSwgbiA9PiBuLnBhdGhUb1Jvb3QpXG4gICAgICAgICAgLmV2ZXJ5KHAgPT4gdGhpcy50cmVlVGFibGUuZmluZCh4ID0+IHguaWQgPT09IHAuaWQpLmlzRXhwYW5kZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5nZW5lcmF0ZURhdGFTb3VyY2UoKTtcbiAgICB0aGlzLm5vZGVDbGlja2VkLm5leHQoY2xpY2tlZE5vZGUpO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGVzIGRlZmF1bHQgb3B0aW9ucyB3aXRoIHRob3NlIHNwZWNpZmllZCBieSB0aGUgdXNlclxuICBwYXJzZU9wdGlvbnMoZGVmYXVsdE9wdHM6IE9wdGlvbnM8VD4pOiBPcHRpb25zPFQ+IHtcbiAgICByZXR1cm4gZGVmYXVsdHModGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0cyk7XG4gIH1cblxufVxuIl19