export default function anonymous($content, escapeFn, include, rethrow) {
    escapeFn = escapeFn || function(markup) {
        return markup == undefined ?
            '' :
            String(markup)
            .replace(_MATCH_HTML, encode_char);
    };
    var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
        },
        _MATCH_HTML = /[&<>'"]/g;

    function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
    };;
    var __output = "";

    function __append(s) {
        if (s !== undefined && s !== null) __output += s
    };
    __append("<ul>\n  <li>\n    ");
    for (const $anchor of $content) {
        ;
        __append("\n      <a href=\"");
        __append(escapeFn($anchor.href));
        __append("\">\n        <span>");
        __append(escapeFn($anchor.textContent));
        __append("</span>\n      </a>\n    ");
    };
    __append("\n  </li>\n</ul>")
    return __output;

}