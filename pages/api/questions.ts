// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { openApiRequest } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin';
import { adminDb } from '@/firebase/firebase-admin';

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Invalid request, please provide a payload' });
    return;
  }

  const { text, chatId, model, session } = req.body;

  if (text === '' || text === undefined) {
    res.status(400).json({ message: 'Please provide a valid text' });
    return;
  }

  if (model === '' || model === undefined) {
    res.status(400).json({ message: 'Please provide a valid model' });
    return;
  }

  const response = await openApiRequest({ model, prompt: text });

  const message = {
    text: response,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'chat-gpt',
      name: 'ChatGPT',
      avatar: 'https://freesvg.org/img/1538298822.png',
    }
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email!)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  res.status(200).json({ 
    message: response,
   });
}
