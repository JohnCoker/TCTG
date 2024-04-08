describe('account', function() {
  beforeEach(function() {
    Account.reset();
  });

  describe("initial", function() {
    it("must exist", function() {
      expect(Account).toBeDefined();
      expect(typeof Account).toBe('object');
    });
    it("must have empty email", function() {
      expect(Account.email).toBe('');
    });
    it("must have empty password", function() {
      expect(Account.password).toBe('');
    });
  });
});
