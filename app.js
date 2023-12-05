// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"

function app(people) {
	debugger;
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);
	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':
			 results = searchByTrait(people);
			
			break;
		default:
			return searchPeopleDataSet(people);
	}
	return results;
}
function searchById(people) {
	const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	const idToSearchForInt = parseInt(idToSearchForString);
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}
function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}
function searchByTrait(people) {
	const genderTraitToSearchFor = prompt(
		'Please enter the gender of the person or persons you are searching for.',
	);
		const eyeColorTraitToSearchFor = prompt(
		'Please enter the eye color of the person or persons you are searching for.',
	);
	const searchByTraitResults = people.filter(
		(person) =>
			person.gender.toLowerCase() === genderTraitToSearchFor.toLowerCase() &&
			person.eyeColor.toLowerCase() === eyeColorTraitToSearchFor.toLowerCase(),
	)

		.map((person) => ({id:person.id,firstName: person.firstName, lastName: person.lastName}));
	return searchByTraitResults;
}
function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);


	switch (mainMenuUserActionChoice) {
		case 'info':
		displayPersonInfo(person);
			break;
		case 'family':
			displayPeople('Family', personFamily)
			// let personFamily = findPersonFamily(person, people);
			
			break;
		case 'descendants':
			//! TODO
			// let personDescendants = findPersonDescendants(person, people);
			// displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function displayPersonInfo(person){     
	const formattedInfoText = formattedPersonInfo(person);
	alert(formattedInfoText)
}
function formattedPersonInfo(person){
	const formattedInfoText= `
	ID:${person.id} 
	First Name:${person.firstName} 
	Last Name:${person.lastName}
	Gender: ${person.gender}
	DOB: ${person.dob}
	Height:${person.height}
	Weight${person.weight}
    EyeColor: ${person.eyeColor}
	Occupation: ${person.occupation}
	`;
	return formattedInfoText;
}



function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}
