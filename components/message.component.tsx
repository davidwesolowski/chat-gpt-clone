import { DocumentData } from "firebase/firestore"
import Image from "next/image"

interface MessageProps {
    message: DocumentData
}

export const Message = ({ message: { text, user } }: MessageProps) => {
    const isChatGPTMessage = user._id === 'chat-gpt';

    return (
        <div className={`py-5 text-white ${isChatGPTMessage ? 'bg-[#3e3d3d]': ''}`}>
            <div className="flex gap-5 px-10 items-start">
                <div className={`${isChatGPTMessage? 'bg-[var(--chat-green)]' : ''} w-8 h-8 rounded-full overflow-hidden`}>
                    <Image width={40} height={40} src={user.avatar} alt={`${user.name} avatar`}
                        className={`${isChatGPTMessage ? 'invert' : ''}`}
                    />
                </div>
                <p className="pt-1 pr-5 text-sm flex-1">
                    {text}
                </p>
            </div>
        </div>
    )
}