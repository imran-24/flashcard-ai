"use client";

import React, { useState } from "react";
import { InputForm } from "../../../components/input-form";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from "../../../components/navbar";
import { useFlashCardStore } from "@/app/hooks/use-flashcard-store";
import { useRouter } from "next/navigation";

const WritingPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  // const [flashcards, setFlashcards] = useState([]);
  // const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [setName, setSetName] = useState("");
  // const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter()

  const {flashCards, setFlashCards, removeFlashCards} = useFlashCardStore();
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log("Console log from the function", data);
      setFlashCards(data);
      router.push('/quiz/questions');
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  console.log(flashCards);

  // const handleOpenDialog = () => setDialogOpen(true);
  // const handleCloseDialog = () => setDialogOpen(false);
  // const handleCardClick = () => {};

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }
    if (!user?.id) {
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashCards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      // handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <InputForm
        title="writing"
        handleSubmit={handleSubmit}
        setText={(value: string) => setText(value)}
      />
      {/* <FlashcardContainer /> */}
    </div>
  );
};

export default WritingPage;
