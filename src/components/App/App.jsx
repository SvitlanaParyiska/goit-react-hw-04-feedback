import { useEffect, useReducer } from 'react';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';
import { Container } from './App.styled';

function reducer(state, action) {
  if (action.type === 'incremented_good') {
    return { ...state, good: state.good + 1 };
  }
  if (action.type === 'incremented_neutral') {
    return { ...state, neutral: state.neutral + 1 };
  }
  if (action.type === 'incremented_bad') {
    return { ...state, bad: state.bad + 1 };
  }
  if (action.type === 'incremented_total') {
    return { ...state, totalFeedback: state.good + state.neutral + state.bad };
  }
  if (action.type === 'countPositiveFeedback') {
    return {
      ...state,
      countPositiveFeedback: Math.round(
        (state.good / state.totalFeedback) * 100
      ),
    };
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
    totalFeedback: 0,
    countPositiveFeedback: 0,
  });

  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  // const [totalFeedback, setTotalFeedback] = useState(0);
  // const [countPositiveFeedback, setCountPositiveFeedback] = useState(0);

  const onLeaveFeedback = btnName => {
    if (btnName === 'good') {
      dispatch({ type: 'incremented_good' });
      return;
    }
    if (btnName === 'neutral') {
      dispatch({ type: 'incremented_neutral' });
      return;
    }
    if (btnName === 'bad') {
      dispatch({ type: 'incremented_bad' });
      return;
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    dispatch({ type: 'incremented_total' });
  }, [state.good, state.neutral, state.bad]);

  useEffect(() => {
    dispatch({ type: 'countPositiveFeedback' });
  }, [state.totalFeedback]);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {state.totalFeedback !== 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={state.totalFeedback}
            positivePercentage={state.countPositiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};
