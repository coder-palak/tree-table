import { OnInit, ElementRef } from '@angular/core';
import { Node, TreeTableNode, Options } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { MatTableDataSource } from '@angular/material';
import { ValidatorService } from '../services/validator/validator.service';
import { ConverterService } from '../services/converter/converter.service';
import { Subject } from 'rxjs';
export declare class TreetableComponent<T> implements OnInit {
    private treeService;
    private validatorService;
    private converterService;
    tree: Node<T> | Node<T>[];
    options: Options<T>;
    nodeClicked: Subject<TreeTableNode<T>>;
    private searchableTree;
    private treeTable;
    displayedColumns: string[];
    dataSource: MatTableDataSource<TreeTableNode<T>>;
    constructor(treeService: TreeService, validatorService: ValidatorService, converterService: ConverterService, elem: ElementRef);
    ngOnInit(): void;
    extractNodeProps(tree: Node<T> & {
        value: {
            [k: string]: any;
        };
    }): string[];
    generateDataSource(): MatTableDataSource<TreeTableNode<T>>;
    formatIndentation(node: TreeTableNode<T>, step?: number): string;
    formatElevation(): string;
    onNodeClick(clickedNode: TreeTableNode<T>): void;
    parseOptions(defaultOpts: Options<T>): Options<T>;
}
