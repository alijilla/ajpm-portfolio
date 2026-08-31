"use client"
import { flushSync } from "react-dom";
import { useState, useEffect, useRef} from "react"
import { Loader2 } from "lucide-react";
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


type ChatMessage = {
    role:"user" | "assistant";
    content: string;
};
export default function AskMessage() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    
   
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (!question.trim()) {
        return;
        }

        setErrorState("")
        const userQuestion = question;

            // 1. Show user's message immediately
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                role: "user",
                content: userQuestion,
                },{
                    role:"assistant",
                    content:"",
                }
            ]);

            setQuestion("");
            setIsLoading(true);
        try {
 
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type" : "application/json" },
                body: JSON.stringify({
                question: userQuestion,
                 messages: messages,
                }),
         } )
        
            if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Something went wrong");
    }
          const reader = res.body?.getReader();

          if(!reader) {
            throw new Error("No response stream");
          }
          
          const decoder = new TextDecoder ();
          let assistantText = "";

          while(true){
            const {done, value } = await reader.read();
            if(done){
                break;
            }
          

          const chunk = decoder.decode(value, {stream: true});
          console.log("FRONTEND CHUNK:", chunk);
          assistantText += chunk;

         
            setMessages(

                (previousmessage) => {
                  const updatedMessages = [ ...previousmessage];
                  
                  updatedMessages[updatedMessages.length - 1] = {
                        role:"assistant",
                        content: assistantText,
                    };
                    return updatedMessages;
                }

         );

       await new Promise((resolve) => setTimeout(resolve, 300));
          
        }
        
         
          


        } catch (error) {
            console.error("failed to ask a question", error);
              setErrorState(
                error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            );
        } finally {
          setIsLoading(false);
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
                                    {(messages.map((message, i) => (
                                        <MessageScrollerItem 
                                        key={i}
                                        scrollAnchor={i === messages.length - 1}
                                        className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                                        <Bubble variant={message.role === "user" ? "default": "muted"}>
                                        <BubbleContent>         {message.content ? (
                    message.content
                    ) : (
                    <Loader2 className="h-5 w-5 animate-spin" />
                    )}           </BubbleContent>
                                                    </Bubble>
                                        </MessageScrollerItem>

                                    )))} 
                                    
                                                         
                                 {errorState && (
                                    <MessageScrollerItem className="flex justify-start">
                                        <Bubble variant="muted">
                                        <BubbleContent>
                                            {errorState}
                                        </BubbleContent>
                                        </Bubble>
                                    </MessageScrollerItem>
                                    )}

                                  
                                                                                                            
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
                <Textarea className="w-48" value={question} onChange={(event) => setQuestion(event.target.value)}/>
                

             <Button type="submit" className="flex items-center justify-center" disabled={isLoading}>
                 <ArrowUp  className=" w-4 h-4 m-0"/>
            </Button>
             </form>
            </div>
           

            </CardFooter>
            </Card>
        </section>
    )
}