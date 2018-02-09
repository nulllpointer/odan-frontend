import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductDialogComponent} from "./product-dialog-component";


describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [ ProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
