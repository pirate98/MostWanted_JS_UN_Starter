/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}.\n Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * This help function
 * @param {Array} people        A string
 * @return {Array}
 */
function searchByTraits(people) {
    let gender = promptFor("What is the person's gender?", validationGender);
    let dob = promptFor("What is the person's birthday?", validationDOB);
    let height = promptFor("How tall is the person?", validationNumber);
    let weight = promptFor("How much does the person weigh?", validationNumber);
    let eyeColor = promptFor("What is the person's eye color?", validationEyeColor);
    let occupation = promptFor("What is the person's occupation?", chars);
    let result = people
    .filter(each => each.gender == gender
        && each.dob == dob
        && each.height == height
        && each.weight == weight
        && each.eyeColor == eyeColor
        && each.occupation == occupation);
    return result;
}

/**
 * This help function
 * @param {Object} person
 * @param {Array} people
 */
function findPersonFamily(person, people) {
    let spouse = people.find(each => each.currentSpouse === person.id);
    let parents = person.parents.map(each => people.find(i => i.id === each));
    let siblings = people.filter(each => each.parent === person.parent)
    let familyInfo = spouse ? `Spouse:\n ${spouse.firstName} ${spouse.lastName}\n` : 'Spouse:\n None\n';
    familyInfo += 'Parents:\n';
    parents.length != 0 ? parents.forEach(i => {
        familyInfo += ` ${i.firstName} ${i.lastName}\n`
    }) : familyInfo += ' None\n';
    familyInfo += 'Siblings:\n'
    siblings ? siblings.forEach(sibling => familyInfo += ` ${sibling.firstName} ${sibling.lastName}\n`) : 'None';
    return familyInfo;
}

/**
 * This helper function
 * @param {Object} person
 * @param {Array} people
 */
function findPersonDescendants(person, people) {
    let descendants = people.filter(descendant => descendant.parents.includes(person.id))
    let descendantInfo = '';
    descendants.forEach(descendant => descendantInfo += `${descendant.firstName} ${descendant.lastName}\n`)
    return descendantInfo ? descendantInfo : 'None';
}

/**
 * This helper function validate user's input for person's gender
 * @param {String} input        A string.
 * @returns {Boolean}
 */
 function validationGender(input) {
    if (input.trim() === 'male' || input.trim() === 'female') {
        return true
    }
    alert('Invalid Gender Format')
    return false;
}
// End of validationGender()

/**
 * This helper function validate user's input for person's birthday
 * @param {String} birthday        A string.
 * @returns {Boolean}
 */
 function validationDOB(birthday) {
    if (!/^\d|\d{2}\/\d|\d{2}\/\d{4}$/g.test(birthday)) {
        alert('Invalid Date Format')
        return false
    }
    let parts = birthday.split('/');
    let now = new Date();
    let month = parseInt(parts[0], 10);
    let day = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    let currentYear = now.getFullYear();

    if (year >= currentYear) {
        alert('Invalid Date Format')
        return false;
    }
    if (month < 1 || month > 12) {
        alert('Invalid Date Format')
        return false;
    }
    if (day < 1 || day > 31) {
        alert('Invalid Date Format')
        return false;
    }

    return true;
}
// End of validationDOB()

/**
 * This helper function validate user's input for person's eye color
 * @param {String} eyeColor        A string.
 * @returns {Boolean}
 */
 function validationEyeColor(eyeColor) {
    if (eyeColor.trim() === 'brown' || 'black' || 'blue' || 'hazel' || 'green') {
        return true
    }
    alert('Please input correct eye color')
    return false;
}
// End of validationEyeColor()

/**
 * @param {number} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
 function validationNumber(input) {
    return true;
}
// End of validationNumber()