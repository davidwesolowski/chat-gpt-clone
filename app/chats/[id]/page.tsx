import { ChatInput } from "@/components/chat-input.component";
import { Chat } from "@/components/chat.component";

interface ChatPageProps {
    params: {
        id: string;
    }
}

export default function ChatPage({ params: { id } }: ChatPageProps ) {
    return <div className="flex flex-col h-screen overflow-hidden">
        <Chat chatId={id} />
        <ChatInput chatId={id} />
    </div>
}