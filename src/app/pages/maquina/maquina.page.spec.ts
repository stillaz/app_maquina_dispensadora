import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaquinaPage } from './maquina.page';

describe('MaquinaPage', () => {
  let component: MaquinaPage;
  let fixture: ComponentFixture<MaquinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaquinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
