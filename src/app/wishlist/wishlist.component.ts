import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/books';
import { BooksService } from '../shared/services/books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Book[] = [];
  constructor(private bs:BooksService) { }

  ngOnInit(): void {
    this.wishlist = this.bs.wishbooks;
  }

}
