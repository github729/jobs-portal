import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sorting"
})
export class SortingPipe implements PipeTransform {
  transform(items: any, args?: any): any {
    if (!items) {
      return [];
    }
    if (!args) {
      return items;
    }
    if (args === "TOP 1000") {
      return items;
    } else {
      args = args.toLowerCase();
      return items.filter(item => {
        return item.companyName[0].toLowerCase() === args;
      });
    }
  }
}
