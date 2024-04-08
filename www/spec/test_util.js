describe('util', function() {
  describe('storage', function() {
    beforeEach(function() {
      window.localStorage.clear();
    });
  
    describe("unset", function() {
      it("loadStorage", function() {
        var load;
        expect(function() {
          load = loadStorage("unset");
        }).not.toThrow();
        expect(load).toBeUndefined();
      });
    });
  
    describe("small array", function() {
      it("save/load", function() {
        var orig, read,
            i;
        orig = [];
        for (i = 0; i < 10; i++)
          orig[i] = Math.random();
        expect(function() {
          saveStorage("smallArray", orig);
        }).not.toThrow();
        expect(function() {
          read = loadStorage("smallArray");
        }).not.toThrow();
        expect(read).toBeDefined();
        expect(typeof read).toBe('object');
        expect(read).toEqual(orig);
      });
    });
  
    describe("large object", function() {
      it("save/load", function() {
        var orig, read,
            i, k;
        orig = {};
        for (i = 0; i < 100; i++) {
          k = 'k' + (100 + i);
          orig[k] = Math.random();
        }
        expect(function() {
          saveStorage("largeObject", orig);
        }).not.toThrow();
        expect(function() {
          read = loadStorage("largeObject");
        }).not.toThrow();
        expect(read).toBeDefined();
        expect(typeof read).toBe('object');
        expect(read).toEqual(orig);
      });
      it("remove", function() {
        expect(function() {
          removeStorage("largeObject");
        }).not.toThrow();
        expect(loadStorage("largeObject")).toBeUndefined();
      });
    });
  });
});
