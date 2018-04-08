run: build
	$(SILENT) $(NODE) index.js
.PHONY: run

build: $(DIST_FILES)
	$(SILENT) $(ECHO) Built
.PHONY: build

clean:
	$(SILENT) $(RM) dist
	$(SILENT) $(MKDIR) dist
.PHONY: clean
