import React, { Component } from 'react';
import { getQuestions, getAnswers } from './quesdata';

class QuestionPage extends Component {
  state = {
    currentQuestion: 0,
    showMarkingSheet: false,
    submitted: false,
    newAnswer:[]
  };

  handleOptionClick = (optionIndex) => {
    const { currentQuestion } = this.state;
  const { currentAssignment, answers, setAnswers } = this.props;
  const newAnswers = { ...answers, [currentAssignment] :{[currentQuestion]: optionIndex }}; // Store the selected option for the current question
  this.setState({ newAnswer: newAnswers });
  setAnswers(newAnswers);
  console.log(newAnswers);
  };

  handlePreviousClick = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion - 1,
    }));
  };

  handleNextClick = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
    }));
  };

  handleMarkingSheetClick = () => {
    this.setState((prevState) => ({
      showMarkingSheet: !prevState.showMarkingSheet,
    }));


  };

  handleSubmitClick = () => {
    const { answers, subject, setAnswers, updatePerformance } = this.props;
    const questions = getQuestions(subject);
    const currentAssignment = this.props.currentAssignment;
    const assignmentAnswers = getAnswers(subject, currentAssignment);

    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[currentAssignment][i] === assignmentAnswers[i]) {
        correct++;
      }
    }

    const performance = `${correct} / ${questions.length}`;
    this.setState({ submitted: true });
   
    updatePerformance(subject, performance);
  };

  renderQuestions = () => {
    const { currentQuestion, showMarkingSheet, submitted } = this.state;
    const { subject, currentAssignment, questions, answers } = this.props;

    if (submitted) {
      return (
        <div>
          <h1>Assignment Complete!</h1>
          <button className="btn btn-primary" onClick={() => this.props.history.push('/')}>
            Go Back
          </button>
        </div>
      );
    }

    const question = questions[currentQuestion];

    return (
      <div>
        <h1>
          {subject}: Assignment {currentAssignment}
        </h1>
        <div className="d-flex justify-content-around">
          <p>Time: 5 mins</p>
          <p>
            Max score: {questions.length}
            <br />
            {showMarkingSheet ? (
              ''
            ) : (
              <button className="btn btn-primary" onClick={this.handleMarkingSheetClick}>
                View Marking Sheet
              </button>
            )}
          </p>
        </div>
        <div>
          {showMarkingSheet ? (
            <div>
              <div className="d-inline-flex">{this.renderMarkingSheet()}</div>
              <br />
              <button className="btn btn-primary" onClick={this.handleMarkingSheetClick}>
                Hide Marking Sheet
              </button>
              <button className="btn btn-primary mt-3 ml-2" onClick={this.handleSubmitClick}>
                Submit
              </button>
            </div>
          ) : (
            <div>
              <p>Question number: {currentQuestion + 1}</p>
              <p>{question.text}</p>
              {question.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => this.handleOptionClick(index + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  <button
                    className={
                      answers[currentAssignment] && answers[currentAssignment][currentQuestion] === index + 1
                        ? 'btn btn-primary'
                        : 'btn'
                    }
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                </div>
              ))}
              <p>
                Your answer:{' '}
                {answers[currentAssignment] && answers[currentAssignment][currentQuestion] !== undefined
                  ? `${String.fromCharCode(64 + answers[currentAssignment][currentQuestion])}`
                  : ''}
              </p>
              <button
                className="btn btn-primary"
                hidden={currentQuestion === 0}
                onClick={this.handlePreviousClick}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                hidden={currentQuestion === questions.length - 1}
                onClick={this.handleNextClick}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  renderMarkingSheet = () => {
    const { newAnswer} = this.state;
    const {  currentAssignment, questions, answers,subject } = this.props;


    return (
      <>
        {questions.map((question, index) => (
          <div className="d-flex" key={index}>
            <button
              className={
               newAnswer[`${index}`]
                  ? 'btn btn-secondary'
                  : 'btn btn-warning'
              }
            >
              {`${index+1}.${newAnswer[index]?String.fromCharCode(64+newAnswer[index]):''}`}
            </button>
          </div>
        ))}
    
      </>
    );
  };

  render() {
    return <div>{this.renderQuestions()}</div>;
  }
}

export default QuestionPage;
