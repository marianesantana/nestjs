import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessage } from './dto/create-message';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    )
    {}
    async getAll(){
        return this.messageRepository.find();
    }

    async createMessage(newMessage: CreateMessage){
        const created = new Message();
        created.message = newMessage.message;
        created.nick = newMessage.nick;

        return this.messageRepository.save(created);

    }

    async updateMessage(id: number, updateMessage: CreateMessage){
        const updated = await this.messageRepository.findOne(id);
        updated.nick = updateMessage.nick;
        updated.message = updateMessage.message;

        return await this.messageRepository.save(updated);

    }

    async deleteMessage(id: number){
        return await this.messageRepository.delete(id)
    }
}
