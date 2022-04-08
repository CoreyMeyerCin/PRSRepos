import { Pipe, PipeTransform } from '@angular/core';
import { Request } from 'src/app/classes/request/request.class';

@Pipe({
  name: 'searchReview'
})
export class SearchReviewPipe implements PipeTransform {

  transform(requests: Request[], searchCriteria: string = ''): Request[] {
    if(searchCriteria == '') { return requests; }
    let substr = searchCriteria.toLowerCase();
    let selectedRequests: Request[] = [];
    for(let request of requests) {
      if(request.id.toString().includes(substr)
        || request.description.toLowerCase().includes(substr)
        || request.justification.toLowerCase().includes(substr)
        || request.total.toString().includes(substr)
        || request.deliveryMode.toLowerCase().includes(substr)
        || request.userId.toString().includes(substr)
        || request.status.toLowerCase().includes(substr)
        || request.user.username.toLowerCase().includes(substr)
        ) {
        selectedRequests.push(request);
        continue;
      }
    }
    return selectedRequests;
  }

}
