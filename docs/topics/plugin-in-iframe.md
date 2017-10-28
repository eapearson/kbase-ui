# Running a plugin inside an iframe

A plugin may be run almost entirely inside of an iframe. The ui itself does not nor does it need to provide any special support for iframes. A plugin will provide an iframe integration layer which handles interop between the ui and the app running inside an iframe.

We are at this very moment extracting the code required to do this into a separate support library to ease the creation of iframe plugins.

This document provides an overview of interop issues which this library addresses.
