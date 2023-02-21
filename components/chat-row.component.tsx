import { db } from "@/firebase/firebase";
import { useSession } from 'next-auth/react'
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

interface ChatRowProps {
    id: string;
}


export const ChatRow = ({ id }: ChatRowProps): JSX.Element => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname ? pathname.includes(id) : false

    const [messages] = useCollection(
        session &&
        query(
            collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
            orderBy('createdAt', 'asc')
        )
    );

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));

        router.replace('/');
    }


    return <Link className={`chatRow ${isActive ? 'bg-gray-700/60' : ''}`} href={`/chats/${id}`}>
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 hidden md:inline-flex truncate">
            {messages?.docs.at(-1)?.data().text ?? 'New chat'}
        </p>
        <TrashIcon onClick={removeChat} className="w-5 h-5 text-gray-500 hover:text-red-700" />
    </Link>
}