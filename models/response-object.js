// object represents the structure of object
// returned with HTTP get method.
//

module.exports = class ResponseObject {
    constructor(message_, data_) {
        this.message = message_;
        this.data = data_;
    }
}