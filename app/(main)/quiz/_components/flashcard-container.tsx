"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFlashCardStore } from "@/app/hooks/use-flashcard-store";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { color } from "framer-motion";
import { redirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  items: z
    .array(
      z.object({
        key: z.string().min(1, "Key cannot be empty"), // Ensure the key is a non-empty string
        value: z.string().min(1, "Value cannot be empty"), // Ensure the value is a non-empty string
      })
    )
    .refine((items) => items.length > 0, {
      message: "You have to select at least one item.",
    }),
});

// const flashCards = [
//   {
//     question: "What is the capital of France?",
//     options: [
//       { label: "A", text: "Paris" },
//       { label: "B", text: "Berlin" },
//       { label: "C", text: "Madrid" },
//       { label: "D", text: "Rome" },
//     ],
//     correctAnswer: "A",
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     options: [
//       { label: "A", text: "Earth" },
//       { label: "B", text: "Mars" },
//       { label: "C", text: "Jupiter" },
//       { label: "D", text: "Venus" },
//     ],
//     correctAnswer: "B",
//   },
//   {
//     question: "What is the largest ocean on Earth?",
//     options: [
//       { label: "A", text: "Atlantic Ocean" },
//       { label: "B", text: "Indian Ocean" },
//       { label: "C", text: "Arctic Ocean" },
//       { label: "D", text: "Pacific Ocean" },
//     ],
//     correctAnswer: "D",
//   },
//   {
//     question: "Who wrote 'Romeo and Juliet'?",
//     options: [
//       { label: "A", text: "Mark Twain" },
//       { label: "B", text: "Charles Dickens" },
//       { label: "C", text: "William Shakespeare" },
//       { label: "D", text: "Jane Austen" },
//     ],
//     correctAnswer: "C",
//   },
//   {
//     question: "What is the chemical symbol for water?",
//     options: [
//       { label: "A", text: "O2" },
//       { label: "B", text: "H2O" },
//       { label: "C", text: "CO2" },
//       { label: "D", text: "NaCl" },
//     ],
//     correctAnswer: "B",
//   },
//   {
//     question: "Which country is known as the Land of the Rising Sun?",
//     options: [
//       { label: "A", text: "China" },
//       { label: "B", text: "South Korea" },
//       { label: "C", text: "Thailand" },
//       { label: "D", text: "Japan" },
//     ],
//     correctAnswer: "D",
//   },
//   {
//     question: "What is the smallest unit of life?",
//     options: [
//       { label: "A", text: "Cell" },
//       { label: "B", text: "Atom" },
//       { label: "C", text: "Molecule" },
//       { label: "D", text: "Organ" },
//     ],
//     correctAnswer: "A",
//   },
//   {
//     question: "Who painted the Mona Lisa?",
//     options: [
//       { label: "A", text: "Vincent van Gogh" },
//       { label: "B", text: "Pablo Picasso" },
//       { label: "C", text: "Leonardo da Vinci" },
//       { label: "D", text: "Claude Monet" },
//     ],
//     correctAnswer: "C",
//   },
//   {
//     question: "Which element has the atomic number 1?",
//     options: [
//       { label: "A", text: "Helium" },
//       { label: "B", text: "Oxygen" },
//       { label: "C", text: "Hydrogen" },
//       { label: "D", text: "Carbon" },
//     ],
//     correctAnswer: "C",
//   },
//   {
//     question: "What is the capital city of Australia?",
//     options: [
//       { label: "A", text: "Sydney" },
//       { label: "B", text: "Melbourne" },
//       { label: "C", text: "Brisbane" },
//       { label: "D", text: "Canberra" },
//     ],
//     correctAnswer: "D",
//   },
// ];

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "teal",
  "gray",
  "indigo",
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Example usage: Get a random color
// const randomColor = getRandomColor();
// console.log(randomColor); // Outputs a random color from the array

export function FlashcardContainer() {
  const { flashCards } = useFlashCardStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  console.log(form.watch("items"));

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  if(flashCards.length < 10){
    return redirect("/quiz");
  }

  return (
    <Carousel className="w-full mx-auto max-w-sm mt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CarouselContent>
            {flashCards.map((flashCard, i) => (
              <CarouselItem key={i}>
                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem>
                      <div className="p-1">
                        <Card>
                          <CardHeader>
                            <CardDescription>Select an item</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col aspect-square space-y-2 ">
                            <div className="mb-4 flex space-x-2 ">
                              <FormLabel className="text-lg text-black font-semibold">
                                {i + 1})
                              </FormLabel>
                              <FormDescription className="text-lg text-black font-semibold">
                                {flashCard.question}
                              </FormDescription>
                            </div>
                            {flashCard?.options.map((item, index) => (
                              <FormField
                                key={item.key}
                                control={form.control}
                                name="items"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.key}
                                      className={cn(
                                        `transition duration-200 ease-out hover:cursor-pointer flex flex-row items-center space-x-3 space-y-0 pl-3  rounded-md border`,
                                        `hover:bg-${colors[i]}-200`,
                                        field.value?.some((value) => value.key === item.key)
                                          ? `bg-${colors[i]}-200 ` // Adjusted to directly apply the background color when checked
                                          : ""
                                      )}
                                    >
                                      <FormControl>
                                        <Checkbox
                                          color={colors[i]}
                                          className={cn(
                                            "rounded-full",
                                            // field.value?.some((value) => value.value === item.text)
                                            //   ? `bg-${colors[i]}-600 border-red-500` // Adjusted to directly apply the background color when checked
                                            //   : "border-primary/70"
                                          )}
                                          checked={field.value?.some(
                                            (value) => value.key === item.key
                                          )}
                                          onCheckedChange={(checked) => {
                                            console.log(checked);
                                            return checked
                                              ? field.onChange([
                                                  ...field.value.filter(
                                                    (item) =>
                                                      !flashCard.options?.some(
                                                        (option) =>
                                                          option.key ===
                                                          item.key
                                                      )
                                                  ),
                                                  {
                                                    key: item.key.toString(),
                                                    value: item.value,
                                                  }, // Ensure you add the correct key-value pair
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value.key !== item.key
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-medium w-full p-3 cursor-pointer">
                                        {item.value}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </FormItem>
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </form>
      </Form>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
