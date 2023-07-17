module.exports = {
    counts(response, apiConfig, frame) {
        frame.response = response;
    },
    countsevents(response, apiConfig, frame) {
        // without this, the request does not return the correct data in query
    },
};