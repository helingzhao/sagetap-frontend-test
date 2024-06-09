/*
    For a more complex application, fields like
    'errorCode', 'runbookLink', and 'retryAction'
    can be helpful for tackling time-sensitive
    support issues, particularly if there is another
    team that is on-call.

    For this exercise, only a simple error message 
    will be included.
*/

class RatingSubmissionError extends Error {
  constructor(
    message: string
    // errorCode: string,
    // runbookLink: string,
    // retryAction: string,
  ) {
    super(message);
    this.name = "RatingSubmissionError";
    // this.errorCode = errorCode;
    // this.runbookLink = runbookLink;
    // this.retryAction = retryAction;
  }
}

export default RatingSubmissionError;
