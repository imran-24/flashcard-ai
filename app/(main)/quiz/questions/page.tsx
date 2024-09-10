import React from 'react'
import { FlashcardContainer } from './_components/flashcard-container';
import Navbar from '@/components/navbar';

const QuestionsPage = () => {

  return (
    <div className='min-h-full'>
      <Navbar/>
      <FlashcardContainer />
    </div>
  )
}

export default QuestionsPage