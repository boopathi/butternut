import Node from '../Node.js';

export default class YieldExpression extends Node {
	getPrecedence () {
		return 2;
	}
}
