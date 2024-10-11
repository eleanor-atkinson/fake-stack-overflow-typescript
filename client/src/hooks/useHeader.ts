import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface UseHeaderProps {
  search: string;
  setQuestionPage: (query: string, title: string) => void;
}

const useHeader = ({ search, setQuestionPage }: UseHeaderProps) => {
  const [val, setVal] = useState<string>(search);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  // Handle Enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, 'Search Results');
    }
  };

  return {
    val,
    handleInputChange,
    handleKeyDown,
  };
};

export default useHeader;
