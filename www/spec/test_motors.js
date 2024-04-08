describe("motors", function() {
  it("Motors must exist", function() {
    expect(Motors).toBeDefined();
    expect(typeof Motors).toBe('object');
  });
  it("reset", function() {
    Motors.reset();
  });

  var Samples = [
    {
      id: 101,
      mfr: 'AeroTech',
      desig: 'K550W',
      commonName: 'K550'
    },
    {
      id: 102,
      mfr: 'AeroTech',
      desig: 'K750W',
      commonName: 'K750'
    },
    {
      id: 103,
      mfr: 'CTI',
      desig: '1364K454-19A',
      commonName: 'K454'
    },
    {
      id: 104,
      mfr: 'CTI',
      desig: '1412K530-16A',
      commonName: 'K530'
    }
  ];

  describe("recent", function() {
    it("initial state", function() {
      var a = Motors.getRecent();
      expect(a).toBeDefined();
      expect(a instanceof Array).toBe(true);
      expect(a.length).toBe(0);
      expect(Motors.get(101)).toBeUndefined();
    });

    describe("first batch (AT)", function() {
      var count;
      it("addRecent", function() {
        var arr = [],
            i;
        for (i = 0; i < Samples.length; i++) {
          if (Samples[i].mfr == 'AeroTech')
            arr.push(Samples[i]);
        }
        expect(arr.length).toBeGreaterThan(1);
        count = arr.length;
        expect(Motors.addRecent(arr)).toBe(count);
      });
      it("getRecent", function() {
        var arr = Motors.getRecent(),
            i;
        expect(arr.length).toBe(count);
        for (i = 0; i < arr.length; i++) {
          expect(arr[i].id).toBeGreaterThan(100);
          expect(arr[i].mfr).toBe('AeroTech');
        }
      });
    });
    describe("second batch (CTI)", function() {
      var count;
      it("addRecent", function() {
        var arr = [],
            i;
        for (i = 0; i < Samples.length; i++) {
          if (Samples[i].mfr == 'CTI')
            arr.push(Samples[i]);
        }
        expect(arr.length).toBeGreaterThan(1);
        count = arr.length;
        expect(Motors.addRecent(arr)).toBe(count);
      });
      it("getRecent", function() {
        var arr = Motors.getRecent(),
            i;
        expect(arr.length).toBeGreaterThan(count);
        for (i = 0; i < arr.length; i++) {
          expect(arr[i].id).toBeGreaterThan(100);
          if (i < count)
            expect(arr[i].mfr).toBe('CTI');
          else
            expect(arr[i].mfr).toBe('AeroTech');
        }
      });
    });
    describe("third batch (all)", function() {
      it("addRecent", function() {
        expect(Motors.addRecent(Samples)).toBe(Samples.length);
      });
      it("getRecent", function() {
        var arr = Motors.getRecent(),
            i;
        expect(arr.length).toBe(Samples.length);
        for (i = 0; i < arr.length; i++) {
          expect(arr[i].id).toBe(Samples[i].id);
        }
      });
    });
    describe("fourth batch (one)", function() {
      var one = Samples[Samples.length - 1];
      it("addRecent", function() {
        expect(Motors.addRecent(one)).toBe(1);
      });
      it("getRecent", function() {
        var arr = Motors.getRecent();
        expect(arr.length).toBe(Samples.length);
        expect(arr[0].id).toBe(one.id);
      });
      it("get", function() {
        var e = Motors.get(one.id);
        expect(e).toBeDefined();
        expect(e.id).toBe(one.id);
      });
    });

    describe("max", function() {
      it("MaxRecent", function() {
        expect(Motors.MaxRecent).toBeDefined();
        expect(Motors.MaxRecent).toBeGreaterThan(1);
      });
      it("add many", function() {
        var arr = [],
            n = Math.ceil(Motors.MaxRecent * 1.5),
            i;
        for (i = 0; i < n; i++) {
          arr.push({
            id: 200 + i,
            mfr: 'AMW'
          });
        }
        expect(arr.length).toBeGreaterThan(Motors.MaxRecent);
        expect(Motors.addRecent(arr)).toBe(Motors.MaxRecent);
      });
      it("truncated", function() {
        var arr = Motors.getRecent(),
            i;
        expect(arr.length).toBe(Motors.MaxRecent);
        for (i = 0; i < arr.length; i++) {
          expect(arr[i].id).toBe(200 + i);
          expect(arr[i].mfr).toBe('AMW');
        }
      });
    });
  });

  describe("saved", function() {
    it("initial state", function() {
      var a = Motors.allSaved();
      expect(a).toBeDefined();
      expect(a instanceof Array).toBe(true);
      expect(a.length).toBe(0);
      expect(Motors.get(101)).toBeUndefined();
      expect(Motors.isSaved(101)).toBe(false);
    });

    describe("samples", function() {
      it("addSaved", function() {
        var i;
        for (i = 0; i < Samples.length; i++)
          expect(Motors.addSaved(Samples[i])).toBe(true);
      });
      it("getSaved", function() {
        var i, e;
        for (i = 0; i < Samples.length; i++) {
          e = Motors.getSaved(Samples[i].id);
          expect(e).toBeDefined();
          expect(e.id).toBe(Samples[i].id);
        }
      });
      it("isSaved", function() {
        var i, e;
        for (i = 0; i < Samples.length; i++)
          expect(Motors.isSaved(Samples[i].id)).toBe(true);
      });
      it("allSaved", function() {
        var a, i, ids;
        a = Motors.allSaved();
        expect(a).toBeDefined();
        expect(a instanceof Array).toBe(true);
        expect(a.length).toBe(Samples.length);

        ids = [];
        for (i = 0; i < a.length; i++) {
          expect(a[i].id).toBeGreaterThan(100);
          expect(ids.indexOf(a[i].id)).toBe(-1);
          ids.push(a[i].id);
        }
        expect(ids.length).toBe(Samples.length);
      });
      it("get", function() {
        var e = Motors.get(Samples[0].id);
        expect(e).toBeDefined();
        expect(e.id).toBe(Samples[0].id);
      });
      it("removeSaved", function() {
        var one = Samples[Samples.length - 2],
            a;
        Motors.removeSaved(one);
        expect(Motors.getSaved(one.id)).toBeUndefined();
        a = Motors.allSaved();
        expect(a.length).toBe(Samples.length - 1);
        for (i = 0; i < a.length; i++) {
          expect(a[i].id).toBeGreaterThan(100);
          expect(a[i].id).not.toBe(one.id);
        }
      });
    });

    describe("bad entry", function() {
      it("undefined", function() {
        expect(Motors.addSaved()).toBe(false);
      });
      it("{}", function() {
        expect(Motors.addSaved({})).toBe(false);
      });
      it("{ id: 'x' }", function() {
        expect(Motors.addSaved({ id: 'x' })).toBe(false);
      });
    });
  });

  describe("search", function() {
    describe("no params", function() {
      it("submit", function() {
        expect(Motors.search(null, function() {})).toBe(false);
      });
    });

    describe("multiple matches", function() {
      var response;
      it("submit", function() {
        var r = Motors.search({ mfr: 'SCR' },
                              function(data) { response = data; });
        expect(r).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var i, r;
        expect(response).toBeDefined();
        if (response) {
          console.log(JSON.stringify(response));
          expect(response.matches).toBeGreaterThan(1);
          expect(response.results instanceof Array).toBe(true);
          expect(response.results.length).toBeGreaterThan(1);
          for (i = 0; i < response.results.length; i++) {
            r = response.results[i];
            expect(r.id).toBeGreaterThan(0);
            expect(r.manufacturer).toBe('SCR');
            expect(r.commonName).toBeDefined();
            expect(r.totalWeight).toBeGreaterThan(0);
            expect(r.totalWeight).toBeLessThan(0.1);
            expect(r.diameter).toBe(0.018);
            expect(r.length).toBeLessThan(0.1);
            expect(r.burnTime).toBeGreaterThan(0.5);
            expect(r.burnTime).toBeLessThan(5);
          }
        }
      });
    });

    describe("single match", function() {
      var response;
      it("submit", function() {
        var r = Motors.search({
          mfr: 'SCR',
          name: 'C3',
          impulseClass: 'C',
          diam: 18,
          type: 'SU'
        }, function(data) { response = data; });
        expect(r).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var r;
        expect(response).toBeDefined();
        if (response) {
          expect(response.matches).toBe(1);
          expect(response.results instanceof Array).toBe(true);
          expect(response.results.length).toBe(1);
          r = response.results[0];
          expect(r.id).toBe(1027);
          expect(r.manufacturer).toBe('SCR');
          expect(r.designation).toBe('SCR-C6');
          expect(r.commonName).toBe('C3');
          expect(r.impulseClass).toBe('C');
          expect(r.diameter).toBe(0.018);
          expect(r.length).toBe(0.07);
          expect(r.type).toBe('SU');
          expect(r.avgThrust).toBe(3.0558);
          expect(r.maxThrust).toBe(12.307);
          expect(r.totImpulse).toBe(8.8313);
          expect(r.burnTime).toBe(2.89);
          expect(r.dataFiles).toBe(1);
          expect(r.totalWeight).toBe(0.025);
          expect(r.propWeight).toBe(0.012);
          expect(r.delays).toBe('0,3,5');
          expect(r.propInfo).toBe('black powder');
          expect(r.updatedOn).toBe('2014-07-05');
        }
      });
    });

    describe("no matches", function() {
      var response;
      it("submit", function() {
        var r = Motors.search({
          mfr: 'SCR',
          impulseClass: 'M'
        }, function(data) { response = data; });
        expect(r).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var r;
        expect(response).toBeDefined();
        if (response) {
          expect(response.matches).toBe(0);
          expect(response.results instanceof Array).toBe(true);
          expect(response.results.length).toBe(0);
        }
      });
    });
  });

  describe("download", function() {
    describe("bad entry", function() {
      it("submit", function() {
        expect(Motors.getData(null, function() {})).toBe(false);
      });
    });
    describe("known entry", function() {
      var orig = { id: 326, manufacturer: 'AeroTech', commonName: 'K550' },
          updated;
      it("submit", function() {
        expect(Motors.getData(orig, function(data) { updated = data; })).toBe(true);
      });
      waits(3000);
      it("response", function() {
        var r;
        expect(updated).toBeDefined();
        if (updated) {
          expect(updated.id).toBe(326);
          expect(updated.manufacturer).toBe('AeroTech');
          expect(updated.commonName).toBe('K550');
          expect(updated.simfile).toBeDefined();
          expect(updated.simfile.samples instanceof Array).toBe(true);
          expect(updated.simfile.samples.length).toBeGreaterThan(10);
        }
      });
    });
  });

});
