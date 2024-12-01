import tesseract from "tesseract.js";

export const getDataFromAadhar = async (image) => {
    const { data: { text } } = await tesseract.recognize(image, "eng");
    return text;
};
export const getAadharNumber = async (text) => {

    const idNumberRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
    const match = text.match(idNumberRegex);
    if (match) {
        return match[0].replace(/\s/g, '');
    }
    return null;
};


export const getName = (text) => {
    const nameRegex = /(?:\bA\s|=\s?A\s|Name[:\s-]*)([A-Z][a-z]+\s[A-Z][a-z]+)/m;
    const match = text.match(nameRegex);
    return match ? match[1].trim() : null;
};

export const getDOB = (text) => {
    const dobRegex = /\s+(\d{2}\/\d{2}\/\d{4})/;
    const match = text.match(dobRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}


export const getGender = (text) => {
    const genderRegex = /MALE|FEMALE|Male|Female|TRANSGENDER/;
    const match = text.match(genderRegex)
    return match ? match[1] : null
}


export const getAddress = (text) => {
    const addressPattern = /,\s*(.+?)\s+Kerala\s*-\s*\d{6}/;

    const cleanedText = text.replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim();
    const match = cleanedText.match(addressPattern);

    if (match) {
        const part1 = match[1].replace(/[^a-zA-Z0-9\s,.'-]/g, '').replace(/\s+/g, ' ').trim()

        const split = part1.split(" ")
        const filteredWords = split.filter(word => word.replace(/[^\w]/g, '').length > 5);
        const code = match[0].match(/\d{6}/);

        const res = filteredWords.join(', ')

        return { address: `${res}, ${code[0]}`, pincode: code[0] };
    }

    return 'Address not found';
};




