import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGatherComponent } from './info-gather.component';

describe('InfoGatherComponent', () => {
  let component: InfoGatherComponent;
  let fixture: ComponentFixture<InfoGatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoGatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
