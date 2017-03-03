exports.handler = function(event, context, callback) {
    var character;
    var speakCharacter;
    var isAlpha = false;
    
    if (event.result.parameters.phonetic){
        character = event.result.parameters.phonetic;
    }
    else if (event.result.parameters.char){
        character = event.result.parameters.char;
    }
    else {
        callback(null, {"speech": "<speak>I'm sorry I did not understand. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>'});
        return;
    }
    if (event.result.parameters.type) {
        speakCharacter = character;
        switch (character.toLowerCase()) {
            case 'space':
                character = ' ';
                break;
            case 'exclamation':
                character = '!';
                speakCharacter = 'exclamation point';
                break;
            case 'double quote':
                character = '"';
                break;
            case 'quote':
                character = '"';
                speakCharacter = 'double quote';
                break;
            case 'hash':
                character = '#';
                speakCharacter = 'hash mark';
                break;
            case 'pound':
                character = '#';
                speakCharacter = 'pound sign';
                break;
            case 'dollar':
                character = '$';
                speakCharacter = 'dollar sign';
                break;
            case 'percent':
                character = '%';
                speakCharacter = 'percent sign';
                break;
            case 'ampersand':
                character = '&';
                break;
            case 'single quote':
                character = "'";
                break;
            case 'apostrophe':
                character = "'";
                break;
            case 'left parenthesis':
                character = '(';
                break;
            case 'right parenthesis':
                character = ')';
                break;
            case 'times':
                character = '*';
                speakCharacter = 'times sign';
                break;
            case 'star':
                character = '*';
                break;
            case 'plus':
                character = '+';
                speakCharacter = 'plus sign';
                break;
            case 'comma':
                character = ',';
                break;
            case 'minus':
                character = '-';
                speakCharacter = 'minus sign';
                break;
            case 'dash':
                character = '-';
                break;
            case 'period':
                character = '.';
                break;
            case 'dot':
                character = '.';
                break;
            case 'forward slash':
                character = '/';
                break;
            case 'slash':
                character = '/';
                speakCharacter = 'forward slash';
                break;
            case 'colon':
                character = ':';
                break;
            case 'semicolon':
                character = ';';
                break;
            case 'less than':
                character = '<';
                break;
            case 'equals':
                character = '=';
                speakCharacter = 'equals sign';
                break;
            case 'greater than':
                character = '>';
                break;
            case 'question':
                character = '?';
                speakCharacter = 'question mark';
                break;
            case 'at':
                character = '@';
                speakCharacter = 'at symbol';
                break;
            case 'left bracket':
                character = '[';
                break;
            case 'backslash':
                character = '\\';
                break;
            case 'right bracket':
                character = ']';
                break;
            case 'caret':
                character = '^';
                break;
            case 'underscore':
                character = '_';
                break;
            case 'tick':
                character = '`';
                speakCharacter = 'tick mark';
                break;
            case 'left brace':
                character = '{';
                break;
            case 'pipe':
                character = '|';
                break;
            case 'right brace':
                character = '}';
                break;
            case 'tilde':
                character = '~';
                break;
            default:
                character = character.split('')[0];
                speakCharacter = spellOut(character);
                isAlpha = isNaN(character);
                break;
        }

        var cardTitle;
        var upper;
        var lower;
        var unit;
        var cardText;
        var speakText;
        var speechOutput;
        var repromptText;
        
        if (event.result.parameters.type && event.result.parameters.type.toLowerCase() === 'hex') {
            upper = character.toUpperCase().charCodeAt(0).toString(16);
            lower = character.toLowerCase().charCodeAt(0).toString(16);
            unit = 'hex';
        } else if (event.result.parameters.type && event.result.parameters.type.toLowerCase()  === 'decimal') {
            upper = character.toUpperCase().charCodeAt(0).toString();
            lower = character.toLowerCase().charCodeAt(0).toString();
            unit = 'decimal';
        } else if (event.result.parameters.type && event.result.parameters.type.toLowerCase()  === 'octal') {
            upper = character.toUpperCase().charCodeAt(0).toString(8);
            lower = character.toLowerCase().charCodeAt(0).toString(8);
            unit = 'octal';
        } else if (event.result.parameters.type && event.result.parameters.type.toLowerCase()  === 'binary') {
            upper = character.toUpperCase().charCodeAt(0).toString(2);
            lower = character.toLowerCase().charCodeAt(0).toString(2);
            unit = 'binary';
        } else {
            callback(null, {"speech":"<speak>I'm sorry I did not understand what conversion you wanted. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. WHat would you like to convert?</speak>'});
            return;
        } 
        
        if (isAlpha) {
            if (event.result.parameters.case) {
                if (event.result.parameters.case.toLowerCase() === 'uppercase' || event.result.parameters.case.toLowerCase() === 'upper case') {
                    speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper);
                } else if (event.result.parameters.case.toLowerCase() === 'lowercase' || event.result.parameters.case.toLowerCase() === 'lower case') {
                    speakText = 'Lowercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(lower);
                }
            } else {
                speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper) + ' and lowercase is represented as ' + spellOut(lower);
            }
        } else {
            speakText = speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper);
        }
        callback(null, {"speak":'<speak>' + speakText + '</speak>'});
    } else {
        speechOutput = "<speak>I'm sorry I did not understand. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
        callback(null, {'speak':speechOutput});
    }

}

var spellOut = function (text) {
    return '<say-as interpret-as="spell-out">' + text + '</say-as>';
}