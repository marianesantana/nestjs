import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { CreateMessage } from './dto/create-message'
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService){

    }

    @Post()
    create(@Body() createMessageDto: CreateMessage, @Res() response){
        this.messageService.createMessage(createMessageDto).then( message => {
            response.status(HttpStatus.CREATED).json(message)
        })
        .catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({error: 'Error'});
        })
    }
    @Get()
    getAll(){
        return "Message listed";
    }
    @Put(':id')
    update(@Body() updateMessageDto: CreateMessage){
        return "Message updated";
    }
    @Delete(':id')
    delete(){
        return "Message deleted"
    }

}
