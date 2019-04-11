import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MechSetup } from './mech-setup';
import { ClarityModule } from '@clr/angular';

describe('MechSetup', () => {
  it('should have 0 values', () => {
    const mech = new MechSetup();
    expect(mech.A).toBe(0, 'A is 0');
    expect(mech.B).toBe(0, 'B is 0');
    expect(mech.C).toBe(0, 'C is 0');
  });

  it('should work in on bullish pattern', () => {
    const mech = new MechSetup();
    mech.A = 5;
    mech.B = 10;
    mech.C = 8;
    expect(mech.X).toBe(9.25, 'X equals 9.25');
    expect(mech.P).toBe(10.5, 'P equals 10.25');
    expect(mech.P2).toBe(11.75, 'P2 equals 11.75');
    expect(mech.D).toBe(13, 'D equals 13');
  });

  it('should work in on bearish pattern', () => {
    const mech = new MechSetup();
    mech.A = 10;
    mech.B = 5;
    mech.C = 8;
    expect(mech.X).toBe(6.75, 'X equals 6.75');
    expect(mech.P).toBe(5.5, 'P equals 5.5');
    expect(mech.P2).toBe(4.25, 'P2 equals 4.25');
    expect(mech.D).toBe(3, 'D equals 3');
  });

});
