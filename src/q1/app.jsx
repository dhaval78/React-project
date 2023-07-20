import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import QuestionPage from './quesp';
import { getQuestions, getAnswers } from './quesdata';

const subjects = ['General Knowledge', 'Maths', 'Chemistry', 'Computers'];
const assignments = ['4A', '10C', '7A(i)', '3B'];

class App1 extends Component {
  state = {
    performance: {},
    answers: {},
  };

  updatePerformance = (subject, performance) => {
    this.setState((prevState) => ({
      performance: {
        ...prevState.performance,
        [subject]: performance,
      },
    }));
  };

  handleDoClick = (subject) => {
    this.props.history.push(`/questions/${subject}`);
  };

  renderTableRows = () => {
    const { performance } = this.state;

    return subjects.map((subject, index) => {
      const assignment = assignments[index];
      const answeredQuestions = performance[subject] || 'Not Done';

      return (
        <div className="row" key={index}>
          <div className="col">{subject}</div>
          <div className="col">{assignment}</div>
          <div className="col">{answeredQuestions}</div>
          <div className="col">
            <button className="btn btn-primary" onClick={() => this.handleDoClick(subject)}>
              Do
            </button>
          </div>
          <div className="col">
            {performance[subject] && (
              <Link to={`/check/${subject}`} className="btn btn-primary">
                Check
              </Link>
            )}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Choose the Assignment</h1>
        <div className="row">
          <div className="col">Subject</div>
          <div className="col">Assignment</div>
          <div className="col">Performance</div>
          <div className="col">Do</div>
          <div className="col">Check</div>
        </div>
        <div>{this.renderTableRows()}</div>
        <Switch>
          <Route
            path="/questions/:subject"
            render={(props) => {
              const subject = props.match.params.subject;
              const currentAssignment = assignments[subjects.indexOf(subject)];
              const questions = getQuestions(subject);

              return (
                <QuestionPage
        {...props}
        subjects={subjects}
        currentAssignment={currentAssignment}
        questions={questions}
        answers={this.state.answers[currentAssignment] || {}} // Pass answers for the current assignment
        setAnswers={(answers) =>
          this.setState((prevState) => ({
            answers: {
              ...prevState.answers,
              [currentAssignment]: answers, // Store answers for the current assignment
            },
          }))
        }
        updatePerformance={this.updatePerformance}
      />
              );
            }}
          />
          <Route path="/check/:subject" component={CheckPage} />
        </Switch>
      </div>
    );
  }
}

class CheckPage extends Component {
  state = {
    performance: 0,
  };

  componentDidMount() {
    const subject = this.props.match.params.subject;
    const questions = getQuestions(subject);
    const answers = getAnswers(subject);

    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      if (this.props.answers[i] === answers[i]) {
        correct++;
      }
    }

    const performance = `${correct} / ${questions.length}`;
    this.setState({ performance });
  }

  render() {
    const subject = this.props.match.params.subject;
    const performance = this.state.performance.toFixed(2);

    return (
      <div>
        <h1>
          {subject}: Assignment {assignments[subjects.indexOf(subject)]}
        </h1>
        <h3>Performance: {performance}</h3>
        <button className="btn btn-primary" onClick={() => this.props.history.push('/')}>
          Go Back
        </button>
      </div>
    );
  }
}

export default withRouter(App1);
