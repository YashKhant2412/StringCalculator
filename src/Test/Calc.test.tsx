import add from '../Logic/Calc';

describe('add function', () => {
    test('for an empty string it will return 0', () => {
        expect(add("")).toBe(0);
    });

    test('returns the number itself if only one number', () => {
        expect(add("1")).toBe(1);
    });

    test('returns the sum of two comma-separated numbers', () => {
        expect(add("1,5")).toBe(6);
    });

    test('returns the sum of multiple comma-separated numbers', () => {
        expect(add("1,2,3,4")).toBe(10);
    });

    test('handles invalid numbers gracefully (ignores them in sum)', () => {
        expect(() => add("1,,3,foo,4")).toThrow("Invalid input") // invalid
    });

    test('handles new lines between numbers', () => {
        expect(add("1\n2,3")).toBe(6);  //new line
    });

    test('supports different delimiters specified at the beginning', () => {

        expect(add("//;\n1;2")).toBe(3); 
        expect(add("//|\n2|3|4")).toBe(9); 
        expect(add("//$\n5$5$5")).toBe(15); 
    });

    test('throws an exception with a message for a single negative number', () => {
        expect(() => add("-1,2,3")).toThrow("negative numbers not allowed: -1");
    });

    test('throws an exception with a message for negative numbers', () => {
        expect(() => add("1,-2,3,-4")).toThrow("negative numbers not allowed: -2, -4");
    });

    test('throws an exception with a message for a single negative number with diff delemeter', () => {
        expect(() => add("//$\n5$-5$5")).toThrow("negative numbers not allowed: -5");
    });

    test('numbers greater than 1000 should be ignored', () => {
        expect(add("1\n2000,3000,9")).toBe(10);  //num>1000
    });

    test('supports multi-character delimiters', () => {
        expect(add("//[***]\n1***2***3")).toBe(6); //multi-character "***"
        expect(add("//[###]\n4###5###6")).toBe(15); 
    });


});
