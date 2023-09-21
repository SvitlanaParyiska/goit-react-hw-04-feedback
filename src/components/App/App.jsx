import { useState, useEffect } from 'react';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';
import { Container } from './App.styled';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [countPositiveFeedback, setCountPositiveFeedback] = useState(0);

  const onLeaveFeedback = btnName => {
    if (btnName === 'good') {
      setGood(prevState => prevState + 1);
      return;
    }
    if (btnName === 'neutral') {
      setNeutral(prevState => prevState + 1);
      return;
    }
    if (btnName === 'bad') {
      setBad(prevState => prevState + 1);
      return;
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    setTotalFeedback(good + neutral + bad);
  }, [good, neutral, bad]);

  useEffect(() => {
    setCountPositiveFeedback(Math.round((good / totalFeedback) * 100));
  }, [totalFeedback]);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};
