define(["jquery"], ($) => {

    let get = (url) => {

        return new Promise((resolve, reject) => {

            $.ajax({

                url: url,

                dataType: "text",

                success: (res) => {

                    resolve(res)
                },
                error: (error) => {

                    reject(error)
                }
            })
        })
    }
    return get
})