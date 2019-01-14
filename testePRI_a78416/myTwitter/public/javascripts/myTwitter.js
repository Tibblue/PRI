$(()=>{
    $("#tweet").load("http://localhost:6001/tweet")

    $("#adicionar").click(e => {
        e.preventDefault()
        $("#tweet").append("<li>" +
                            "<h3>" + $("#autor").val() + " :: " + $("#hash").val() + "</h3>" +
                            "<p>" + $("#texto").val() + "</p>" + 
                            '<button class="w3-button w3 w3-indigo" id="gosto">Gosto (0)</button>' +
                            "</li>")
        ajaxPost()
    })

    function ajaxPost(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:4008/tweet/guardar",
            data: JSON.stringify({
                texto: $("#texto").val(),
                autor: $("#autor").val(),
                hash: $("#hash").val()
            }),
            success: p => alert("Tweet gravado com sucesso: " + JSON.stringify(p)),
            error: e => {
                alert("Erro no POST: " + JSON.stringify(e))
                console.log("Erro: " + e)
            }
        })
        // limpar as caixas de texto depois de adicionar o tweet
        $("#autor").val("")
        $("#hash").val("")
        $("#texto").val("")
    }
})