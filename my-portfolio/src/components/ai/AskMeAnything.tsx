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
        <section className="flex flex-col w-full mx-auto">
            <Card className="w-full shadow-2xl border flex flex-col overflow-hidden">
                <div className="p-6 pb-4 border-b bg-card">
                    <CardTitle className="text-2xl font-bold tracking-tight">Ask Me Anything!</CardTitle>
                    <CardDescription className="text-base mt-2">
                        Ask me anything about my projects, skills, or experience.
                    </CardDescription>
                </div>
                <CardContent className="h-[400px] p-0 flex flex-col bg-muted/10">
                    <Message className="flex-1 overflow-hidden border-none shadow-none">
                        <MessageContent className="h-full w-full">
                            <div className="flex h-full w-full p-4">
                                <MessageScrollerProvider>
                                    <MessageScroller className="h-full w-full"> 
                                        <MessageScrollerViewport className="h-full w-full pr-2">
                                            <MessageScrollerContent className="flex flex-col gap-4">
                                                {messages.length === 0 && (
                                                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm p-8 text-center h-[300px]">
                                                        <span className="text-4xl mb-4">👋</span>
                                                        <p>Hi there! I'm an AI assistant.</p>
                                                        <p className="mt-1">Feel free to ask me anything about the developer's experience, skills, and projects!</p>
                                                    </div>
                                                )}
                                                {messages.map((message, i) => (
                                                    <MessageScrollerItem 
                                                        key={i}
                                                        scrollAnchor={i === messages.length - 1}
                                                        className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                                                    >
                                                        <Bubble variant={message.role === "user" ? "default" : "muted"}>
                                                            <BubbleContent>
                                                                {message.content ? message.content : <Loader2 className="h-5 w-5 animate-spin" />}
                                                            </BubbleContent>
                                                        </Bubble>
                                                    </MessageScrollerItem>
                                                ))} 
                                                
                                                {errorState && (
                                                    <MessageScrollerItem className="flex justify-center mt-4">
                                                        <Bubble variant="muted" className="bg-destructive/10 text-destructive border-destructive/20">
                                                            <BubbleContent className="text-sm">
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
                <CardFooter className="p-4 border-t bg-card">
                    <form onSubmit={handleSubmit} className="flex w-full items-end gap-2 relative">
                        <Textarea 
                            className="flex-1 min-h-[48px] max-h-[120px] resize-none pr-12 rounded-xl py-3 shadow-sm bg-background" 
                            placeholder="Type your question..."
                            value={question} 
                            onChange={(event) => setQuestion(event.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }
                            }}
                        />
                        <Button 
                            type="submit" 
                            size="icon"
                            className="absolute right-2 bottom-2 rounded-full h-8 w-8 shadow-sm transition-all active:scale-95" 
                            disabled={isLoading || !question.trim()}
                        >
                            <ArrowUp className="w-4 h-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </section>
    );
}