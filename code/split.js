// globals boudaries;
const globalLow = 53;
const globalHigh = 89;

const noteNum = [53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89];
const noteName = ["F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6"];

// special identifiers
const identifiers = {
	hashes: [54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87],
	naturals: [53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89]
}

function anything() {
	var a = arrayfromargs(messagename, arguments);
	const str = a.shift();

	// define regex with []
	const rx1 = new RegExp(/\[([^\]]+)]/);

	// split received message with regexp
	const reg = str.split(rx1);

	if (reg[1]) {
		// retrieve low and high boudaries

		let [low, high] = reg[1].split("-");
		if (!Number.isInteger(parseInt(low))) {
			const i_low = noteName.findIndex(e => e === low);
			const i_high = noteName.findIndex(e => e === high);
			low = noteNum[i_low];
			high = noteNum[i_high];
		};

		for (let i = low; i <= high; i++) {
			// post(`${i}${reg[2]}`, a);
			messnamed(`${i}${reg[2]}`, a);
		}
	} else {
		// either solo or global
		const msg = str.split("-");

		if (Number.isInteger(parseInt(msg[0]))) {
			// solo
			messnamed(str, a);
		} else {
			const prefix = msg.shift();

			if (prefix in identifiers) {
				const suffix = msg.join("-");
				// special identifiers
				identifiers[prefix].forEach(i => {
					messnamed(`${i}-${suffix}`, a);
				})
			} else {
				// global
				for (let i = globalLow; i <= globalHigh; i++) {
					messnamed(`${i}-${str}`, a)
				}
			}

		}
	}
}