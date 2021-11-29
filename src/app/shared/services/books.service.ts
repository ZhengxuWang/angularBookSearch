import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  wishbooks: Book[] = [];
  books$ = new Subject();
  constructor(private http: HttpClient) { }

  getAll(bookname:string) {
    return this.http.get(`${environment.API_URL}/volumes?q=${bookname}`).pipe(
      pluck('items'),
      map((itemArr:any) => itemArr.map((item:any) => (
        {
          image: item.volumeInfo.imageLinks.thumbnail,
          name: item.volumeInfo.title,
          publisher: item.volumeInfo.publisher,
          publishdate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description
        } as Book
        // console.log(item.volumeInfo.title)
      ))),
      tap(myArr => {
        this.books$.next(myArr);
      })
    )
  }
}
