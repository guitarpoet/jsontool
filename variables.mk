NODE := node
TSC := tsc
DIST := dist
SRC := src
ALL_SRC := $(shell find $(SRC) -name *.ts)
TEMP := $(ALL_SRC:.ts=.js)
DIST_FILES := $(subst $(SRC),$(DIST),$(ALL_SRC:.ts=.js))
TSC_OPTIONS := --sourceMap true --module es6 --moduleResolution node --target ES2018 --allowJs true --experimentalDecorators true --module commonjs --lib es6

dist/%.js: src/%.ts
	$(TSC) $(TSC_OPTIONS) --outDir $(DIST) $<
