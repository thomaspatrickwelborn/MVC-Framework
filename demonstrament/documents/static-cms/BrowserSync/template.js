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
    const {
        device,
        database
    } = $content
    ;
    __append("\n<fieldset data-id=\"browser-sync\">\n	<legend>${device.legend}</legend>\n	<field data-id=\"port\">\n		<label>");
    __append(escapeFn(device.port.label));
    __append("</label>\n		<capture\n			contenteditable\n			>");
    __append(escapeFn(database.port));
    __append("</capture>\n	</field>\n	<field data-id=\"host\">\n		<label>");
    __append(escapeFn(device.host.label));
    __append("</label>\n		<capture\n			contenteditable\n		>");
    __append(escapeFn(database.host));
    __append("</capture>\n	</field>\n	<fieldset data-id=\"https\">\n		<legend>");
    __append(escapeFn(device.https.legend));
    __append("</legend>\n		<field data-id=\"key\">\n			<label>");
    __append(escapeFn(device.https.key.label));
    __append("</label>\n			<capture\n				contenteditable\n			>");
    __append(escapeFn(database.https.key));
    __append("</capture>\n		</field>\n		<field data-id=\"cert\">\n			<label>");
    __append(escapeFn(device.https.cert.label));
    __append("</label>\n			<capture\n				contenteditable\n			>");
    __append(escapeFn(database.https.cert));
    __append("</capture>\n		</field>\n	</fieldset>\n</fieldset>")
    return __output;

}