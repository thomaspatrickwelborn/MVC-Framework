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
    __append("\n<fieldset data-id=\"inspector\">\n	<legend>");
    __append(escapeFn(device.legend));
    __append("</legend>\n	<field data-id=\"host\">\n		<label>");
    __append(escapeFn(device.host.label));
    __append("</label>\n		<input\n			type=\"text\"\n		  value=\"");
    __append(escapeFn(database.host));
    __append("\"\n		  required\n	  >\n	  <detail>");
    __append(escapeFn(device.host.detail));
    __append("</detail>\n	</field>\n	<field data-id=\"port\">\n		<label>");
    __append(escapeFn(device.port.label));
    __append("</label>\n		<input\n		  type=\"number\"\n		  value=\"");
    __append(escapeFn(database.port));
    __append("\"\n	  >\n	  <detail>");
    __append(escapeFn(device.port.detail));
    __append("</detail>\n	</field>\n	<resources data-active=\"");
    __append(escapeFn(device.resources.active));
    __append("\">\n		<header>\n			<name>");
    __append(escapeFn(device.resources.name));
    __append("</name>\n			<button></button>\n		</header>\n		<main>\n			");
    for (const $resource of device.resources.items) {
        ;
        __append("\n				<resource>\n					<a\n					  href=\"");
        __append(escapeFn($resource.href));
        __append("\"\n					  target=\"_blank\"\n				  >");
        __append(escapeFn($resource.textContent));
        __append("</a>\n				</resource>\n			");
    };
    __append("\n		</main>\n	</resources>\n</fieldset>")
    return __output;

}