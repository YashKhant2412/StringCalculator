
const getDelsAndNums = (input: string): { delimiter: string, numbers: string } => {
    //checking if input starts with "//", indicating a custom delimiter
    if (!input.startsWith("//")) {
        //if there is no custom delimiter then default delimiters are comma and newline
        return { delimiter: ",\n", numbers: input };
    }

    //custom delimiter ends with \n, so find index of that
    const endOfDelimiterIndex = input.indexOf("\n");

    //get the delimiter between "//" and "\n"
    const delimiterSection = input.slice(2, endOfDelimiterIndex);

    let del;
    if (delimiterSection.startsWith("[") && delimiterSection.endsWith("]")) {
        //multi-character delimiter
        del = delimiterSection.slice(1, -1);
    } else {
        //single-character delimiter
        del = delimiterSection;
    }

    //number will be after delimiter end index to the string end
    return { delimiter: del, numbers: input.slice(endOfDelimiterIndex + 1) };
};


const splittingNums = (numbers: string, delimiter: string): string[] => {
    //get array of each delimiter saperately from a single string
    const delimiters = delimiter == ",\n" ? delimiter.split("") : [delimiter];

    //to make list of number, initialization with single entry
    let parts = [numbers];

    console.log(delimiter, "delemetersx");

    //split number with each delimiter
    delimiters.forEach(d => {
        console.log(d, "p1");

        parts = parts.flatMap(part => part.split(d));
        console.log(parts, "p2s");

    });

    return parts.filter(num => num !== "");
};

function isValidNumber(input:string) :boolean{
    return /^-?\d+$/.test(input); // Accepts optional negative sign followed by digits
}

const add = (numbers: string): number => {
    if (!numbers) return 0;

    //getting list of delimiter and number
    const { delimiter, numbers: numString } = getDelsAndNums(numbers);

    // split numbers based on each delimiter
    const numArray = splittingNums(numString, delimiter);
    console.log(numArray);

    numArray.forEach(num => {
        if (!isValidNumber(num)) {
            throw new Error("Invalid input"); // Handle cases where numbers are invalid
        }
    });

    let narr = numArray.map(num=>parseInt(num,10))

    //checking negatives
    const negatives = narr.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
    }

    //removing Nan and number>1000
    let ans = narr.reduce((sum, num) => sum + (isNaN(num) || num > 1000 ? 0 : num), 0);

    return ans
};

export default add;


