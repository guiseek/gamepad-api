import { lerp } from "./lerp"

const perm: number[] = []
let value

export const generateFloor = (level: number) => {

	while (perm.length < level) {
		while (perm.includes((value = Math.floor(Math.random() * level))));
		perm.push(value)
	}
	
	const noise = (x: number) => {
		x = (x * 0.004) % level
	
		return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x))
	}
	
}
