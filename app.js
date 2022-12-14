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
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
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
            displayPeople(personDescendants);
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
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
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
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(person, people) {
    let personFamily = `Family members of ${person.firstName} ${person.lastName} are: \n`
    personFamily += findPersonSiblings(person, people)
    personFamily += findPersonSpouse(person, people)
    personFamily += findPersonParents(person, people)
    return personFamily
}

function findPersonSiblings(person, people){
    let foundSiblings = ""
    let siblings = people.filter(function(el){
    if (person.id != el.id && (person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1]))) {
        return true;
    }
    else {
        return false;
    }
})

    let siblingArray = siblings.map(function(el) {
        return `${el.firstName} ${el.lastName}`
    })
    if(siblings.length === 0){
        return `\nNo siblings found`;
    }
    else{
        return foundSiblings += `\n Siblings: ${siblingArray}`;
    }
}


function findPersonSpouse(person, people){    
    let foundSpouse = ""
    let spouse = people.filter(function(el){
        if (person.currentSpouse === el.id){
        return true;
    }
        else {
        return false;}
        })
    if (spouse.length == 0){
        foundSpouse += `\nThis person does not have a spouse`
        return foundSpouse;
    }
    else{foundSpouse += `\n Spouse: ${spouse[0].firstName} ${spouse[0].lastName}`;
    
        return foundSpouse;
    }
}

function findPersonParents(person, people){
    let foundParents = ""
    let parents = people.filter(function(el){
        if(person.parents[0] === el.id || person.parents[1] === el.id){
            return true;
        }
        else{
            return false;
        }
    })
    let parentArray = parents.map(function(el){
        return `${el.firstName} ${el.lastName}`    
    })
    if (parents.length == 0){
        foundParents += `\nNo parents found`
        return foundParents
    }
    else {
        return foundParents += `\nParents: ${parentArray}`
    }
}


function findPersonDescendants(person, people){
    let personKid = people.filter(function(el){
      if(el.parents[0] === person.id || el.parents[1] === person.id){
        return true;
      }
    });
    for(let i = 0; i < personKid.length; i++){
      people.filter(function(el){
        if (el.parents[0] === personKid[i].id || el.parents[1] === personKid[i].id){
          personKid.push(el);
        }
      });
    }
    return personKid;
  }

function searchByTraits(people){
    let messageDisplay = prompt(`To search for a single trait enter 1 to search for mulitple traits enter 2`)
    while(messageDisplay !=="1" && messageDisplay !=="2"){
    messageDisplay = prompt(`To search for a single trait enter 1 to search for mulitple traits enter 2`)
    }
    if(messageDisplay == "1"){
    let messageQuestion = prompt( "Which trait would you like to search for: gender, DOB, height, weight, eyecolor?"
    ).toLowerCase();
    while (
      messageQuestion !== "gender" && messageQuestion !== "dob" && messageQuestion !== "height" && messageQuestion !== "weight" && messageQuestion !== "eyecolor") 
      {
      messageQuestion = prompt(
        "Entry is invalid.\nWhich trait would you like to search for: gender, DOB, height, weight, eyecolor?"
      ).toLowerCase();
    }
    if (messageQuestion == "gender"){
        let userInput = prompt(`Which gender do you want to search for: "male" or "female"?`)
    let genderResult = searchForGender(people, userInput)
        return genderResult
    }
    else if (messageQuestion == "dob"){
        let userInput = prompt(`What is the date of birth of the person?`)
        let dobResult = searchForDob(people, userInput)
        return dobResult
    }
    else if (messageQuestion == "height"){
        let userInput = prompt(`What is the height of the person in inches?`)
        let heightResult = searchForHeight(people, userInput)
        return heightResult
    }
    else if (messageQuestion == "weight"){
        let userInput = prompt(`What is the weight of the person in pounds?`)
        let weightResult = searchForWeight(people, userInput)
        return weightResult
    }
    else if (messageQuestion == "eyecolor"){
        let userInput = prompt(`What is the eyecolor of the person?`)
        let eyecolorResult = searchForEyecolor(people, userInput)
        return eyecolorResult
    }
}
    if(messageDisplay == "2"){
        let multipleSelections = prompt(`What traits would you like to search for: gender, dob, height, weight, eyecolor (no spaces)`
        ).toLowerCase().split(',')
        for (let i = 0; i < multipleSelections.length; i++){
            if (multipleSelections[i] == "gender"){
              let traits = prompt(`Which gender do you want to search for: "male" or "female"?`)
              let foundResults = searchForGender(people, traits)
            } else if (multipleSelections[i] == "dob"){
              let traits = prompt(`What is the date of birth of the person?`)
              foundResults = searchForDob(people, traits)
            } else if (multipleSelections[i] == "height"){
              let traits = prompt(`What is the height of the person in inches?`)
              foundResults = searchForHeight(people, traits)
            } else if (multipleSelections[i] == "weight"){
              let traits = prompt(`What is the weight of the person in pounds?`)
              foundResults = searchForWeight(people, traits)
            } else if (multipleSelections[i] == "eyecolor"){
              let traits = prompt(`What is the eyecolor of the person?`)
              foundResults = searchForEyecolor(people, traits)
            }
            }
            if (traits !== `No matches found`){
            return foundResults;
            } 
            else(
                alert(`No matches found`)
            )        
    }}


function searchForGender(people, choice){
    let gender = people.filter(function (el){
        if(el.gender == choice)
        return true
    })
    if(gender !== 0){
    let result = gender.map(function (el){
        return `${el.firstName} ${el.lastName}\n`
    }) 
        alert(result)
        return gender
    }
}
function searchForDob(people, choice){
    let dob = people.filter(function (el){
        if(el.dob == choice)
        return true
    })
    if(dob !== 0){
    let result = dob.map(function (el){
        return `${el.firstName} ${el.lastName}\n`
    }) 
        alert(result)
        return dob
    }
        else{
            alert(`No matches found`)
    }
}
function searchForHeight(people, choice){
    let height = people.filter(function (el){
        if(el.height == choice)
        return true
    })
    if(height !== 0){
    let result = height.map(function (el){
        return `${el.firstName} ${el.lastName}\n`
    }) 
        alert(result)
        return height
    }
        else{
            alert(`No matches found`)
    }
}
function searchForWeight(people, choice){
    let weight = people.filter(function (el){
        if(el.weight == choice)
        return true
    })
    if(weight !== 0){
    let result = weight.map(function (el){
        return `${el.firstName} ${el.lastName}\n`
    }) 
        alert(result)
        return weight
    }
        else{
            alert(`No matches found`)
    }
}
function searchForEyecolor(people, choice){
    let eyecolor = people.filter(function (el){
        if(el.eyeColor == choice)
        return true
    })
    if(eyecolor !== 0){
    let result = eyecolor.map(function (el){
        return `${el.firstName} ${el.lastName}\n`
    }) 
        alert(result)
        return height
    }
        else{
            alert(`No matches found`)
    }}