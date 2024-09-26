import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../items/item.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() item: Item) {
    return this.itemsService.create(item);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: Item) {
    return this.itemsService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
