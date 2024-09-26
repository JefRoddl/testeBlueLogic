import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../items/item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  create(item: Item) {
    this.items.push(item);
    return item;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  update(id: string, updatedItem: Partial<Item>): Item {
    const itemIndex = this.items.findIndex((i) => i.id === id);
  
    
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  
    
    const existingItem = this.items[itemIndex];
    const newItem = { ...existingItem, ...updatedItem };
  
    this.items[itemIndex] = newItem;
  
    return newItem;
  }

  remove(id: string): void {
    const itemIndex = this.items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(itemIndex, 1);
  }
}