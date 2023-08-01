export interface Message{
    senderEmail: string,
    reciverEmail: string,
    timestamp: number,
    content: string,
    conversationId: number;
}