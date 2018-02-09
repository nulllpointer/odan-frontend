import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductsDataTables} from "./products-data-tables";


describe('ContactsDataTable', () => {
  let component: ProductsDataTables;
  let fixture: ComponentFixture<ProductsDataTables>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [ ProductsDataTables ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDataTables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
