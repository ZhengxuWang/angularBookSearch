import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Book } from '../shared/models/books';
import { BooksService } from '../shared/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: Book[] | undefined;
  wishlist: Book[] = [];
  searchSub$ = new Subject<string>();
  constructor(private bs: BooksService) { 

  }
  ngOnInit(): void {
    this.searchSub$.pipe(debounceTime(3000), distinctUntilChanged()).subscribe((filterValue: string) => {
      this.bs.getAll(filterValue).subscribe(data => {
        this.books = data;
      });
    })
  }
  searchBook(event: Event) {
    this.searchSub$.next((event.target as HTMLInputElement).value);
  }
  addWishList(book: Book) {
    this.wishlist?.push(book);
    this.bs.wishbooks = this.wishlist;
  }
  remove(book: Book) {
    this.wishlist = this.wishlist.filter(wishbook => wishbook.name !== book.name);
    this.bs.wishbooks = this.wishlist;
  }
}
