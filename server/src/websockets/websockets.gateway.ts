import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Shape } from './types/shapes';

@WebSocketGateway(8001, { cors: '*' })
export class WebsocketsGateway {
  private logger: Logger = new Logger('WebSocket');

  afterInit() {
    this.logger.log('WebSocket gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('createShape')
  handleCreateShape(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: { shape: Shape; room: string },
  ) {
    this.logger.log(
      `Client ${client.id} created shape ${message.shape.shapeType}`,
    );
    client.broadcast.to(message.room).emit('createShape', message.shape);
  }

  @SubscribeMessage('updateShape')
  handleUpdateShape(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: { shape: Shape; room: string },
  ) {
    this.logger.log(
      `Client ${client.id} updated shape ${message.shape.shapeType}`,
    );
    client.broadcast.to(message.room).emit('updateShape', message.shape);
  }

  @SubscribeMessage('undo')
  handleUndo(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    this.logger.log(`Client ${client.id} clicked undo`);
    client.broadcast.to(room).emit('undo');
  }

  @SubscribeMessage('redo')
  handleRedo(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    this.logger.log(`Client ${client.id} clicked redo`);
    client.broadcast.to(room).emit('redo');
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
    this.logger.log(`Client ${client.id} left room ${room}`);
  }
}
