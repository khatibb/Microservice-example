var _ = require('lodash')

function checkIfExists(arrayOfObjects, fieldToCheck, value) {
    var result = false

    if (_.isNil(arrayOfObjects)) {
        // if the array is brand-new (i.e didnt get used before so it equals to null)-> return true (there's no existing entry)
        result = false
        return result
    }
    // check for insatnce of the value in the desired object field in the array of objects
    for (var i = 0; i < arrayOfObjects.length; i++) {

        var tmp = arrayOfObjects[i][fieldToCheck]
        if (tmp === value) {
            result = true
            break

        }


    }
    return result
}


module.exports = checkIfExists