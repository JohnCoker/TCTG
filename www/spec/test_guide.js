describe("guide", function() {
  it("Guide must exist", function() {
    expect(Guide).toBeDefined();
    expect(typeof Guide).toBe('object');
  });

  describe("saved", function() {
    it("reset", function() {
      Guide.clearSaved();
    });
    it("addSaved", function() {
      var rocket, result, i, j;
      for (i = 1; i <= 3; i++) {
        rocket = { clientId: 10 + i, name: 'Rocket ' + i };
        for (j = 1; j <= 2; j++) {
          result = { motorId: 100 + j, manufacturer: 'Acme', designation: 'A' + j, status: 'ok' };
          expect(Guide.addSaved(rocket, result)).toBe(true);
        }
      }
      expect(Guide.addSaved(null, result)).toBe(false);
      expect(Guide.addSaved(rocket, null)).toBe(false);
    });
    it("getSaved", function() {
      Guide.clearCache();
      var results, result, i, j;
      for (i = 1; i <= 3; i++) {
        results = Guide.getSaved(10 + i);
        expect(results).toBeDefined();
        if (results != null) {
          expect(results.length).toBe(2);
          for (j = 0; j < results.length; j++) {
            result = results[j];
            expect(result).toBeDefined();
            if (result != null) {
              expect(result.motorId).toBe(100 + j + 1);
              expect(result.manufacturer).toBe('Acme');
              expect(result.designation).toBe('A' + (j + 1));
              expect(result.status).toBe('ok');
            }
          }
        }
      }
    });
  });

  describe("recent", function() {
    it("reset", function() {
      Guide.clearRecent();
    });
    it("addRecent", function() {
      var rocket, results, i, j;
      results = [];
      for (i = 1; i <= 3; i++) {
        rocket = { clientId: 10 + i, name: 'Rocket ' + i };
        for (j = 1; j <= 2; j++)
          results.push({ motorId: 100 + j, manufacturer: 'Acme', designation: 'A' + j, status: 'ok' });
        expect(Guide.addRecent(rocket, results)).toBe(true);
      }
      expect(Guide.addRecent(null, [])).toBe(false);
      expect(Guide.addRecent(rocket, null)).toBe(false);
    });
    it("getRecent", function() {
      var results, result, i, j;
      for (i = 1; i <= 3; i++) {
        results = Guide.getRecent(10 + i);
        expect(results).toBeDefined();
        if (results != null) {
          expect(results.length).toBe(2);
          for (j = 0; j < results.length; j++) {
            result = results[j];
            expect(result).toBeDefined();
            if (result != null) {
              expect(result.motorId).toBe(100 + j + 1);
              expect(result.manufacturer).toBe('Acme');
              expect(result.designation).toBe('A' + (j + 1));
              expect(result.status).toBe('ok');
            }
          }
        }
      }
    });
  });

  describe("run", function() {
    describe("no rocket", function() {
      it("submit", function() {
        expect(Guide.run(null, null, null, function() {})).toBe(false);
      });
    });

    describe("no criteria", function() {
      var rocket = Rockets.samples()[0];
      var response, mfrs = [];
      it("submit", function() {
        var r = Guide.run(rocket, null, {}, function(data) { response = data; });
        expect(r).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var i, r;
        expect(response).toBeDefined();
        if (response) {
          expect(response.matches).toBeGreaterThan(1);
          expect(response.results instanceof Array).toBe(true);
          expect(response.results.length).toBeGreaterThan(5);
          for (i = 0; i < response.results.length; i++) {
            r = response.results[i];
            expect(r.status).toBe('ok');
            expect(r.motorId).toBeGreaterThan(0);
            expect(r.manufacturer).toBeDefined();
            if (mfrs.indexOf(r.manufacturer) < 0)
              mfrs.push(r.manufacturer);
            expect(r.designation).toBeDefined();
            expect(r.commonName).toBeDefined();
            expect(r.thrustToWeight).toBeGreaterThan(3);
            expect(r.simulationsRun).toBeGreaterThan(0);

            expect(r.liftoffMass).toBeGreaterThan(0);
            expect(r.burnoutMass).toBeGreaterThan(0);
            expect(r.burnoutMass).toBeLessThan(r.liftoffMass);

            expect(r.liftoffTime).toBeGreaterThan(0);
            expect(r.burnoutTime).toBeGreaterThan(0);
            expect(r.apogeeTime).toBeGreaterThan(0);
            expect(r.burnoutTime).toBeGreaterThan(r.liftoffTime);
            expect(r.apogeeTime).toBeGreaterThan(r.burnoutTime);

            expect(r.maxAcceleration).toBeGreaterThan(0);
            expect(r.guideVelocity).toBeGreaterThan(0);
            expect(r.maxVelocity).toBeGreaterThan(0);
            expect(r.maxVelocity).toBeGreaterThan(r.guideVelocity);

            expect(r.burnoutAltitude).toBeGreaterThan(0);
            expect(r.maxAltitude).toBeGreaterThan(0);
            expect(r.maxAltitude).toBeGreaterThan(r.burnoutAltitude);

            expect(r.optimalDelay).toBeGreaterThan(0);
          }

          expect(mfrs.length).toBeGreaterThan(1);
        }
      });
    });

    describe("with criteria", function() {
      var rocket = Rockets.samples()[0];
      var response;
      it("submit", function() {
        var r = Guide.run(rocket, null, {
                  mfr: 'Estes',
                  impulseClass: 'C'
                }, function(data) { response = data; });
        expect(r).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var i, r;
        expect(response).toBeDefined();
        if (response) {
          expect(response.matches).toBeGreaterThan(1);
          expect(response.results instanceof Array).toBe(true);
          expect(response.results.length).toBeGreaterThan(1);
          expect(response.results.length).toBeLessThan(5);
          for (i = 0; i < response.results.length; i++) {
            r = response.results[i];
            expect(r.status).toBe('ok');
            expect(r.motorId).toBeGreaterThan(0);
            expect(r.manufacturer).toBe('Estes');
            expect(r.commonName[0]).toBe('C');
          }
        }
      });
    });

  });
});
