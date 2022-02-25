import { Node, SearchableNode, NodeInTree } from '../../models';
import { Option } from 'fp-ts/lib/Option';
export declare class TreeService {
    /**
     * Traverse a tree data structure and applies the provided @param f function
     * to all nodes
     * @param root the tree to be traversed
     * @param f the function to be applied to all nodes
     * N.B. this function modifies the existing tree
     */
    traverse<T, K extends Node<T>>(root: K, f: (node: K) => void): void;
    /**
     * Search a tree for a node with the provided @param id
     * @param root the tree to be searched
     * @param id the id of the node to be retrieved
     */
    searchById<T, K extends SearchableNode<T>>(root: K, id: string): Option<NodeInTree<T>>;
    /**
     * Internal function that can be used to traverse or search the tree
     * @param root the tree to be scanned
     * @param f an optional function to be applied to all nodes
     */
    private _traverse;
    /**
     * Given a @param root tree and a @param node node, calculate the
     * depth of the node in the tree
     * @param root the tree
     * @param node the node we want to calculate the depth of
     */
    getNodeDepth<T, K extends SearchableNode<T>>(root: K, node: K): number;
    /**
     * Flatten a @param root tree into a list of its nodes
     * @param root the tree to be flattened
     */
    flatten<T, K extends Node<T>>(root: K): K[];
    /**
     * Internal function used to build the pathToRoot of a node in a tree
     * @param id the id of the node
     * @param pathMap the pathMap returned by searchById
     */
    private buildPath;
}
