define(["handlebars", "jquery"], (handlebars, $) => {

    let render = (tpl, data, target, isHtml) => {

        let template = handlebars.compile(tpl);

        let html = template(data);

        handlebars.registerHelper("addIndex", function(index) {
            return index + 1;
        })

        if (isHtml) {
            $(target).html(html)
        } else {
            $(target).append(html)
        }
    }
    return render
})