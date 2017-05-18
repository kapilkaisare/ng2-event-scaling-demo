export class ReorderableObject {
	ordinal: number;
	name: string;
	selected: boolean = false;

	constructor(ordinal: number, name: string) {
		this.ordinal = ordinal;
		this.name = name;
	}
}
