import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  public loaderVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
