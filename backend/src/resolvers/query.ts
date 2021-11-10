import {Category} from "../entity/Category";
import {Item} from "../entity/Item";
import {getRepository} from "typeorm";
import {StatusResponse} from "minecraft-server-util/dist/model/StatusResponse";
import {Promocode} from "../entity/Promocode";
const util = require('minecraft-server-util');

module.exports = {
    items: async(parent:any, args:any, {}) => {
        const item_repository = getRepository(Item);
        return await item_repository.find();
    },
    category: async(parent:any, args:any) => {
        const category_repository = getRepository(Category);
        return await category_repository.find({relations: ['items']});
    },
    minecraft: async(parent: any, args:any) => {
        const minecraft = await util.status('mc.hyneo.ru');
        return minecraft;
    }
}