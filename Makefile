################################################################################
#
# This is the make file for the jsontool
#
# @author Jack
# @version 1.0
# @date Sat Apr  7 16:43:18 2018
#
################################################################################


#===============================================================================
#
# Debug
#
#===============================================================================

ifdef DEV
	SILENT := 
else
	SILENT := @
endif

#===============================================================================
#
# Variables
#
#===============================================================================


NINJA := ninja
CAT := cat
CD := cd
ECHO := echo
COMMIT = $(shell $(GIT) rev-parse --short HEAD)
CP := cp
CTAGS := ctags -R
DVIPDF := dvipdf
ECHO := echo
GIT := git
JAR := jar
JAVA := java
JDB := jldb
JSON_PP := json_pp
LATEX := latex
M4 := m4 -I /opt/local/include/ -I m4
MAVEN := mvn
MKDIR := mkdir -p
PHP := php
RM := rm -rf
RSYNC := rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress 
SASS := sass
SCP := scp
MESON := meson
SSH := ssh
SUDO := sudo
UGLIFYJS := uglifyjs
UNZIP := unzip
RELOAD_CHROME := $(SILENT) sh chrome.sh reload
RELOAD_SAFARI := $(SILENT) sh safari.sh reload
XELATEX := xelatex
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

#===============================================================================
#
# Core Functions
#
#===============================================================================

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))
uniq = $(if $(1),$(strip $(word 1,$(1)) $(call uniq,$(filter-out $(word 1,$(1)),$(1)))))
ssh_exec = $(shell $(SSH) root@$(1) $(2))

#===============================================================================
#
# TASKS
#
#===============================================================================

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

