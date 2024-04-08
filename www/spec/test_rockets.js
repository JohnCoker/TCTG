describe('rockets', function() {
  describe('Rockets', function() {
    it("must exist", function() {
      expect(Rockets).toBeDefined();
      expect(typeof Rockets).toBe('object');
    });

    describe("defaults", function() {
      it("mm/g", function() {
        Units.setDefaults(UnitDefaults.get("mm/g"));
        var r = Rockets.defaults();
        expect(r).toBeDefined();
        expect(typeof r).toBe('object');
        expect(formatFromMKS(r.bodyDiam, 'length')).toBe('25mm');
        expect(formatMMTFromMKS(r.mmtDiam)).toBe('18mm');
        expect(formatFromMKS(r.mmtDiam, 'length')).toBe('18mm');
        expect(formatFromMKS(r.mmtLen, 'length')).toBe('75mm');
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(1.0);
      });
      it("MKS", function() {
        Units.setDefaults(UnitDefaults.get("MKS"));
        var r = Rockets.defaults();
        expect(r).toBeDefined();
        expect(typeof r).toBe('object');
        expect(formatFromMKS(r.bodyDiam, 'length')).toBe('0.1m');
        expect(formatMMTFromMKS(r.mmtDiam)).toBe('38mm');
        expect(formatFromMKS(r.mmtDiam, 'length')).toBe('0.038m');
        expect(formatFromMKS(r.mmtLen, 'length')).toBe('0.3m');
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);
      });
      it("CGS", function() {
        Units.setDefaults(UnitDefaults.get("CGS"));
        var r = Rockets.defaults();
        expect(r).toBeDefined();
        expect(typeof r).toBe('object');
        expect(formatFromMKS(r.bodyDiam, 'length')).toBe('2.5cm');
        expect(formatMMTFromMKS(r.mmtDiam)).toBe('18mm');
        expect(formatFromMKS(r.mmtDiam, 'length')).toBe('1.8cm');
        expect(formatFromMKS(r.mmtLen, 'length')).toBe('7.5cm');
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(1.0);
      });
      it("in/lb", function() {
        Units.setDefaults(UnitDefaults.get("in/lb"));
        var r = Rockets.defaults();
        expect(r).toBeDefined();
        expect(typeof r).toBe('object');
        expect(formatFromMKS(r.bodyDiam, 'length')).toBe('4.0in');
        expect(formatMMTFromMKS(r.mmtDiam)).toBe('38mm');
        expect(formatFromMKS(r.mmtDiam, 'length')).toBe('1.5in');
        expect(formatFromMKS(r.mmtLen, 'length')).toBe('12.0in');
        expect(r.cd).toBe(0.7);
        expect(formatFromMKS(r.guideLen, 'length')).toBe('72.0in');
      });
      it("in/oz", function() {
        Units.setDefaults(UnitDefaults.get("in/oz"));
        var r = Rockets.defaults();
        expect(r).toBeDefined();
        expect(typeof r).toBe('object');
        expect(formatFromMKS(r.bodyDiam, 'length')).toBe('1.0in');
        expect(formatMMTFromMKS(r.mmtDiam)).toBe('18mm');
        expect(formatFromMKS(r.mmtDiam, 'length')).toBe('0.71in');
        expect(formatFromMKS(r.mmtLen, 'length')).toBe('3.0in');
        expect(r.cd).toBe(0.7);
        expect(formatFromMKS(r.guideLen, 'length')).toBe('36.0in');
      });
    });

    describe("empty", function() {
      Rockets.reset();

      it("get", function() {
        expect(Rockets.get(1)).toBeUndefined();
        expect(Rockets.get()).toBeUndefined();
        expect(Rockets.get(null)).toBeUndefined();
        expect(Rockets.get('x')).toBeUndefined();
      });
      it("list", function() {
        var a = Rockets.list();
        expect(a).toBeDefined();
        expect(a instanceof Array).toBe(true);
        expect(a.length).toBe(0);
      });
      it("remove", function() {
        expect(Rockets.remove(1)).toBe(false);
      });
    });

    describe("first", function() {
      Rockets.reset();

      var id;
      it("add", function() {
        Units.setDefaults(UnitDefaults.get("MKS"));
        var info = Rockets.defaults(),
            r;

        info.name = 'Bird One';
        info.weight = 1.0;
        info.guideLen = 2.0;
        r = Rockets.add(info);
        id = r.clientId;

        expect(r).toBeDefined();
        expect(r.name).toBe('Bird One');
        expect(r.weight).toBe(1.0);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);
        expect(r.clientId).toBe(1);
      });

      it("get", function() {
        var r = Rockets.get(id);
        expect(r).toBeDefined();
        expect(r.name).toBe('Bird One');
        expect(r.weight).toBe(1.0);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);
        expect(r.clientId).toBe(1);
      });
      it("list", function() {
        var a = Rockets.list();
        expect(a).toBeDefined();
        expect(a instanceof Array).toBe(true);
        expect(a.length).toBe(1);
        expect(a[0].name).toBe('Bird One');
        expect(a[0].weight).toBe(1.0);
        expect(a[0].cd).toBe(0.7);
      });

      it("update weight", function() {
        var o = Rockets.get(id);
        expect(o).toBeDefined();
        o.weight = 1.25;
        Rockets.update(o);

        var r = Rockets.get(id);
        expect(r).toBeDefined();
        expect(r.name).toBe('Bird One');
        expect(r.weight).toBe(1.25);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);
        expect(r.clientId).toBe(1);
      });

      it("remove", function() {
        expect(Rockets.remove(id)).toBe(true);
        expect(Rockets.get(id)).toBeUndefined();
        expect(Rockets.list().length).toBe(0);
      });
    });

    describe("fleet", function() {
      Rockets.reset();

      var ids = [];
      it("add three", function() {
        Units.setDefaults(UnitDefaults.get("MKS"));
        var info = Rockets.defaults(),
            r;

        info.name = 'Bird One';
        info.weight = 1.0;
        info.guideLen = 2.0;
        r = Rockets.add(info);
        expect(r).toBeDefined();
        expect(r.clientId).toBeGreaterThan(0);
        ids.push(r.clientId);

        info.name = 'Bird Two';
        info.weight = 1.25;
        r = Rockets.add(info);
        expect(r).toBeDefined();
        expect(r.clientId).toBeGreaterThan(1);
        ids.push(r.clientId);

        info.name = 'Bird Three';
        info.weight = 1.5;
        r = Rockets.add(info);
        expect(r).toBeDefined();
        expect(r.clientId).toBeGreaterThan(2);
        ids.push(r.clientId);
      });

      it("get", function() {
        var r;
        expect(ids.length).toBe(3);

        r = Rockets.get(ids[0]);
        expect(r).toBeDefined();
        expect(r.name).toBe('Bird One');
        expect(r.weight).toBe(1.0);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);

        r = Rockets.get(ids[1]);
        expect(r).toBeDefined();
        expect(r.name).toBe('Bird Two');
        expect(r.weight).toBe(1.25);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);

        r = Rockets.get(ids[2]);
        expect(r).toBeDefined();
        expect(r.name).toBe('Bird Three');
        expect(r.weight).toBe(1.5);
        expect(r.bodyDiam).toBe(0.10);
        expect(r.mmtDiam).toBe(0.038);
        expect(r.mmtLen).toBe(0.300);
        expect(r.cd).toBe(0.7);
        expect(r.guideLen).toBe(2.0);
      });
      it("list", function() {
        var a = Rockets.list();
        expect(a).toBeDefined();
        expect(a instanceof Array).toBe(true);
        expect(a.length).toBe(3);
        expect(a[0].name).toBe('Bird One');
        expect(a[0].weight).toBe(1.0);
        expect(a[0].cd).toBe(0.7);
        expect(a[1].name).toBe('Bird Two');
        expect(a[1].weight).toBe(1.25);
        expect(a[1].cd).toBe(0.7);
        expect(a[2].name).toBe('Bird Three');
        expect(a[2].weight).toBe(1.5);
        expect(a[2].cd).toBe(0.7);
      });

      it("remove", function() {
        expect(Rockets.remove(ids[1])).toBe(true);
        expect(Rockets.get(ids[1])).toBeUndefined();
        var a = Rockets.list();
        expect(a.length).toBe(2);
        expect(a[0].name).toBe('Bird One');
        expect(a[1].name).toBe('Bird Three');
      });
    });
  });
});
