$(document).ready( function () {
    try {
        var table1 = $('#example').DataTable( {
            pageLength : 18,
            "lengthChange": false,
            info: false
          } )
          document.getElementById("example").style.display = "block"
        }
    catch (e){}    
    

    var table2 = $('#apareceEm').DataTable( {
        pageLength : 6,
        "lengthChange": false,
        info: false
    } )

    var table3 = $('#example_user').DataTable( {
        pageLength : 3,
        "lengthChange": false,
        info: false
    } )

    var table4= $('#example2_user').DataTable( {
        pageLength : 2,
        "lengthChange": false,
        info: false
    } )
} );


function sendPersonagem(){
    var formObj = {};
    var inputs = $('#form').serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    if(confirm('Do you confirm?')){
        $.ajax({
            url: 'http://localhost:3001/adicionarPersonagem',
            type: "POST",
            data: formObj,
            success: function () {
                alert('Character Added with success.')
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('An error occurred...');
            }
        });
    }
}

function sendComic(){
    var formObj = {};
    var inputs = $('#form').serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    if(confirm('Do you confirm?')){
        $.ajax({
            url: 'http://localhost:3001/adicionarComic',
            type: "POST",
            data: formObj,
            success: function () {
                alert('Comic Added with success.')
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('An error occurred...');
            }
        });
    }
}