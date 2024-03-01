function organizePeopleData(peopleArray) {
	const females = {};
	const males = {};

	peopleArray.forEach((identity) => {
		const [fullName, age, gender] = identity.split(", ");

		const [firstName, secondName] = fullName.split(" ");

		const person = { "second-name": secondName, age: parseInt(age) };

		if (gender === "female") {
			females[firstName] = person;
		} else if (gender === "male") {
			males[firstName] = person;
		}
	});

	return { females, males };
}

//current data
const peopleArray = [
	"Patrick wyne, 30, male",
	"lil wyne, 32, male",
	"Eric mimi, 21, female",
	"Dodos deck, 21, male",
	"Alian Dwine, 22, male",
	"Patrick wyne, 33, male",
	"Patrick wyne, 10, trans",
	"Patrick wyne, 40, non-binary",
];

const organizedData = organizePeopleData(peopleArray);
console.log(organizedData);
