import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ContactsDataTable} from "./contacts-data-tables";


describe('ContactsDataTable', () => {
  let component: ContactsDataTable;
  let fixture: ComponentFixture<ContactsDataTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [ ContactsDataTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDataTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
