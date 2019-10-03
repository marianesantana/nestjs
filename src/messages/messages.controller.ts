import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessage } from './dto/create-message'
import { MessagesService } from './messages.service';
import { response } from 'express';

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
            response.status(HttpStatus.FORBIDDEN).json({error: 'Error to create message'});
        })
    }
    @Get()
    getAll(@Res() response){
        this.messageService.getAll().then(messageList => {
            response.status(HttpStatus.OK).json(messageList)
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({error: 'Error to list messages'});
        })
    }
    @Put(':id')
    update(@Body() updateMessageDto: CreateMessage, @Res() response, @Param('id') idMessage) {
        this.messageService.updateMessage(idMessage, updateMessageDto).then( message => {
            response.status(HttpStatus.OK).json(message)
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({error: 'Error to update messages'});
        })
    }
    @Delete(':id')
    delete(@Res() response, @Param('id') idMessage){
        this.messageService.deleteMessage(idMessage).then(res => {
            response.status(HttpStatus.OK).json(res)
        }).catch( () => { 
            response.status(HttpStatus.FORBIDDEN).json({error: 'Error to delete messages'});

        } )
    }

}
