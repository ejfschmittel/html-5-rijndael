


export const dashedStringToCammelCase = ( str )  => {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export const shiftArray = (array, places) => {
    const arrayCopy = [...array];
    return arrayCopy.concat(arrayCopy.splice(0, places)) 
}