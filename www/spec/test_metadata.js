describe("metadata", function() {
  describe("Metadata", function() {
    waits(2000);
    it("exists", function() {
      expect(Metadata).toBeDefined();
      expect(typeof Metadata).toBe('object');
    });
  });

  describe("manufacturers", function() {
    it("exists", function() {
      var set = Metadata.manufacturers;
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
    it("elements", function() {
      var set = Metadata.manufacturers;
      expect(set.length).toBeGreaterThan(5);
      for (var i = 0; i < set.length; i++) {
        expect(typeof set[i]).toBe('object');
        expect(typeof set[i].abbrev).toBe('string');
        expect(typeof set[i].label).toBe('string');
        expect(set[i].value).toBe(set[i].abbrev);
      }
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
  });

  describe("certOrgs", function() {
    it("exists", function() {
      var set = Metadata.certOrgs;
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
    it("elements", function() {
      var set = Metadata.certOrgs;
      expect(set.length).toBeGreaterThan(2);
      for (var i = 0; i < set.length; i++) {
        expect(typeof set[i]).toBe('object');
        expect(typeof set[i].abbrev).toBe('string');
        expect(typeof set[i].label).toBe('string');
        expect(set[i].value).toBe(set[i].abbrev);
      }
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
  });

  describe("types", function() {
    it("exists", function() {
      var set = Metadata.types;
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
    it("elements", function() {
      var set = Metadata.types;
      expect(set.length).toBeGreaterThan(2);
      for (var i = 0; i < set.length; i++) {
        expect(typeof set[i]).toBe('object');
        expect(typeof set[i].abbrev).toBe('string');
        expect(typeof set[i].label).toBe('string');
        expect(set[i].value).toBe(set[i].abbrev);
      }
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
  });

  describe("diameters", function() {
    it("exists", function() {
      var set = Metadata.diameters;
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
    it("elements", function() {
      var set = Metadata.diameters;
      expect(set.length).toBeGreaterThan(10);
      for (var i = 0; i < set.length; i++) {
        expect(typeof set[i]).toBe('object');
        expect(typeof set[i].value).toBe('string');
        var n = parseFloat(set[i].value);
        expect(isNaN(n)).toBe(false);
        expect(n).toBeGreaterThan(1);
        expect(set[i].label).toBe(set[i].value);
        expect(set[i].abbrev).toBe(set[i].value);
      }
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
  });

  describe("classes", function() {
    it("exists", function() {
      var set = Metadata.classes;
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
    it("elements", function() {
      var set = Metadata.classes;
      expect(set.length).toBeGreaterThan(12);
      for (var i = 0; i < set.length; i++) {
        expect(typeof set[i]).toBe('object');
        expect(typeof set[i].value).toBe('string');
        expect(/^[A-Z]$/.test(set[i].value)).toBe(true);
        expect(set[i].label).toBe(set[i].value);
        expect(set[i].abbrev).toBe(set[i].value);
      }
      expect(set).toBeDefined();
      expect(set instanceof Array).toBe(true);
    });
  });

});
