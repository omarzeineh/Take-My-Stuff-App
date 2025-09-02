import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreqPage } from './creq.page';

describe('CreqPage', () => {
  let component: CreqPage;
  let fixture: ComponentFixture<CreqPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
