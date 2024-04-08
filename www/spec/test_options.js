describe('options', function() {
  beforeEach(function() {
    Options.reset();
  });

  describe("initial", function() {
    it("must exist", function() {
      expect(Options).toBeDefined();
      expect(typeof Options).toBe('object');
    });
    it("motorDetails", function() {
      var a = Options.motorDetails;
      expect(a instanceof Array).toBe(true);
      expect(a.length).toBeGreaterThan(0);
    });
    it("simDetails", function() {
      var a = Options.simDetails;
      expect(a instanceof Array).toBe(true);
      expect(a.length).toBeGreaterThan(0);
    });
    it("rotatePrompts", function() {
      var v = Options.rotatePrompts;
      expect(typeof v).toBe('boolean');
    });
    it("promptDuration", function() {
      var v = Options.promptDuration;
      expect(typeof v).toBe('number');
      expect(v).toBeGreaterThan(0);
    });
    it("reset", function() {
      expect(typeof Options.reset).toBe('function');
    });
    it("serialize", function() {
      var clone = JSON.parse(JSON.stringify(Options));
      expect(clone.motorDetails instanceof Array).toBe(true);
      expect(clone.motorDetails.length).toBeGreaterThan(0);
      expect(clone.simDetails instanceof Array).toBe(true);
      expect(clone.simDetails.length).toBeGreaterThan(0);
      expect(typeof clone.rotatePrompts).toBe('boolean');
      expect(typeof clone.promptDuration).toBe('number');
    });
  });

  describe("settings", function() {
    var saved;
    it("initial", function() {
      saved = JSON.parse(JSON.stringify(Options));
      expect(typeof saved).toBe('object');
    });
    it("set motorDetails", function() {
      Options.motorDetails = [ 'charge', 'spin' ];
      expect(Options.motorDetails).toEqual([ 'charge', 'spin' ]);
    });
    it("set simDetails", function() {
      Options.motorDetails = [ 'mass' ];
      expect(Options.motorDetails).toEqual([ 'mass' ]);
    });
    it("set rotatePrompts", function() {
      Options.rotatePrompts = false;
      expect(Options.rotatePrompts).toBe(false);
    });
    it("set promptDuration", function() {
      Options.promptDuration = 99;
      expect(Options.promptDuration).toBe(99);
    });
    it("reset", function() {
      Options.reset();
      expect(Options.motorDetails.length).toEqual(saved.motorDetails.length);
      expect(Options.motorDetails[0]).toEqual(saved.motorDetails[0]);
      expect(Options.simDetails.length).toEqual(saved.simDetails.length);
      expect(Options.simDetails[0]).toEqual(saved.simDetails[0]);
      expect(Options.rotatePrompts).toEqual(saved.rotatePrompts);
      expect(Options.promptDuration).toEqual(saved.promptDuration);
    });
  });
});
