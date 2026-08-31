"use client"

import { useState} from "react"

import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";


import { Textarea } from "@/components/ui/textarea";
import {

  Message,

  MessageContent,

}
 from "@/components/ui/message";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
} from "@/components/ui/message-scroller";
import {  
    Bubble, 
    BubbleContent, 
   } from "@/components/ui/bubble";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { GoogleGenAI } from "@google/genai";


export default function AskMessage() {

    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        try {
            //setquestion();
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type" : "appliication/json" },
                body:JSON.stringify({
                    question: question,
                })
         } )

         const data = await res.json()

         console.log(data)
         setAiResponse(data.message);


        } catch (error) {
            console.log("failed to ask a question")
        }
    }

    
    return (

        <section className="flex flex-col">
            <Card  className="m-auto p-4 max-w-68">
            <CardTitle>
                <h2>Ask Me Anything!</h2>
            </CardTitle>
            <CardDescription>Ask me anything about me projects, skills, or experience</CardDescription>
            <CardContent className="min-h-28 max-h-48 w-68">
            
                <Message>
                    <MessageContent>
                    <div className="flex h-48 w-full">
                     <MessageScrollerProvider>
                        <MessageScroller> 
                            <MessageScrollerViewport>
                                <MessageScrollerContent>
                                    <MessageScrollerItem>
                                        <Bubble variant="muted">
                                        <BubbleContent> {aiResponse || "Hi I&aposam Ali, ask me anything!"}           </BubbleContent>
                                        </Bubble>
                                    </MessageScrollerItem>
                                </MessageScrollerContent>
                            </MessageScrollerViewport>
                        </MessageScroller>
                     </MessageScrollerProvider>
                     </div>
                    </MessageContent>
                </Message>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center justify-center">
                <form onSubmit={handleSubmit}>
                <Textarea className="w-48" onChange={(event) => setQuestion(event.target.value)}/>
                

             <Button type="submit" className="flex items-center justify-center">
                 <ArrowUp  className=" w-4 h-4 m-0"/>
            </Button>
             </form>
            </div>
           

            </CardFooter>
            </Card>
        </section>
    )
}