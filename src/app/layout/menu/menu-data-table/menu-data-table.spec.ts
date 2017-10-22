import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MenuDataTable} from "./menu-data-table";


describe('MenuDataTable', () => {
  let component: MenuDataTable;
  let fixture: ComponentFixture<MenuDataTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [ MenuDataTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDataTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
