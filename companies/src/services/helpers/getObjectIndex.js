function getObjectIndex(arrayOfObjects, fieldToCheck, value) {
    var result = -1
    for (var i = 0; i < arrayOfObjects.length; i++) {

        var tmp = arrayOfObjects[i][fieldToCheck]
        if (tmp === value) {
            result = i
            break

        }


    }
    return result
}


module.exports = getObjectIndex