function checkIfExists(arrayOfObjects, fieldToCheck, value) {
    var result = false
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