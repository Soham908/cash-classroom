import React, { useState } from "react";

const Blogs = () => {
  // Replace this with the actual JSON question data
  const questionData = {
    question: "What is the capital of France?",
    options: [
      { id: "A", text: "Berlin" },
      { id: "B", text: "Madrid" },
      { id: "C", text: "Paris" },
      { id: "D", text: "Rome" },
    ],
    answer: "C",
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const isOptionSelected = (optionId) => {
    return selectedOption === optionId;
  };

  return (
    <div>
      <h3>{questionData.question}</h3>
      <ul>
        {questionData.options.map((option) => (
          <li key={option.id}>
            <label>
              <input
                type="radio"
                name="options"
                value={option.id}
                checked={isOptionSelected(option.id)}
                onChange={() => handleOptionSelect(option.id)}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <p>Selected option: {selectedOption}</p>
      <button
        onClick={() => {
          if (selectedOption === questionData.answer)
            alert(`Selected option: ${selectedOption}`);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Blogs;
