/* Excercise 1 */

const userWord = prompt("Enter a word");

function createArrayOfVowelsAndConsonants(str) {
    const vowelsArray = [];
    const consonantsArray = [];
    const finalArray = [];

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        switch (char) {
            case "a": {
                vowelsArray.push(char);
                break;
            }
            case "e": {
                vowelsArray.push(char);
                break;
            }
            case "i": {
                vowelsArray.push(char);
                break;
            }
            case "o": {
                vowelsArray.push(char);
                break;
            }
            case "u": {
                vowelsArray.push(char);
                break;
            }
            case " ": {
                break;
            }
            default: {
                consonantsArray.push(char);
            }
        }
    }

    const vowelsString = vowelsArray.sort().join(", ");
    const consonantsString = consonantsArray.sort().join(", ");

    finalArray.push(vowelsString, consonantsString);

    return finalArray;
}

function buildMessage(arr) {
    alert(`Your string contains the following vowels: ${arr[0]}.
    And the following consonants: ${arr[1]}.`);
}

const array = createArrayOfVowelsAndConsonants(userWord);

buildMessage(array);
