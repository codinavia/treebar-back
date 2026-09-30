import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete } from '@nestjs/common';
import { QueriesService } from './queries.service.js';
import { 
  ApiOperation, 
  ApiResponse,
  ApiTags
 } from '@nestjs/swagger';

export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}
}