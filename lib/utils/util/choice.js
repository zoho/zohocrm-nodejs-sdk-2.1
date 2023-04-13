/**
 * Common Class to provide or obtain a value, when there are multiple supported values.
 */
class Choice {
    value;

    constructor(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}

export {
    Choice as Choice,
    Choice as MasterModel
}