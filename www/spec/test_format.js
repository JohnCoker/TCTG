describe('units', function() {
  describe("formatBurnTime", function() {
    it("0.25", function() {
      expect(formatBurnTime(0.25)).toBe('0.25s');
    });
    it("1.591", function() {
      expect(formatBurnTime(1.591)).toBe('1.6s');
    });
    it("1.591 fixed", function() {
      expect(formatBurnTime(1.591, true)).toBe('1.59s');
    });
    it("10.525", function() {
      expect(formatBurnTime(10.525)).toBe('10.5s');
    });
    it("invalid", function() {
      expect(formatBurnTime()).toBe('');
      expect(formatBurnTime(NaN)).toBe('');
      expect(formatBurnTime('foo')).toBe('');
    });
  });

  describe("formatClassPercent", function() {
    it("2.5", function() {
      expect(formatClassPercent(2.5)).toBe('100% A');
    });
    it("80", function() {
      expect(formatClassPercent(80)).toBe('100% F');
    });
    it("81", function() {
      expect(formatClassPercent(81)).toBe('1% G');
    });
    it("10481.5", function() {
      expect(formatClassPercent(10481.5)).toBe('2% N');
    });
    it("31,437,000", function() {
      expect(formatClassPercent(31437000)).toBe('50% Y');
    });
    it("671,088,640", function() {
      expect(formatClassPercent(671088640)).toBe('1500% Z');
    });
    it("invalid", function() {
      expect(formatClassPercent()).toBe('');
      expect(formatClassPercent(NaN)).toBe('');
      expect(formatClassPercent('foo')).toBe('');
    });
  });

  describe("formatCommonName", function() {
    it("1/4 A1", function() {
      expect(formatCommonName("1/4 A1")).toBe('¼A1');
    });
    it("1/4A1", function() {
      expect(formatCommonName("1/4A1")).toBe('¼A1');
    });
    it("1/2 A2", function() {
      expect(formatCommonName("1/2 A2")).toBe('½A2');
    });
    it("1/2A2", function() {
      expect(formatCommonName("1/2A2")).toBe('½A2');
    });
    it("A7-4", function() {
      expect(formatCommonName("A7-4")).toBe('A7');
    });
    it("G123-14A", function() {
      expect(formatCommonName("G123-14A")).toBe('G123');
    });
    it("M 2109", function() {
      expect(formatCommonName("M2109")).toBe('M2109');
    });
    it("invalid", function() {
      expect(formatCommonName()).toBe('');
      expect(formatCommonName('')).toBe('');
    });
  });
});
