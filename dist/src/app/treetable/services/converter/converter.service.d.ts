import { TreeService } from '../tree/tree.service';
import { Node, SearchableNode, TreeTableNode } from '../../models';
export declare class ConverterService {
    private treeService;
    constructor(treeService: TreeService);
    /**
     * Clone a Node<T> object and convert it to a SearchableNode<T>
     * @param tree the node to be converted
     */
    toSearchableTree<T>(tree: Node<T>): SearchableNode<T>;
    /**
     * Clone a SearchableNode<T> object and convert it to a TreeTableNode<T>
     * @param tree the node to be converted
     */
    toTreeTableTree<T>(tree: SearchableNode<T>): TreeTableNode<T>;
}
