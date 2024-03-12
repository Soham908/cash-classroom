import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { fetchLessonQuizData } from '../actions/dataFetchActions';

const Quiz = () => {
  const { currentquizLessonName } = useParams();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await fetchLessonQuizData(currentquizLessonName);
      setQuizData(response.quiz);
    };
    fetchQuizData();
  }, [currentquizLessonName]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (questionNumber, selectedOption) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionNumber - 1] = selectedOption;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    console.log('Selected Options:', selectedOptions);
    checkQuizAnswer()
  };

  const checkQuizAnswer = () => {
    for (var number = 0; number < quizData.lessonQuiz[ quizData.lessonQuiz.length - 1 ].questionNumber ; number++){
        if (quizData.lessonQuiz[number].answerId === selectedOptions[number]){
            console.log("sahi jawab, jeet gaye 1 crore rupay");
        }
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {quizData?.lessonQuiz?.map((quiz, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            Question {quiz.questionNumber}: {quiz.question}
          </Typography>

          <RadioGroup
            aria-label={`options-${quiz.questionNumber}`}
            name={`options-${quiz.questionNumber}`}
            value={selectedOptions[quiz.questionNumber - 1] || ''}
            onChange={(event) =>
              handleOptionChange(quiz.questionNumber, event.target.value)
            }
          >
            {quiz?.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        </div>
      ))}

    </div>
  );
};

export default Quiz;
