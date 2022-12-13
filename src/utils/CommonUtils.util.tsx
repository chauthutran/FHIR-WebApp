

export const cloneJson = ( jsonData: any ) => {
    return JSON.parse(JSON.stringify(jsonData));
}

export const getColorFromStr = ( text: string ) => {
    var hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    var colour = '#';
    for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}


export const stringToDarkColour = ( text: string ) => {
    const col: string | any = getColorFromStr( text );
    const amt = -50;
    return (((col & 0x0000FF) + amt) | ((((col >> 8) & 0x00FF) + amt) << 8) | (((col >> 16) + amt) << 16)).toString(16); 
}
