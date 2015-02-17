# autocomplete demo

A very simple app demoing how to use ArangoDB as a backend for an autocomplete textbox.

The demo code is based on [jquery autocomplete](http://jqueryui.com/autocomplete/).

The demo provides a textbox with autocompletion for US city names.
City names have been downloaded from [this page](https://tommcfarlin.com/country-state-and-city/)
and de-duplicated. City names are stored in a collection `completions` that is auto-populated
when the app is installed.

Autocompletion will start when at least two letters are entered into the textbox.

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0).
