import { Node } from '../../models';
export declare class ValidatorService {
    validateCustomOrder<T, K extends Node<T>>(node: K, customColumnOrder: Array<keyof T> & string[]): {
        valid: boolean;
        xor: string[];
    };
}
